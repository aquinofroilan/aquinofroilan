"use server";

import { turso, Book } from "@/lib/turso";

export async function getAllBooks(): Promise<Book[]> {
    if (!turso) {
        console.warn("Turso client not initialized");
        return [];
    }

    try {
        const result = await turso.execute(
            "SELECT id, title, author, isbn, date_read FROM books ORDER BY date_read DESC",
        );

        return result.rows.map((row) => ({
            id: row.id as string,
            title: row.title as string,
            author: row.author as string,
            isbn: (row.isbn as string) || null,
            date_read: row.date_read as string,
        }));
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

export async function getRecentBooks(limit: number = 4): Promise<Book[]> {
    if (!turso) {
        console.warn("Turso client not initialized");
        return [];
    }

    try {
        const result = await turso.execute({
            sql: "SELECT id, title, author, isbn, date_read FROM books ORDER BY date_read DESC LIMIT ?",
            args: [limit],
        });

        return result.rows.map((row) => ({
            id: row.id as string,
            title: row.title as string,
            author: row.author as string,
            isbn: (row.isbn as string) || null,
            date_read: row.date_read as string,
        }));
    } catch (error) {
        console.error("Error fetching recent books:", error);
        return [];
    }
}
