"use server";

import { turso, BlogPost } from "@/lib/turso";
import { v4 as uuidv4 } from "uuid";

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    try {
        const result = await turso.execute(
            "SELECT id, title, content, created_at, likes FROM blog_posts ORDER BY created_at DESC"
        );

        return result.rows.map((row) => ({
            id: row.id as string,
            title: row.title as string,
            content: row.content as string,
            created_at: row.created_at as string,
            likes: (row.likes as number) || 0,
        }));
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
        const result = await turso.execute({
            sql: "SELECT id, title, content, created_at, likes FROM blog_posts WHERE id = ?",
            args: [id],
        });

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return {
            id: row.id as string,
            title: row.title as string,
            content: row.content as string,
            created_at: row.created_at as string,
            likes: (row.likes as number) || 0,
        };
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return null;
    }
}

export async function createBlogPost(title: string, content: string): Promise<BlogPost> {
    const id = uuidv4();
    const created_at = new Date().toISOString();

    try {
        await turso.execute({
            sql: "INSERT INTO blog_posts (id, title, content, created_at, likes) VALUES (?, ?, ?, ?, ?)",
            args: [id, title, content, created_at, 0],
        });

        return {
            id,
            title,
            content,
            created_at,
            likes: 0,
        };
    } catch (error) {
        console.error("Error creating blog post:", error);
        throw error;
    }
}

export async function incrementBlogLikes(id: string): Promise<number> {
    try {
        await turso.execute({
            sql: "UPDATE blog_posts SET likes = likes + 1 WHERE id = ?",
            args: [id],
        });

        const result = await turso.execute({
            sql: "SELECT likes FROM blog_posts WHERE id = ?",
            args: [id],
        });

        if (result.rows.length === 0) {
            return 0;
        }

        return (result.rows[0].likes as number) || 0;
    } catch (error) {
        console.error("Error incrementing likes:", error);
        throw error;
    }
}

export async function getRecentBlogPosts(limit: number = 4): Promise<BlogPost[]> {
    try {
        const result = await turso.execute({
            sql: "SELECT id, title, content, created_at, likes FROM blog_posts ORDER BY created_at DESC LIMIT ?",
            args: [limit],
        });

        return result.rows.map((row) => ({
            id: row.id as string,
            title: row.title as string,
            content: row.content as string,
            created_at: row.created_at as string,
            likes: (row.likes as number) || 0,
        }));
    } catch (error) {
        console.error("Error fetching recent blog posts:", error);
        return [];
    }
}
