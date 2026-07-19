<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { ProjectsList } from '$lib/data/projects-list';
	import { fly, fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Froilan | Projects</title>
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
		<h1 class="text-center text-2xl font-bold">Projects</h1>
		<div class="col-span-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
			{#each ProjectsList as project, index (project.pageLink)}
				<div
					in:fly={{ y: 20, duration: 300, delay: index * 100 }}
					out:fade={{ duration: 200 }}
					class="h-full w-full"
				>
					<div
						class="grid h-full w-full grid-cols-1 items-center gap-2 rounded-none border p-5 transition duration-200"
					>
						<div class="flex h-full flex-col justify-between gap-1">
							<div class="flex flex-col gap-1">
								<section class="flex w-full items-center justify-between">
									<p class="text-base font-semibold">{project.title}</p>
									<a
										class="text-base font-semibold underline-offset-2 hover:underline"
										href={project.pageLink}
									>
										View
									</a>
								</section>
								<p class="text-sm">{project.description}</p>
							</div>
							<div class="mt-auto flex flex-wrap gap-2 pt-4">
								{#each project.footerContent as footer}
									<Badge
										variant="outline"
										class="flex w-fit flex-row items-center gap-1 text-xs font-semibold"
									>
										{@const Icon = footer.icon}
										<Icon class="h-4 w-4" />
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
