<script lang="ts">
	import { BadgeCheck, ArrowRightCircle } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';

	let { class: className = '', credlyCerts = [] } = $props<{
		class?: string;
		credlyCerts?: { title: string; issuer: string; link: string }[];
	}>();
</script>

<div class={className}>
	<Card.Root class="h-full w-full">
		<Card.Header>
			<Card.Title class="flex w-full items-center justify-between gap-2">
				<div class="flex items-center gap-2">
					<BadgeCheck size={15} />
					<span class="text-lg">Certifications</span>
				</div>
				<a
					href="/certifications"
					class="flex items-center gap-2 text-xs text-neutral-500 transition duration-200 hover:text-neutral-700 md:text-base dark:text-neutral-400 dark:hover:text-neutral-200"
				>
					View All
					<ArrowRightCircle size={15} />
				</a>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex w-full flex-col gap-4">
				{#each credlyCerts.slice(0, 4) as cert}
					<a
						href={cert.link}
						target="_blank"
						rel="noreferrer"
						class="group flex flex-col gap-1"
					>
						<h1 class="text-sm font-medium underline-offset-2 group-hover:underline">
							{cert.title}
						</h1>
						<p class="text-muted-foreground text-xs">{cert.issuer}</p>
					</a>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
</div>
