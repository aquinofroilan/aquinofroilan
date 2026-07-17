<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    import { formatDistance, stripMarkdown } from "$lib/utils";

    let { data } = $props();
</script>

<svelte:head>
    <title>Froilan | Blog</title>
</svelte:head>

<main class="py-10 w-11/12 max-w-7xl mx-auto gap-4 flex flex-col">
    <a
        href="/"
        class="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 w-fit"
    >
        <ArrowLeft size={15} />
        <h1 class="text-sm">Back</h1>
    </a>
    <div class="flex flex-col gap-6 w-full">
        <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold">Blog</h1>
            <p class="text-neutral-600 dark:text-neutral-400">
                Technical articles, programming insights, and coding best practices.
            </p>
        </div>

        {#if data.posts.length === 0}
            <div class="text-center py-12">
                <p class="text-neutral-500 dark:text-neutral-400">No blog posts yet. Check back soon!</p>
            </div>
        {:else}
            <div class="grid gap-4">
                {#each data.posts as post (post.id)}
                    <a
                        href="/blog/{post.id}"
                        class="group border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-md"
                    >
                        <div class="flex flex-col gap-3">
                            <h2 class="text-2xl font-bold group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                                {post.title}
                            </h2>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">
                                {stripMarkdown(post.content, 200)}
                            </p>
                            <div class="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                                <span>{formatDistance(new Date(post.created_at), new Date())} ago</span>
                                <span>•</span>
                                <span>{post.likes} likes</span>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</main>
