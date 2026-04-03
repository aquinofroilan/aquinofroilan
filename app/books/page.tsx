import { ArrowLeft, BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllBooks } from "@/actions";
import { formatDistance, getBookCoverUrl } from "@/lib/utils";

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
                <span className="text-sm">Back</span>
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
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => {
                            const coverUrl = getBookCoverUrl(book.isbn, "L");
                            const readDate = new Date(book.date_read);
                            return (
                                <div
                                    key={book.id}
                                    className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex gap-4"
                                >
                                    {coverUrl ? (
                                        <Image
                                            src={coverUrl}
                                            alt={book.title}
                                            width={80}
                                            height={120}
                                            className="rounded-md object-cover shrink-0"
                                        />
                                    ) : (
                                        <div className="w-[80px] h-[120px] rounded-md bg-neutral-200 dark:bg-neutral-800 shrink-0 flex items-center justify-center">
                                            <BookOpenText size={24} className="text-neutral-400 dark:text-neutral-600" />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2 min-w-0">
                                        <h2 className="text-lg font-bold line-clamp-2">{book.title}</h2>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{book.author}</p>
                                        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-auto">
                                            <span>{readDate.toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{formatDistance(readDate, new Date())}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Books;
