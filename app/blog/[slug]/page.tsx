import { getBlogPostById } from "@/actions";
import { notFound } from "next/navigation";
import BlogPostClient from "./blog-post-client";

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    const post = await getBlogPostById(slug);

    if (!post) {
        notFound();
    }

    return <BlogPostClient post={post} />;
};

export default Blog;
