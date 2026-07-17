import { json } from "@sveltejs/kit";
import { incrementBlogLikes } from "$lib/server/actions/blog";
import { isValidUUID } from "$lib/utils";

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 likes per minute per IP

function checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST({ request, getClientAddress }) {
    try {
        const ip = getClientAddress() || "unknown";

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const { id } = await request.json();

        if (!id) {
            return json({ error: "Blog ID is required" }, { status: 400 });
        }

        // Validate UUID format
        if (!isValidUUID(id)) {
            return json({ error: "Invalid blog ID format" }, { status: 400 });
        }

        const newLikes = await incrementBlogLikes(id);

        return json({
            success: true,
            likes: newLikes,
        });
    } catch (error) {
        console.error("Error incrementing likes:", error);
        return json({ error: "Failed to increment likes" }, { status: 500 });
    }
}
