import { ChatMessage } from "@/actions";
import { CHATBOT_CONFIG } from "./chatbot-config";

/**
 * Storage utility for persisting chatbot conversation history
 */
export const chatbotStorage = {
    /**
     * Save conversation history to localStorage
     */
    saveConversation: (messages: ChatMessage[]): void => {
        if (typeof window === "undefined") return;
        
        try {
            // Limit the number of stored messages to prevent localStorage overflow
            const messagesToStore = messages.slice(-CHATBOT_CONFIG.MAX_STORED_MESSAGES);
            localStorage.setItem(
                CHATBOT_CONFIG.STORAGE_KEY,
                JSON.stringify(messagesToStore)
            );
        } catch (error) {
            console.warn("Failed to save conversation to localStorage:", error);
        }
    },

    /**
     * Load conversation history from localStorage
     */
    loadConversation: (): ChatMessage[] => {
        if (typeof window === "undefined") return [];
        
        try {
            const stored = localStorage.getItem(CHATBOT_CONFIG.STORAGE_KEY);
            if (!stored) return [];
            
            const parsed = JSON.parse(stored);
            
            // Validate the structure
            if (!Array.isArray(parsed)) return [];
            
            return parsed.filter(
                (msg: any) =>
                    msg &&
                    typeof msg === "object" &&
                    (msg.role === "user" || msg.role === "assistant") &&
                    typeof msg.content === "string"
            );
        } catch (error) {
            console.warn("Failed to load conversation from localStorage:", error);
            return [];
        }
    },

    /**
     * Clear conversation history from localStorage
     */
    clearConversation: (): void => {
        if (typeof window === "undefined") return;
        
        try {
            localStorage.removeItem(CHATBOT_CONFIG.STORAGE_KEY);
        } catch (error) {
            console.warn("Failed to clear conversation from localStorage:", error);
        }
    },
};

/**
 * Input validation utilities
 */
export const validateInput = (input: string): { valid: boolean; error?: string } => {
    const trimmed = input.trim();
    
    if (!trimmed) {
        return { valid: false, error: "Message cannot be empty" };
    }
    
    if (trimmed.length > CHATBOT_CONFIG.MAX_MESSAGE_LENGTH) {
        return { valid: false, error: `Message is too long (max ${CHATBOT_CONFIG.MAX_MESSAGE_LENGTH} characters)` };
    }
    
    return { valid: true };
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
    return input
        .trim()
        // Remove any potentially dangerous characters
        .replace(/[<>]/g, "")
        .slice(0, CHATBOT_CONFIG.MAX_MESSAGE_LENGTH);
};
