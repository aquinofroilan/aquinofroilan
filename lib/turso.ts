import { createClient } from "@libsql/client";

// Check for required environment variables
const DATABASE_URL = process.env.TURSO_DATABASE_URL;
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!DATABASE_URL || !AUTH_TOKEN) {
    console.warn(
        "Turso database credentials not found. Blog features will be unavailable. " +
            "Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your environment.",
    );
}

// Create and export the Turso client
export const turso =
    DATABASE_URL && AUTH_TOKEN
        ? createClient({
              url: DATABASE_URL,
              authToken: AUTH_TOKEN,
          })
        : null;

// Database schema initialization
export async function initializeDatabase() {
    if (!turso) {
        throw new Error("Turso client not initialized. Please check environment variables.");
    }

    try {
        await turso.execute(`
            CREATE TABLE IF NOT EXISTS blog_posts (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT NOT NULL,
                likes INTEGER DEFAULT 0
            )
        `);
        console.log("Database schema initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
}

// Blog post types
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    created_at: string;
    likes: number;
}
