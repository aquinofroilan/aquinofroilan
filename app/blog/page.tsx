import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllBlogPosts } from "@/actions";
import { formatDistance } from "@/lib/utils";

async function Blog() {
    const posts = await getAllBlogPosts();

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
                    <h1 className="text-4xl font-bold">Blog</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Technical articles, programming insights, and coding best practices.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-neutral-500 dark:text-neutral-400">No blog posts yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-2xl font-bold group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">
                                        {post.content.substring(0, 200)}...
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                                        <span>{formatDistance(new Date(post.created_at), new Date())}</span>
                                        <span>•</span>
                                        <span>{post.likes} likes</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Blog;
