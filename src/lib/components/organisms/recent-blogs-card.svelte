<script lang="ts">
    import { Badge } from '$lib/components/ui/badge';
    import * as Card from '$lib/components/ui/card';
    import { ArrowRightCircle, BookOpen } from 'lucide-svelte';
    import { formatDistance, stripMarkdown } from '$lib/utils';
    
    let { class: className = '', posts = [] } = $props<{
        class?: string;
        posts?: {
            id: string;
            title: string;
            content: string;
            created_at: string;
            likes: number;
        }[];
    }>();
</script>

<div class={className}>
    <Card.Root class="w-full h-full">
        <Card.Header>
            <Card.Title class="flex gap-2 items-center justify-between w-full">
                <div class="flex items-center gap-2">
                    <BookOpen size={15} />
                    <span class="text-lg">Recent Blogs</span>
                </div>
                <a
                    href="/blog"
                    class="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                >
                    View All
                    <ArrowRightCircle size={15} />
                </a>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            {#if posts.length === 0}
                <div class="text-sm text-neutral-500 dark:text-neutral-400">
                    No blog posts yet. Check back soon!
                </div>
            {:else}
                <div class="w-full flex flex-col gap-4">
                    {#each posts as post}
                        <a href={`/blog/${post.id}`} class="flex flex-col gap-1 group">
                            <h1 class="text-sm font-medium group-hover:underline underline-offset-2 line-clamp-1">
                                {post.title}
                            </h1>
                            <p class="text-xs text-muted-foreground line-clamp-2">
                                {stripMarkdown(post.content, 150)}
                            </p>
                            <div class="flex flex-wrap gap-2 items-center mt-1">
                                <Badge
                                    variant="outline"
                                    class="w-fit text-[10px] font-normal px-1.5 py-0 h-5"
                                >
                                    {formatDistance(new Date(post.created_at), new Date())}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    class="w-fit text-[10px] font-normal px-1.5 py-0 h-5"
                                >
                                    {post.likes} likes
                                </Badge>
                            </div>
                        </a>
                    {/each}
                </div>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
