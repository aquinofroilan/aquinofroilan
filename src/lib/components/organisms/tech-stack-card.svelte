<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { ArrowRightCircle, FlaskConical } from 'lucide-svelte';
    
    // Fallback data if import fails
    import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from '$lib/data/techstack-list';
    
    let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
    <Card.Root class="flex flex-col gap-3 h-full w-full">
        <Card.Header>
            <Card.Title class="flex justify-between items-center w-full">
                <div class="flex items-center gap-2">
                    <FlaskConical size={15} />
                    <span class="text-lg">Tech Stack</span>
                </div>
                <a
                    class="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                    href="/techstack"
                >
                    View All
                    <ArrowRightCircle size={15} />
                </a>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-col gap-5">
                <div>
                    <h1>Frontend</h1>
                    <div class="flex flex-wrap gap-2 mt-2">
                        {#each FRONTEND.slice(0, 6) as item}
                            <Badge variant="outline" class="w-fit font-semibold text-xs">
                                {item}
                            </Badge>
                        {/each}
                    </div>
                </div>
                <div>
                    <h1>Backend</h1>
                    <div class="flex flex-wrap gap-2 mt-2">
                        {#each BACKEND.slice(0, 6) as item}
                            <Badge variant="outline" class="w-fit font-semibold text-xs">
                                {item}
                            </Badge>
                        {/each}
                    </div>
                </div>
                <div>
                    <h1>DevOps & Cloud</h1>
                    <div class="flex flex-wrap gap-2 mt-2">
                        {#each DEVOPS.slice(0, 6) as item}
                            <Badge variant="outline" class="w-fit font-semibold text-xs">
                                {item}
                            </Badge>
                        {/each}
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h1>Developer Tools</h1>
                    <div class="flex flex-wrap gap-2 mt-2">
                        {#each DEVELOPER_TOOLS.slice(0, 6) as item}
                            <Badge variant="outline" class="w-fit font-semibold text-xs">
                                {item}
                            </Badge>
                        {/each}
                    </div>
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div>
