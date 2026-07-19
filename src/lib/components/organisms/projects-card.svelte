<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { ArrowRightCircle, FolderCode } from 'lucide-svelte';
	import { ProjectsList } from '$lib/data/projects-list';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
	<Card.Root class="flex h-full w-full flex-col gap-3">
		<Card.Header>
			<Card.Title class="flex w-full items-center justify-between">
				<div class="flex items-center gap-2">
					<FolderCode size={15} />
					<span class="text-lg">Projects</span>
				</div>
				<a
					href="/projects"
					class="flex items-center gap-2 text-xs text-neutral-500 transition duration-200 hover:text-neutral-700 md:text-base dark:text-neutral-400 dark:hover:text-neutral-200"
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
						<section class="flex w-full items-center justify-between">
							<p>{project.title}</p>
							<a
								href={project.pageLink}
								rel="noreferrer"
								class="text-muted-foreground hover:text-foreground text-xs transition-colors"
							>
								Details
							</a>
						</section>
						<p class="text-muted-foreground line-clamp-2 text-xs">
							{project.description}
						</p>
						<div class="flex flex-wrap gap-2">
							{#each project.footerContent as footer}
								<Badge
									variant="secondary"
									class="flex h-5 w-fit flex-row items-center gap-1 px-2 py-0 text-[10px] font-normal"
								>
									{@const Icon = footer.icon}
									<Icon class="h-5 w-5" />
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
