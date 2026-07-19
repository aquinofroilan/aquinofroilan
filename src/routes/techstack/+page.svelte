<script lang="ts">
	import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from '$lib/data/techstack-list';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowLeft } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Froilan | TechStack</title>
</svelte:head>

<main class="mx-auto flex w-11/12 max-w-7xl flex-col gap-2 py-10">
	<a
		href="/"
		class="flex w-fit items-center gap-2 text-neutral-500 transition duration-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
	>
		<ArrowLeft size={15} />
		<h1 class="text-sm">Back</h1>
	</a>
	<div class="flex flex-col gap-5">
		<h1 class="text-center text-2xl font-bold">TechStack</h1>
		<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
			{#each [{ title: 'Frontend', items: FRONTEND }, { title: 'Backend', items: BACKEND }, { title: 'DevOps & Cloud', items: DEVOPS }, { title: 'Developer Tools', items: DEVELOPER_TOOLS }] as section, index}
				<div
					in:fly={{ y: 20, duration: 300, delay: (index + 1) * 100 }}
					out:fade={{ duration: 200 }}
					class="h-full w-full"
				>
					<Card.Root class="h-full">
						<Card.Header>
							<Card.Title class="text-lg">{section.title}</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="flex flex-wrap gap-2">
								{#each section.items as item}
									<Badge variant="outline">{item}</Badge>
								{/each}
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			{/each}
		</div>
	</div>
</main>
