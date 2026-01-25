import { createClient } from "@libsql/client";

const DATABASE_URL = process.env.TURSO_DATABASE_URL;
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!DATABASE_URL || !AUTH_TOKEN) {
    console.warn(
        "Turso database credentials not found. Blog features will be unavailable. " +
            "Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your environment.",
    );
}

export const turso =
    DATABASE_URL && AUTH_TOKEN
        ? createClient({
              url: DATABASE_URL,
              authToken: AUTH_TOKEN,
          })
        : null;

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    created_at: string;
    likes: number;
}
