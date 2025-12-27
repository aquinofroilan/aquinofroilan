import { getBlogPostById } from "@/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/molecules/markdown-content";
import BlogInteractions from "./blog-interactions";

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    const post = await getBlogPostById(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="py-10 w-11/12 max-w-7xl gap-6 flex flex-col">
            <Link
                href={"/blog"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back to Blog</h1>
            </Link>

            <article className="flex flex-col gap-6">
                <BlogInteractions
                    postId={post.id}
                    initialLikes={post.likes}
                    formattedDate={new Date(post.created_at).toLocaleDateString()}
                >
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                </BlogInteractions>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <MarkdownContent content={post.content} />
                </div>
            </article>
        </main>
    );
};

export default Blog;
