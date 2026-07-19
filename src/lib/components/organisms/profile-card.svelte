<script lang="ts">
	import {
		BadgeCheck,
		CircleDot,
		GitCommitVertical,
		GitPullRequest,
		Mail,
		MapPin,
		Phone,
		Star
	} from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	let {
		class: className = '',
		githubStats = null,
		CURRENT_TITLE = 'Software Engineer',
		CURRENT_COMPANY = '',
		CURRENT_WORK_LOCATION = 'Philippines',
		SCHEDULE_A_CALL_URL = '',
		SEND_EMAIL_URL = ''
	} = $props<{
		class?: string;
		githubStats?: {
			stars: number;
			pullRequests: number;
			issues: number;
			commits: number;
		} | null;
		CURRENT_TITLE?: string;
		CURRENT_COMPANY?: string;
		CURRENT_WORK_LOCATION?: string;
		SCHEDULE_A_CALL_URL?: string;
		SEND_EMAIL_URL?: string;
	}>();
</script>

<div class={className}>
	<Card.Root class="h-full w-full gap-0">
		<Card.Content class="flex flex-row items-center gap-5 p-6">
			<div class="flex shrink-0 items-center justify-center md:block">
				<img
					src="/images/me.webp"
					width={75}
					height={75}
					alt="Froilan Aquino"
					class="rounded-none"
				/>
			</div>

			<div class="flex min-w-0 flex-1 flex-col justify-center">
				<div class="flex flex-row items-center gap-2">
					<h1 class="text-md font-bold lg:text-lg">Froilan Aquino</h1>
					<BadgeCheck size={15} color="#0087ED" />
				</div>
				<p class="flex items-center gap-2 text-[11px] md:text-sm">
					<MapPin size={15} />
					<span class="truncate">Caloocan City, MNL, PH</span>
				</p>
				<p class="text-[11px] md:text-sm">
					{CURRENT_TITLE}
					{CURRENT_COMPANY ? `- ${CURRENT_COMPANY}` : ''} - {CURRENT_WORK_LOCATION}
				</p>
			</div>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-3 border-none bg-transparent p-6 pt-0">
			{#if githubStats}
				<div class="text-muted-foreground grid w-full grid-cols-4 text-xs">
					<div class="flex flex-col items-center gap-0.5">
						<Star size={14} />
						<span class="text-foreground font-medium">{githubStats.stars}</span>
						<span>stars</span>
					</div>
					<div class="flex flex-col items-center gap-0.5">
						<GitPullRequest size={14} />
						<span class="text-foreground font-medium">{githubStats.pullRequests}</span>
						<span>PRs</span>
					</div>
					<div class="flex flex-col items-center gap-0.5">
						<CircleDot size={14} />
						<span class="text-foreground font-medium">{githubStats.issues}</span>
						<span>issues</span>
					</div>
					<div class="flex flex-col items-center gap-0.5">
						<GitCommitVertical size={14} />
						<span class="text-foreground font-medium">{githubStats.commits}</span>
						<span>commits</span>
					</div>
				</div>
			{/if}
			<div class="flex w-full flex-row gap-2">
				<a
					href={SCHEDULE_A_CALL_URL}
					target="_blank"
					class="{buttonVariants({
						variant: 'default',
						size: 'sm'
					})} flex flex-1 flex-row gap-2 text-white"
				>
					<Phone class="hidden md:block" size={16} />
					<span>Schedule a call</span>
				</a>
				<a
					href={SEND_EMAIL_URL}
					target="_blank"
					rel="noopener noreferrer"
					class="{buttonVariants({
						variant: 'outline',
						size: 'sm'
					})} flex flex-1 flex-row gap-2"
				>
					<Mail class="hidden md:block" size={16} />
					<span>Send email</span>
				</a>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
