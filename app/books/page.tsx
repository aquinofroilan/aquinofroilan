import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllBooks } from "@/actions";
import { formatDistance } from "@/lib/utils";

export const metadata: Metadata = {
    title: `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"} | ${process.env.CURRENT_COMPANY || ""} | ${process.env.CURRENT_WORK_LOCATION || "Philippines"} | Books`,
    description: `Books read by Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"}, listed from the database.`,
    keywords: ["Froilan's Books", "Books Read", "Reading List"],
};

async function Books() {
    const books = await getAllBooks();

    return (
        <main className="py-10 w-11/12 max-w-7xl gap-4 flex flex-col">
            <Link
                href={"/"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold">Books</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">A list of books I have read.</p>
                </div>

                {books.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-neutral-500 dark:text-neutral-400">No books listed yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6"
                            >
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl font-bold">{book.title}</h2>
                                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                        <span>{new Date(book.date_read).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{formatDistance(new Date(book.date_read), new Date())}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Books;
