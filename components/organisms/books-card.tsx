import { ArrowRightCircle, BookOpenText } from "lucide-react";
import Link from "next/link";
import { getRecentBooks } from "@/actions";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatDistance } from "@/lib/utils";

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
                            {books.map((book) => (
                                <div key={book.id} className="flex flex-col gap-1">
                                    <h1 className="text-sm font-medium line-clamp-1">{book.title}</h1>
                                    <div className="flex flex-wrap gap-2 items-center mt-1">
                                        <Badge variant="outline" className="w-fit text-[10px] font-normal px-1.5 py-0 h-5">
                                            {formatDistance(new Date(book.date_read), new Date())}
                                        </Badge>
                                        <Badge variant="outline" className="w-fit text-[10px] font-normal px-1.5 py-0 h-5">
                                            {new Date(book.date_read).toLocaleDateString()}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default BooksCard;
