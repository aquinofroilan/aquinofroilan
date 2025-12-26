"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, RotateCcw, Sparkles } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getChatResponse, type ChatMessage } from "@/actions";
import { CHATBOT_CONFIG, ERROR_MESSAGES } from "@/lib/chatbot-config";
import { chatbotStorage, validateInput, sanitizeInput } from "@/lib/chatbot-utils";
import { MarkdownMessage } from "./markdown-message";

export const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const [lastMessageTime, setLastMessageTime] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Load conversation from localStorage on mount
    useEffect(() => {
        const savedMessages = chatbotStorage.loadConversation();
        if (savedMessages.length > 0) {
            setMessages(savedMessages);
            setShowSuggestions(false);
        }
    }, []);

    // Save conversation to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            chatbotStorage.saveConversation(messages);
        }
    }, [messages]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: CHATBOT_CONFIG.AUTO_SCROLL_BEHAVIOR });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingContent, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const simulateTyping = async (text: string) => {
        // Cancel any existing typing animation
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        const words = text.split(" ");
        let currentText = "";

        for (let i = 0; i < words.length; i++) {
            if (signal.aborted) {
                // Clear pending timeout on abort
                if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                    typingTimeoutRef.current = null;
                }
                break;
            }

            currentText += words[i] + (i < words.length - 1 ? " " : "");
            setStreamingContent(currentText);

            // Create a cancellable promise for the timeout
            await new Promise<void>((resolve) => {
                typingTimeoutRef.current = setTimeout(() => {
                    typingTimeoutRef.current = null;
                    resolve();
                }, CHATBOT_CONFIG.TYPING_SPEED_MS);

                // Setup abort listener to clear timeout and resolve immediately
                const abortHandler = () => {
                    if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                        typingTimeoutRef.current = null;
                    }
                    resolve();
                };

                if (signal.aborted) {
                    abortHandler();
                } else {
                    signal.addEventListener("abort", abortHandler, { once: true });
                }
            });
        }

        return currentText;
    };

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input.trim();

        if (!textToSend || isLoading) return;

        // Client-side rate limiting with user feedback (check early to avoid unnecessary work)
        const now = Date.now();
        if (now - lastMessageTime < CHATBOT_CONFIG.MIN_MESSAGE_INTERVAL_MS) {
            setMessages((prev) => [...prev, { role: "assistant", content: ERROR_MESSAGES.RATE_LIMIT_CLIENT }]);
            return;
        }

        // Validate and sanitize input
        const validation = validateInput(textToSend);
        if (!validation.valid) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: validation.error || ERROR_MESSAGES.GENERIC_ERROR },
            ]);
            return;
        }

        const sanitizedInput = sanitizeInput(textToSend);
        const userMessage: ChatMessage = { role: "user", content: sanitizedInput };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput("");
        setIsLoading(true);
        setStreamingContent("");
        setLastMessageTime(now);
        setShowSuggestions(false);

        try {
            const response = await getChatResponse(newMessages);
            await simulateTyping(response);

            setMessages((prev) => [...prev, { role: "assistant", content: response }]);
            setStreamingContent("");
        } catch (error: any) {
            console.error("Chat error:", error);

            let errorMessage: string = ERROR_MESSAGES.GENERIC_ERROR;

            if (error.message === "RATE_LIMIT_EXCEEDED") {
                errorMessage = ERROR_MESSAGES.RATE_LIMIT_EXCEEDED;
            } else if (error.message === "SAFETY_BLOCK") {
                errorMessage = ERROR_MESSAGES.SAFETY_BLOCK;
            } else if (error.message === "NETWORK_ERROR") {
                errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
            } else if (error.message === "NO_RESPONSE") {
                errorMessage = ERROR_MESSAGES.NO_RESPONSE;
            }

            setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearConversation = () => {
        setMessages([]);
        setShowSuggestions(true);
        chatbotStorage.clearConversation();
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSend(suggestion);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                size={"icon"}
                className={cn(
                    "fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all duration-300",
                    "bg-primary text-primary-foreground hover:scale-110",
                    isOpen && "rotate-90",
                )}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X size={18} /> : <MessageCircle size={18} />}
            </Button>

            <div
                className={cn(
                    "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)]",
                    "bg-background border rounded-lg shadow-2xl flex flex-col",
                    "transition-all duration-300 origin-bottom-right",
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
                )}
            >
                <div className="flex items-center gap-3 p-4 border-b bg-muted/50 rounded-t-lg">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <Bot size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm">Chat with Froilan&apos;s AI</h3>
                        <p className="text-xs text-muted-foreground">Ask me anything about Froilan!</p>
                    </div>
                    {messages.length > 0 && (
                        <Button
                            onClick={handleClearConversation}
                            variant={"ghost"}
                            size={"icon"}
                            className="h-8 w-8"
                            aria-label="Clear conversation"
                            title="Clear conversation"
                        >
                            <RotateCcw size={16} />
                        </Button>
                    )}
                    <Button
                        onClick={() => setIsOpen(false)}
                        variant={"ghost"}
                        size={"icon"}
                        className="h-8 w-8"
                        aria-label="Close chat"
                    >
                        <X size={18} />
                    </Button>
                </div>

                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions text"
                    aria-label="Chat messages"
                >
                    {messages.length === 0 && !streamingContent && (
                        <div className="text-center text-muted-foreground text-sm py-4">
                            <Bot size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Hi! I&apos;m Froilan&apos;s AI assistant.</p>
                            <p className="mt-1">Ask me about his skills, projects, or experience!</p>

                            {showSuggestions && (
                                <div className="mt-6 space-y-2">
                                    <p className="text-xs font-medium flex items-center justify-center gap-2">
                                        <Sparkles size={14} />
                                        Try asking:
                                    </p>
                                    {CHATBOT_CONFIG.SUGGESTED_PROMPTS.map((prompt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(prompt)}
                                            className={cn(
                                                "w-full text-left px-3 py-2 text-xs rounded-md",
                                                "bg-muted hover:bg-muted/80 transition-colors",
                                                "border border-border/50 hover:border-border",
                                            )}
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div
                            key={`${message.role}-${message.content}-${index}`}
                            className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}
                        >
                            {message.role === "assistant" && (
                                <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                                    <Bot size={14} className="text-primary-foreground" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                            >
                                {message.role === "assistant" ? (
                                    <MarkdownMessage content={message.content} />
                                ) : (
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                )}
                            </div>
                            {message.role === "user" && (
                                <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                                    <User size={14} />
                                </div>
                            )}
                        </div>
                    ))}

                    {streamingContent && (
                        <div className="flex gap-2 justify-start">
                            <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                                <Bot size={14} className="text-primary-foreground" />
                            </div>
                            <div className="max-w-[80%] px-3 py-2 rounded-lg text-sm bg-muted">
                                <MarkdownMessage content={streamingContent} />
                                <span className="inline-block w-2 h-4 bg-foreground/50 animate-pulse ml-1" />
                            </div>
                        </div>
                    )}

                    {isLoading && !streamingContent && (
                        <div className="flex gap-2 justify-start">
                            <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                                <Bot size={14} className="text-primary-foreground" />
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-muted">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-muted/30">
                    <div className="flex gap-2">
                        <label htmlFor="chat-input" className="sr-only">
                            Type your message
                        </label>
                        <Input
                            id="chat-input"
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            maxLength={CHATBOT_CONFIG.MAX_MESSAGE_LENGTH}
                            className={cn(
                                "flex-1 px-3 py-2 text-sm rounded-md border bg-background",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                            )}
                            aria-label="Type your message"
                        />
                        <Button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            size="sm"
                            className="px-3"
                            aria-label="Send message"
                        >
                            <Send size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
