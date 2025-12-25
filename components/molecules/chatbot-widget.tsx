"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getChatResponse, type ChatMessage } from "@/actions";

export const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        const words = text.split(" ");
        let currentText = "";

        for (let i = 0; i < words.length; i++) {
            currentText += words[i] + (i < words.length - 1 ? " " : "");
            setStreamingContent(currentText);
            await new Promise((resolve) => setTimeout(resolve, 30));
        }

        return currentText;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: "user", content: input.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);
        setStreamingContent("");

        try {
            const response = await getChatResponse(newMessages);
            await simulateTyping(response);

            setMessages((prev) => [...prev, { role: "assistant", content: response }]);
            setStreamingContent("");
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage = "Sorry, I encountered an error. Please try again.";
            setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <Button
                onClick={ () => setIsOpen( !isOpen ) }
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

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)]",
                    "bg-background border rounded-lg shadow-2xl flex flex-col",
                    "transition-all duration-300 origin-bottom-right",
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
                )}
            >
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b bg-muted/50 rounded-t-lg">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Bot size={20} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm">Chat with Froilan&apos;s AI</h3>
                        <p className="text-xs text-muted-foreground">Ask me anything about Froilan!</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-muted rounded-md transition-colors"
                        aria-label="Close chat"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && !streamingContent && (
                        <div className="text-center text-muted-foreground text-sm py-8">
                            <Bot size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Hi! I&apos;m Froilan&apos;s AI assistant.</p>
                            <p className="mt-1">Ask me about his skills, projects, or experience!</p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div
                            key={index}
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
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === "user" && (
                                <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                                    <User size={14} />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Streaming message */}
                    {streamingContent && (
                        <div className="flex gap-2 justify-start">
                            <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                                <Bot size={14} className="text-primary-foreground" />
                            </div>
                            <div className="max-w-[80%] px-3 py-2 rounded-lg text-sm bg-muted">
                                <p className="whitespace-pre-wrap">{streamingContent}</p>
                                <span className="inline-block w-2 h-4 bg-foreground/50 animate-pulse ml-1" />
                            </div>
                        </div>
                    )}

                    {/* Loading indicator */}
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

                {/* Input */}
                <div className="p-4 border-t bg-muted/30">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            className={cn(
                                "flex-1 px-3 py-2 text-sm rounded-md border bg-background",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                            )}
                        />
                        <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="sm" className="px-3">
                            <Send size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
