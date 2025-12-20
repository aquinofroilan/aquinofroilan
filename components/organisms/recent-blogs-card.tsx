import * as motion from "motion/react-client";
import { Badge, BentoGridItem } from "@/components/ui";
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
            <BentoGridItem
                className="flex flex-col gap-3 h-full w-full"
                icon={<BookOpen size={15} />}
                title={
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-lg">Recent Blogs</h1>
                        <Link
                            href={"/blog"}
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </div>
                }
                description={
                    posts.length === 0 ? (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            No blog posts yet. Check back soon!
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.id}`}
                                    className="flex-col flex gap-2 items-start p-5 rounded-md border transition duration-200 hover:border-neutral-300 dark:hover:border-neutral-700"
                                >
                                    <section className="flex justify-between w-full items-center">
                                        <h3 className="text-base font-semibold hover:underline underline-offset-2 line-clamp-1">
                                            {post.title}
                                        </h3>
                                    </section>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                        {post.content.substring(0, 150)}...
                                    </p>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <Badge
                                            variant="outline"
                                            className="w-fit text-xs font-normal"
                                        >
                                            {formatDistance(new Date(post.created_at), new Date())}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="w-fit text-xs font-normal"
                                        >
                                            {post.likes} likes
                                        </Badge>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                }
            />
        </motion.div>
    );
}

export default RecentBlogsCard;
