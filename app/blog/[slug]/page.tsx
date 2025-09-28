import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/data/blog-posts";
import { BlogPostComponent } from "@/components/organisms";
import type { Metadata } from "next";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const slug = (await params).slug;
    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: "Blog Post Not Found",
        };
    }

    return {
        title: `${post.title} | Froilan`,
        description: post.description,
        keywords: post.tags,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

// Generate static params for all blog posts
export function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.id,
    }));
}

const BlogPost = async ({ params }: BlogPostPageProps) => {
    const slug = (await params).slug;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="py-10 w-11/12 max-w-5xl gap-8 flex flex-col">
            {/* Navigation */}
            <Link
                href={"/blog"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back to Blog</h1>
            </Link>

            {/* Blog Post Content */}
            <BlogPostComponent post={post} />
        </main>
    );
};

export default BlogPost;
