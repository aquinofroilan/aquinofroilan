"use client";

import { ArrowLeft, Heart, Share2, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    created_at: string;
    likes: number;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
    const [likes, setLikes] = useState(post.likes);
    const [hasLiked, setHasLiked] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleLike = async () => {
        if (hasLiked) return;

        try {
            const response = await fetch("/api/blog/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: post.id }),
            });

            if (response.ok) {
                const data = await response.json();
                setLikes(data.likes);
                setHasLiked(true);
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleShare = async () => {
        const url = window.location.href;
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand("copy");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        } catch (error) {
            console.error("Error copying to clipboard:", error);
            alert(`Please copy this URL manually: ${url}`);
        }
    };

    return (
        <main className="py-10 w-11/12 max-w-4xl gap-6 flex flex-col">
            <Link
                href={"/blog"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back to Blog</h1>
            </Link>

            <article className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{likes} likes</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleLike}
                        disabled={hasLiked}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                            hasLiked
                                ? "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
                                : "border-neutral-200 dark:border-neutral-800 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        }`}
                    >
                        <Heart size={18} className={hasLiked ? "fill-current" : ""} />
                        <span className="text-sm font-medium">
                            {hasLiked ? "Liked" : "Like"}
                        </span>
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200"
                    >
                        {copied ? (
                            <>
                                <Check size={18} />
                                <span className="text-sm font-medium">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Share2 size={18} />
                                <span className="text-sm font-medium">Share</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                            h1: ({ ...props }) => (
                                <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
                            ),
                            h2: ({ ...props }) => (
                                <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
                            ),
                            h3: ({ ...props }) => (
                                <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
                            ),
                            p: ({ ...props }) => (
                                <p className="mb-4 leading-7" {...props} />
                            ),
                            code: ({ className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || "");
                                return match ? (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <code
                                        className="bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded text-sm"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                            pre: ({ ...props }) => (
                                <pre className="bg-neutral-900 dark:bg-neutral-950 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                            ),
                            ul: ({ ...props }) => (
                                <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
                            ),
                            ol: ({ ...props }) => (
                                <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
                            ),
                            blockquote: ({ ...props }) => (
                                <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 italic my-4" {...props} />
                            ),
                            a: ({ ...props }) => (
                                <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </main>
    );
}
