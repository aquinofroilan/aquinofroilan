<script lang="ts">
    import { Badge } from '$lib/components/ui/badge';
    import * as Card from '$lib/components/ui/card';
    import { ArrowRightCircle, FolderCode } from 'lucide-svelte';
    // Fallback if not moved yet
    import { ProjectsList } from '../../../../data/projects-list';

    let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
    <Card.Root class="flex flex-col gap-3 h-full w-full">
        <Card.Header>
            <Card.Title class="flex justify-between items-center w-full">
                <div class="flex items-center gap-2">
                    <FolderCode size={15} />
                    <span class="text-lg">Projects</span>
                </div>
                <a
                    href="/projects"
                    class="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                >
                    View All
                    <ArrowRightCircle size={15} />
                </a>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-col gap-6">
                {#each ProjectsList.slice(0, 2) as project}
                    <div class="flex flex-col gap-2">
                        <section class="flex justify-between w-full items-center">
                            <p>{project.title}</p>
                            <a
                                href={project.pageLink}
                                rel="noreferrer"
                                class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Details
                            </a>
                        </section>
                        <p class="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                        <div class="flex flex-wrap gap-2">
                            {#each project.footerContent as footer}
                                <Badge
                                    variant="secondary"
                                    class="w-fit text-[10px] px-2 py-0 h-5 flex flex-row gap-1 items-center font-normal"
                                >
                                    {@const Icon = footer.icon}
                                    <Icon class="w-5 h-5" />
                                    {footer.text}
                                </Badge>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </Card.Content>
    </Card.Root>
</div>
