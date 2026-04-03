import { ArrowRightCircle, BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getRecentBooks } from "@/actions";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatDistance, getBookCoverUrl } from "@/lib/utils";

async function BooksCard({ className }: { className?: string }) {
    const books = await getRecentBooks(4);

    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <BookOpenText size={15} />
                            <span className="text-lg">Books</span>
                        </div>
                        <Link
                            href={"/books"}
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {books.length === 0 ? (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            No books listed yet. Check back soon!
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-4">
                            {books.map((book) => {
                                const coverUrl = getBookCoverUrl(book.isbn, "M");
                                return (
                                    <div key={book.id} className="flex gap-3 items-start">
                                        {coverUrl ? (
                                            <Image
                                                src={coverUrl}
                                                alt={book.title}
                                                width={40}
                                                height={60}
                                                className="rounded-sm object-cover shrink-0"
                                            />
                                        ) : (
                                            <div className="w-[40px] h-[60px] rounded-sm bg-neutral-200 dark:bg-neutral-800 shrink-0 flex items-center justify-center">
                                                <BookOpenText size={16} className="text-neutral-400 dark:text-neutral-600" />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <h1 className="text-sm font-medium line-clamp-1">{book.title}</h1>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{book.author}</p>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <Badge variant="outline" className="w-fit text-[10px] font-normal px-1.5 py-0 h-5">
                                                    {formatDistance(new Date(book.date_read), new Date())}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default BooksCard;
