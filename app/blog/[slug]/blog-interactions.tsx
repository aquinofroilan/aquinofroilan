"use client";

import { Button } from "@/components/ui";
import { Heart, Share2, Check } from "lucide-react";
import { useState, type ReactNode } from "react";

interface BlogInteractionsProps {
    children: ReactNode;
    postId: string;
    initialLikes: number;
    formattedDate: string;
}

export default function BlogInteractions({ children, postId, initialLikes, formattedDate }: BlogInteractionsProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleLike = async () => {
        if (hasLiked || isLiking) return;

        setIsLiking(true);

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
        } finally {
            setIsLiking(false);
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
            alert("Failed to copy link. Please copy it from your browser's address bar.");
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
                <Button
                    onClick={handleLike}
                    disabled={hasLiked || isLiking}
                    size={"icon"}
                    className="cursor-pointer "
                    aria-label="Like this post"
                >
                    <Heart size={18} className={hasLiked ? "fill-current" : ""} />
                </Button>

                <Button onClick={handleShare} className="cursor-pointer " size={"icon"} aria-label="Share this post">
                    {copied ? <Check size={18} /> : <Share2 size={18} />}
                </Button>
            </div>
        </>
    );
}
