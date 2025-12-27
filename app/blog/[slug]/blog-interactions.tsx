"use client";

import { Heart, Share2, Check } from "lucide-react";
import { useState } from "react";

interface BlogInteractionsProps {
    children: React.ReactNode;
    postId: string;
    initialLikes: number;
    formattedDate: string;
}

export default function BlogInteractions({
    children,
    postId,
    initialLikes,
    formattedDate,
}: BlogInteractionsProps) {
    const [likes, setLikes] = useState(initialLikes);
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
                body: JSON.stringify({ id: postId }),
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
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
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
        <>
            <div className="flex flex-col gap-4">
                {children}
                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>{formattedDate}</span>
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
                    <span className="text-sm font-medium">{hasLiked ? "Liked" : "Like"}</span>
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
        </>
    );
}
