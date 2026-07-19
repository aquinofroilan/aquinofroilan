<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { fly, fade } from 'svelte/transition';

	let { data } = $props();
</script>

<svelte:head>
	<title>Froilan | Certifications</title>
</svelte:head>

<main class="mx-auto flex w-11/12 max-w-7xl flex-col gap-2 py-10 md:grid md:grid-cols-2">
	<a
		href="/"
		class="flex w-fit items-center gap-2 text-neutral-500 transition duration-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
	>
		<ArrowLeft size={15} />
		<h1 class="text-sm">Back</h1>
	</a>
	<div class="col-span-2 flex w-full flex-col gap-5">
		<h1 class="text-center text-2xl font-bold">All Certifications</h1>
		<div class="col-span-2 grid grid-cols-1 gap-2 md:grid-cols-2">
			{#each data.credlyCerts as c, index (c.link)}
				<div
					in:fly={{ y: 20, duration: 300, delay: index * 100 }}
					out:fade={{ duration: 200 }}
					class="h-full w-full"
				>
					<a href={c.link} target="_blank" rel="noopener noreferrer" class="block h-full">
						<Card.Root class="hover:bg-muted/50 h-full transition-colors">
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
