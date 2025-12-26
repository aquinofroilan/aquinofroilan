/**
 * Configuration constants for the chatbot widget
 */

export const CHATBOT_CONFIG = {
    // UI Configuration
    TYPING_SPEED_MS: 30,
    AUTO_SCROLL_BEHAVIOR: "smooth" as ScrollBehavior,
    MAX_MESSAGE_LENGTH: 500,
    
    // Storage
    STORAGE_KEY: "chatbot_conversation_history",
    MAX_STORED_MESSAGES: 50,
    
    // Rate Limiting (client-side)
    MIN_MESSAGE_INTERVAL_MS: 1000,
    
    // Quick Prompts
    SUGGESTED_PROMPTS: [
        "What are Froilan's technical skills?",
        "Tell me about his experience",
        "What projects has he worked on?",
        "How can I contact Froilan?",
    ],
} as const;

export const ERROR_MESSAGES = {
    RATE_LIMIT_EXCEEDED: "I'm receiving too many messages right now. Please wait a moment before trying again.",
    SAFETY_BLOCK: "I can't respond to that message as it violates safety guidelines.",
    NETWORK_ERROR: "I'm having trouble connecting to the server. Please check your internet connection.",
    NO_RESPONSE: "I couldn't generate a response. Please try rephrasing your question.",
    GENERIC_ERROR: "Sorry, I encountered an error. Please try again.",
    MESSAGE_TOO_LONG: `Message is too long. Please keep it under ${CHATBOT_CONFIG.MAX_MESSAGE_LENGTH} characters.`,
} as const;
