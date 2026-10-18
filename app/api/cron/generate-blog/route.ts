import { NextResponse } from "next/server";
import { generateBlogContent } from "@/lib/gemini";
import { createBlogPost } from "@/actions/blog";

export async function GET(request: Request) {
    try {
        // Verify the request is from Vercel Cron
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Generate blog content using Gemini
        const { title, content } = await generateBlogContent();

        // Save to database
        const blogPost = await createBlogPost(title, content);

        return NextResponse.json({
            success: true,
            message: "Blog post generated successfully",
            post: {
                id: blogPost.id,
                title: blogPost.title,
            },
        });
    } catch (error) {
        console.error("Error in CRON job:", error);
        return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 });
    }
}
