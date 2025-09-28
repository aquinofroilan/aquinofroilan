import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllBlogPosts } from "@/data/blog-posts";
import { BlogCard } from "@/components/organisms";

function Blog() {
    const posts = getAllBlogPosts();

    return (
        <main className="py-10 w-11/12 max-w-5xl gap-8 flex flex-col">
            {/* Navigation */}
            <Link
                href={"/"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>

            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground">Blog</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Welcome to my blog! Here I share my thoughts, experiences, and insights on web development, 
                    technology trends, and personal growth. I hope you find something valuable in these posts.
                </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {posts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                ))}
            </div>

            {/* Empty state fallback (shouldn't show with sample data) */}
            {posts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">
                        No blog posts available yet. Check back soon!
                    </p>
                </div>
            )}
        </main>
    );
}

export default Blog;
