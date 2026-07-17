<script lang="ts">
    import * as Button from "$lib/components/ui/button";
    import { Heart, Share2, Check } from "lucide-svelte";
    import type { Snippet } from "svelte";

    let { 
        postId, 
        initialLikes, 
        formattedDate, 
        children 
    } = $props<{ 
        postId: string; 
        initialLikes: number; 
        formattedDate: string;
        children?: Snippet;
    }>();

    let likes = $state(initialLikes);
    let hasLiked = $state(false);
    let isLiking = $state(false);
    let copied = $state(false);

    const handleLike = async () => {
        if (hasLiked || isLiking) return;

        isLiking = true;

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
                likes = data.likes;
                hasLiked = true;
            }
        } catch (error) {
            console.error("Error liking post:", error);
        } finally {
            isLiking = false;
        }
    };

    const handleShare = async () => {
        const url = window.location.href;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                copied = true;
                setTimeout(() => copied = false, 2000);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand("copy");
                    copied = true;
                    setTimeout(() => copied = false, 2000);
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        } catch (error) {
            console.error("Error copying to clipboard:", error);
            alert("Failed to copy link. Please copy it from your browser's address bar.");
        }
    };
</script>

<div class="flex flex-col gap-4">
    {@render children?.()}
    <div class="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <span>{formattedDate}</span>
        <span>•</span>
        <span>{likes} likes</span>
    </div>
</div>

<div class="flex gap-3">
    <Button.Root
        onclick={handleLike}
        disabled={hasLiked || isLiking}
        size="icon"
        class="cursor-pointer"
        aria-label="Like this post"
    >
        {#if hasLiked}
            <Heart size={18} class="fill-current" />
        {:else}
            <Heart size={18} />
        {/if}
    </Button.Root>

    <Button.Root onclick={handleShare} class="cursor-pointer" size="icon" aria-label="Share this post">
        {#if copied}
            <Check size={18} />
        {:else}
            <Share2 size={18} />
        {/if}
    </Button.Root>
</div>
