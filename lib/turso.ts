import { createClient } from "@libsql/client";

// Create and export the Turso client
export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
});

// Database schema initialization
export async function initializeDatabase() {
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
