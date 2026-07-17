<script lang="ts">
    import { ArrowLeft, BookOpenText } from "lucide-svelte";
    import { formatDistance, getBookCoverUrl } from "$lib/utils";

    let { data } = $props();
</script>

<svelte:head>
    <title>Froilan | Books</title>
</svelte:head>

<main class="py-10 w-11/12 max-w-7xl mx-auto gap-4 flex flex-col">
    <a
        href="/"
        class="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 w-fit"
    >
        <ArrowLeft size={15} />
        <span class="text-sm">Back</span>
    </a>
    <div class="flex flex-col gap-6 w-full">
        <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold">Books</h1>
            <p class="text-neutral-600 dark:text-neutral-400">A list of books I have read.</p>
        </div>

        {#if data.books.length === 0}
            <div class="text-center py-12">
                <p class="text-neutral-500 dark:text-neutral-400">No books listed yet. Check back soon!</p>
            </div>
        {:else}
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {#each data.books as book (book.id)}
                    {@const coverUrl = getBookCoverUrl(book.isbn, "L")}
                    {@const readDate = new Date(book.date_read)}
                    <div class="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex gap-4">
                        {#if coverUrl}
                            <img
                                src={coverUrl}
                                alt={book.title}
                                width={80}
                                height={120}
                                class="rounded-md object-cover shrink-0 w-[80px] h-[120px]"
                            />
                        {:else}
                            <div class="w-[80px] h-[120px] rounded-md bg-neutral-200 dark:bg-neutral-800 shrink-0 flex items-center justify-center">
                                <BookOpenText
                                    size={24}
                                    class="text-neutral-400 dark:text-neutral-600"
                                />
                            </div>
                        {/if}
                        <div class="flex flex-col gap-2 min-w-0">
                            <h2 class="text-lg font-bold line-clamp-2">{book.title}</h2>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400">{book.author}</p>
                            <div class="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-auto">
                                <span>{readDate.toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{formatDistance(readDate, new Date())} ago</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</main>
