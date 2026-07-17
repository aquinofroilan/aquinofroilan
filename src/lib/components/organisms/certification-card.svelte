<script lang="ts">
    import { BadgeCheck, ArrowRightCircle } from 'lucide-svelte';
    import * as Card from '$lib/components/ui/card';
    
    let { class: className = '', credlyCerts = [] } = $props<{ 
        class?: string;
        credlyCerts?: { title: string; issuer: string; link: string }[];
    }>();
</script>

<div class={className}>
    <Card.Root class="w-full h-full">
        <Card.Header>
            <Card.Title class="flex gap-2 items-center justify-between w-full">
                <div class="flex items-center gap-2">
                    <BadgeCheck size={15} />
                    <span class="text-lg">Certifications</span>
                </div>
                <a
                    href="/certifications"
                    class="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                >
                    View All
                    <ArrowRightCircle size={15} />
                </a>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="w-full flex flex-col gap-4">
                {#each credlyCerts.slice(0, 4) as cert}
                    <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        class="flex flex-col gap-1 group"
                    >
                        <h1 class="text-sm font-medium group-hover:underline underline-offset-2">
                            {cert.title}
                        </h1>
                        <p class="text-xs text-muted-foreground">{cert.issuer}</p>
                    </a>
                {/each}
            </div>
        </Card.Content>
    </Card.Root>
</div>
