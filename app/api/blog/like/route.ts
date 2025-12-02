import { NextResponse } from "next/server";
import { incrementBlogLikes } from "@/actions/blog";

export async function POST(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        const newLikes = await incrementBlogLikes(id);

        return NextResponse.json({
            success: true,
            likes: newLikes,
        });
    } catch (error) {
        console.error("Error incrementing likes:", error);
        return NextResponse.json(
            { error: "Failed to increment likes" },
            { status: 500 }
        );
    }
}
