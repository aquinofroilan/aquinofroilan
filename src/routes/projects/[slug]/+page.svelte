<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { Github } from '$lib/components/atoms';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Separator } from '$lib/components/ui/separator';
	import ImageGallery from '$lib/components/organisms/image-gallery.svelte';
	import { ProjectsList } from '$lib/data/projects-list';

	let { data } = $props();

	const projectLink = $derived(
		data.project.projectLink.find(
			(link) => link.label === 'Backend' || link.label === 'Repository'
		) || data.project.projectLink[0]
	);

	const techStackEntries = $derived(
		ProjectsList.find((p) => p.slug === data.project.slug)?.techStackEntries
	);
</script>

<svelte:head>
	<title>Froilan | {data.project.title}</title>
</svelte:head>

<main class="mx-auto flex w-11/12 max-w-7xl flex-col gap-2 py-10 md:grid md:grid-cols-2">
	<a
		href="/projects"
		class="flex w-fit items-center gap-2 text-neutral-500 transition duration-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
	>
		<ArrowLeft size={15} />
		<h1 class="text-sm">Back to Projects</h1>
	</a>
	<div class="col-span-2 grid h-full w-full place-content-center">
		<section class="mb-5 flex flex-row items-center justify-between gap-4">
			<h1 class="text-center text-2xl font-bold">{data.project.title}</h1>
			{#if projectLink}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<a href={projectLink.url} target="_blank" rel="noopener noreferrer">
								<Github class="h-5 w-5 md:h-6 md:w-6" />
							</a>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p class="text-sm">View Source Code</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/if}
		</section>
		<section>
			<h6 class="text-lg font-semibold">Overview</h6>
			<p class="mt-2 text-neutral-700 dark:text-neutral-300">
				{data.project.longDescription}
			</p>
		</section>
		<Separator class="my-4" />
		<section>
			<h6 class="text-lg font-semibold">Snapshots</h6>
			<ImageGallery images={data.snapshotLinks} />
		</section>
		<section class="my-4 flex items-center justify-end">
			<div class="flex flex-row gap-4">
				{#if techStackEntries}
					{#each techStackEntries as TechIcon}
						<TechIcon class="h-6 w-6" />
					{/each}
				{/if}
			</div>
		</section>
	</div>
</main>
