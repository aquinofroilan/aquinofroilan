<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRightCircle, FlaskConical } from 'lucide-svelte';

	// Fallback data if import fails
	import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from '$lib/data/techstack-list';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
	<Card.Root class="flex h-full w-full flex-col gap-3">
		<Card.Header>
			<Card.Title class="flex w-full items-center justify-between">
				<div class="flex items-center gap-2">
					<FlaskConical size={15} />
					<span class="text-lg">Tech Stack</span>
				</div>
				<a
					class="flex items-center gap-2 text-xs text-neutral-500 transition duration-200 hover:text-neutral-700 md:text-base dark:text-neutral-400 dark:hover:text-neutral-200"
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
					<div class="mt-2 flex flex-wrap gap-2">
						{#each FRONTEND.slice(0, 6) as item}
							<Badge variant="outline" class="w-fit text-xs font-semibold">
								{item}
							</Badge>
						{/each}
					</div>
				</div>
				<div>
					<h1>Backend</h1>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each BACKEND.slice(0, 6) as item}
							<Badge variant="outline" class="w-fit text-xs font-semibold">
								{item}
							</Badge>
						{/each}
					</div>
				</div>
				<div>
					<h1>DevOps & Cloud</h1>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each DEVOPS.slice(0, 6) as item}
							<Badge variant="outline" class="w-fit text-xs font-semibold">
								{item}
							</Badge>
						{/each}
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<h1>Developer Tools</h1>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each DEVELOPER_TOOLS.slice(0, 6) as item}
							<Badge variant="outline" class="w-fit text-xs font-semibold">
								{item}
							</Badge>
						{/each}
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
