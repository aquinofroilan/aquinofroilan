<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    import MarkdownContent from "$lib/components/molecules/markdown-content.svelte";
    import BlogInteractions from "$lib/components/molecules/blog-interactions.svelte";

    let { data } = $props();
    let post = $derived(data.post);
</script>

<svelte:head>
    <title>Froilan | Blog | {post.title}</title>
</svelte:head>

<main class="py-10 w-11/12 max-w-7xl mx-auto gap-6 flex flex-col">
    <a
        href="/blog"
        class="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 w-fit"
    >
        <ArrowLeft size={15} />
        <h1 class="text-sm">Back to Blog</h1>
    </a>

    <article class="flex flex-col gap-6">
        <BlogInteractions
            postId={post.id}
            initialLikes={post.likes}
            formattedDate={new Date(post.created_at).toLocaleDateString()}
        >
            <h1 class="text-4xl font-bold">{post.title}</h1>
        </BlogInteractions>

        <div class="max-w-none w-full">
            <MarkdownContent content={post.content} />
        </div>
    </article>
</main>
