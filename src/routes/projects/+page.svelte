<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { ProjectsList } from "$lib/data/projects-list";
    import { fly, fade } from "svelte/transition";
</script>

<svelte:head>
    <title>Froilan | Projects</title>
</svelte:head>

<main class="py-10 w-11/12 max-w-7xl mx-auto gap-2 flex flex-col md:grid md:grid-cols-2">
    <a
        href="/"
        class="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 w-fit"
    >
        <ArrowLeft size={15} />
        <h1 class="text-sm">Back</h1>
    </a>
    <div class="col-span-2 w-full flex flex-col gap-5">
        <h1 class="text-2xl text-center font-bold">Projects</h1>
        <div class="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
            {#each ProjectsList as project, index (project.pageLink)}
                <div
                    in:fly={{ y: 20, duration: 300, delay: index * 100 }}
                    out:fade={{ duration: 200 }}
                    class="w-full h-full"
                >
                    <div class="grid grid-cols-1 gap-2 items-center p-5 rounded-md border transition duration-200 w-full h-full">
                        <div class="flex flex-col gap-1 h-full justify-between">
                            <div class="flex flex-col gap-1">
                                <section class="flex justify-between w-full items-center">
                                    <p class="text-base font-semibold">{project.title}</p>
                                    <a
                                        class="text-base font-semibold hover:underline underline-offset-2"
                                        href={project.pageLink}
                                    >
                                        View
                                    </a>
                                </section>
                                <p class="text-sm">{project.description}</p>
                            </div>
                            <div class="flex flex-wrap gap-2 mt-auto pt-4">
                                {#each project.footerContent as footer}
                                    <Badge
                                        variant="outline"
                                        class="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        {@const Icon = footer.icon}
                                        <Icon class="w-4 h-4" />
                                        {footer.text}
                                    </Badge>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>
