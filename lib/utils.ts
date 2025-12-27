import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { validate as uuidValidate } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDistance(date: Date, baseDate: Date): string {
    const seconds = Math.floor((baseDate.getTime() - date.getTime()) / 1000);

    // Handle negative time differences
    if (seconds < 0) {
        return "in the future";
    }

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }

    return seconds < 10 ? "just now" : `${Math.floor(seconds)} seconds ago`;
}

/**
 * Strip markdown formatting from text to create clean excerpts
 * @param markdown - The markdown text to strip
 * @param maxLength - Maximum length of the returned excerpt
 * @returns Plain text excerpt without markdown formatting
 */
export function stripMarkdown(markdown: string, maxLength?: number): string {
    let text = markdown
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`[^`]+`/g, "")
        // Remove headers
        .replace(/#{1,6}\s+/g, "")
        // Remove bold and italic
        .replace(/(\*\*|__)(.*?)\1/g, "$2")
        .replace(/(\*|_)(.*?)\1/g, "$2")
        // Remove links but keep text
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        // Remove images
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "")
        // Remove blockquotes
        .replace(/^\s*>\s+/gm, "")
        // Remove lists
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        // Remove horizontal rules
        .replace(/^[\s-*_]{3,}$/gm, "")
        // Clean up extra whitespace
        .replace(/\n{2,}/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (maxLength && text.length > maxLength) {
        text = text.substring(0, maxLength).trim();
        // Ensure we don't cut off in the middle of a word
        const lastSpace = text.lastIndexOf(" ");
        if (lastSpace > maxLength * 0.8) {
            text = text.substring(0, lastSpace);
        }
        text += "...";
    }

    return text;
}

/**
 * Validate if a string is a valid UUID
 * @param id - The string to validate
 * @returns True if the string is a valid UUID
 */
export function isValidUUID(id: string): boolean {
    return uuidValidate(id);
}
