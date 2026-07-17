<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    import { Github } from "$lib/components/atoms";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Separator } from "$lib/components/ui/separator";
    import ImageGallery from "$lib/components/organisms/image-gallery.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Froilan | {data.project.title}</title>
</svelte:head>

<main class="py-10 w-11/12 max-w-7xl mx-auto gap-2 flex flex-col md:grid md:grid-cols-2">
    <a
        href="/projects"
        class="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 w-fit"
    >
        <ArrowLeft size={15} />
        <h1 class="text-sm">Back to Projects</h1>
    </a>
    <div class="grid place-content-center col-span-2 w-full h-full">
        <section class="flex flex-row justify-between items-center gap-4 mb-5">
            <h1 class="text-2xl text-center font-bold">{data.project.title}</h1>
            {#if data.project.projectLink.length > 1}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <div class="cursor-pointer hover:opacity-75 transition-opacity">
                            <Github class="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        {#each data.project.projectLink as link}
                            <DropdownMenu.Item>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" class="w-full h-full">
                                    {link.label}
                                </a>
                            </DropdownMenu.Item>
                        {/each}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            {:else}
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <a href={data.project.projectLink[0]?.url || "#"} target="_blank" rel="noopener noreferrer">
                            <Github class="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p class="text-sm">View Source Code</p>
                    </Tooltip.Content>
                </Tooltip.Root>
            {/if}
        </section>
        <section>
            <h6 class="text-lg font-semibold">Overview</h6>
            <p class="mt-2 text-neutral-700 dark:text-neutral-300">{data.project.longDescription}</p>
        </section>
        <Separator class="my-4" />
        <section>
            <h6 class="text-lg font-semibold">Snapshots</h6>
            <ImageGallery images={data.snapshotLinks} />
        </section>
        <section class="flex justify-end items-center my-4">
            <div class="flex flex-row gap-4">
                {#if data.project.techStackEntries}
                    {#each data.project.techStackEntries as TechIcon}
                        <TechIcon class="w-6 h-6" />
                    {/each}
                {/if}
            </div>
        </section>
    </div>
</main>
