<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card";
    import { fly, fade } from "svelte/transition";

    let { data } = $props();
</script>

<svelte:head>
    <title>Froilan | Certifications</title>
</svelte:head>

<main class="py-10 w-11/12 max-w-7xl gap-2 flex flex-col md:grid md:grid-cols-2 mx-auto">
    <a
        href="/"
        class="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 w-fit"
    >
        <ArrowLeft size={15} />
        <h1 class="text-sm">Back</h1>
    </a>
    <div class="col-span-2 w-full flex flex-col gap-5">
        <h1 class="text-2xl text-center font-bold">All Certifications</h1>
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {#each data.credlyCerts as c, index (c.link)}
                <div
                    in:fly={{ y: 20, duration: 300, delay: index * 100 }}
                    out:fade={{ duration: 200 }}
                    class="w-full h-full"
                >
                    <a href={c.link} target="_blank" rel="noopener noreferrer" class="block h-full">
                        <Card.Root class="h-full hover:bg-muted/50 transition-colors">
                            <Card.Header>
                                <Card.Title class="text-sm">{c.title}</Card.Title>
                                <Card.Description class="text-sm">{c.issuer}</Card.Description>
                            </Card.Header>
                        </Card.Root>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</main>
