<script lang="ts">
    import { ArrowRightCircle, BookOpenText } from 'lucide-svelte';
    import { Badge } from '$lib/components/ui/badge';
    import * as Card from '$lib/components/ui/card';
    import { formatDistance, getBookCoverUrl } from '$lib/utils';
    
    let { class: className = '', books = [] } = $props<{
        class?: string;
        books?: {
            id: string;
            title: string;
            author: string;
            isbn: string;
            date_read: string;
        }[];
    }>();
</script>

<div class={className}>
    <Card.Root class="w-full h-full">
        <Card.Header>
            <Card.Title class="flex gap-2 items-center justify-between w-full">
                <div class="flex items-center gap-2">
                    <BookOpenText size={15} />
                    <span class="text-lg">Books</span>
                </div>
                <a
                    href="/books"
                    class="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                >
                    View All
                    <ArrowRightCircle size={15} />
                </a>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            {#if books.length === 0}
                <div class="text-sm text-neutral-500 dark:text-neutral-400">
                    No books listed yet. Check back soon!
                </div>
            {:else}
                <div class="w-full flex flex-col gap-4">
                    {#each books as book}
                        {@const coverUrl = getBookCoverUrl(book.isbn, "M")}
                        {@const readDate = new Date(book.date_read)}
                        <div class="flex gap-3 items-start">
                            {#if coverUrl}
                                <img
                                    src={coverUrl}
                                    alt={book.title}
                                    width={40}
                                    height={60}
                                    class="rounded-sm object-cover shrink-0 w-[40px] h-auto"
                                />
                            {:else}
                                <div class="w-[40px] h-[60px] rounded-sm bg-neutral-200 dark:bg-neutral-800 shrink-0 flex items-center justify-center">
                                    <BookOpenText
                                        size={16}
                                        class="text-neutral-400 dark:text-neutral-600"
                                    />
                                </div>
                            {/if}
                            <div class="flex flex-col gap-1 min-w-0">
                                <h3 class="text-sm font-medium line-clamp-1">{book.title}</h3>
                                <p class="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                    {book.author}
                                </p>
                                <div class="flex flex-wrap gap-2 items-center mt-1">
                                    <Badge
                                        variant="outline"
                                        class="w-fit text-[10px] font-normal px-1.5 py-0 h-5"
                                    >
                                        {formatDistance(readDate, new Date())}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
