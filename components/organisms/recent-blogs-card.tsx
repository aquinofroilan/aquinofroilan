import * as motion from "motion/react-client";
import { Badge, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import Link from "next/link";
import { ArrowRightCircle, BookOpen } from "lucide-react";
import { getRecentBlogPosts } from "@/actions";
import { formatDistance } from "@/lib/utils";

/**
 * Render a motion-enabled "Recent Blogs" card that displays a header with a "View All" link and up to four recent blog entries.
 *
 * Each blog entry shows a title (links to the blog post), a timestamp, and the number of likes.
 *
 * @param className - Optional CSS classes applied to the root motion container
 * @returns A React element representing the Recent Blogs card with animated entrance/exit, header controls, and blog entries
 */
async function RecentBlogsCard({ className }: { className?: string }) {
    const posts = await getRecentBlogPosts(4);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.5,
            }}
            className={className}
        >
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <BookOpen size={15} />
                            <span className="text-lg">Recent Blogs</span>
                        </div>
                        <Link
                            href={"/blog"}
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {posts.length === 0 ? (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            No blog posts yet. Check back soon!
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-4">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.id}`}
                                    className="flex flex-col gap-1 group"
                                >
                                    <h1 className="text-sm font-medium group-hover:underline underline-offset-2 line-clamp-1">
                                        {post.title}
                                    </h1>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {post.content.substring(0, 150)}...
                                    </p>
                                    <div className="flex flex-wrap gap-2 items-center mt-1">
                                        <Badge variant="outline" className="w-fit text-[10px] font-normal px-1.5 py-0 h-5">
                                            {formatDistance(new Date(post.created_at), new Date())}
                                        </Badge>
                                        <Badge variant="outline" className="w-fit text-[10px] font-normal px-1.5 py-0 h-5">
                                            {post.likes} likes
                                        </Badge>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default RecentBlogsCard;
