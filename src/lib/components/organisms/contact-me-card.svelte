<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { ArrowRight, Send } from 'lucide-svelte';
	import {
		CredlyIcon,
		HackerRank,
		LeetCode,
		Github,
		Instagram,
		LinkedIn
	} from '$lib/components/atoms';

	let { class: className = '', RESUME_CV_LINK = '' } = $props<{
		class?: string;
		RESUME_CV_LINK?: string;
	}>();
</script>

<div class={className}>
	<Card.Root class="flex h-full w-full flex-col gap-3">
		<Card.Header>
			<Card.Title class="flex w-full items-center gap-2">
				<Send size={15} />
				<span class="text-lg">Contact Me</span>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-5">
				<div>
					<span class="text-xs">Email:</span>
					<div class="flex flex-col">
						<a
							class="underline underline-offset-1"
							href="mailto:aquino.froilan.dev@outlook.com?subject=Contact%20from%20Website"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span class="text-xs">aquino.froilan.dev@outlook.com</span>
						</a>
					</div>
				</div>
				<div>
					<span class="text-xs">Social Links:</span>
					<div class="mt-1.5 flex flex-wrap gap-2.5">
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger
									class="hover:bg-muted flex w-fit items-center justify-center rounded-none p-2 transition-colors"
								>
									<a
										aria-label="Github link"
										target="_blank"
										href="https://github.com/aquinofroilan"
										class="flex h-full w-full items-center justify-center"
									>
										<Github class="h-5 w-5" />
									</a>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<span class="text-xs">GitHub</span>
								</Tooltip.Content>
							</Tooltip.Root>
							<Tooltip.Root>
								<Tooltip.Trigger
									class="hover:bg-muted flex w-fit items-center justify-center rounded-none p-2 transition-colors"
								>
									<a
										aria-label="Instagram link"
										target="_blank"
										href="https://www.instagram.com/aquinofroilan_"
										class="flex h-full w-full items-center justify-center"
									>
										<Instagram class="h-5 w-5" />
									</a>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<span class="text-xs">Instagram</span>
								</Tooltip.Content>
							</Tooltip.Root>
							<Tooltip.Root>
								<Tooltip.Trigger
									class="hover:bg-muted flex w-fit items-center justify-center rounded-none p-2 transition-colors"
								>
									<a
										aria-label="LinkedIn link"
										target="_blank"
										href="https://linkedin.com/in/aquinofroilan"
										class="flex h-full w-full items-center justify-center"
									>
										<LinkedIn
											class="h-6 w-6 transition duration-200 hover:scale-105"
										/>
									</a>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<span class="text-xs">LinkedIn</span>
								</Tooltip.Content>
							</Tooltip.Root>
							<Tooltip.Root>
								<Tooltip.Trigger
									class="hover:bg-muted flex w-fit items-center justify-center rounded-none p-2 transition-colors"
								>
									<a
										aria-label="Credly link"
										target="_blank"
										href="https://www.credly.com/users/froilan"
										class="flex h-full w-full items-center justify-center"
									>
										<CredlyIcon class="h-5 w-5" />
									</a>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<span class="text-xs">Credly</span>
								</Tooltip.Content>
							</Tooltip.Root>
							<Tooltip.Root>
								<Tooltip.Trigger
									class="hover:bg-muted flex w-fit items-center justify-center rounded-none p-2 transition-colors"
								>
									<a
										aria-label="HackerRank link"
										target="_blank"
										href="https://www.hackerrank.com/profile/froilanaquino"
										class="flex h-full w-full items-center justify-center"
									>
										<HackerRank class="h-5 w-5" />
									</a>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<span class="text-xs">HackerRank</span>
								</Tooltip.Content>
							</Tooltip.Root>
							<Tooltip.Root>
								<Tooltip.Trigger
									class="hover:bg-muted flex w-fit items-center justify-center rounded-none p-2 transition-colors"
								>
									<a
										aria-label="LeetCode link"
										target="_blank"
										href="https://leetcode.com/u/froilan_/"
										class="flex h-full w-full items-center justify-center"
									>
										<LeetCode class="h-5 w-5" />
									</a>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<span class="text-xs">LeetCode</span>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div>
				</div>
				<div>
					<span class="text-xs">Let's talk:</span>
					<a
						href="https://calendly.com/froilan/consultation"
						class="group hover:bg-muted mt-2 flex w-full items-center justify-between rounded-none px-2 py-2 transition-colors"
						aria-label="Schedule a consultation call via Calendly"
					>
						<span class="text-xs">Schedule a call</span>
						<ArrowRight
							size={15}
							class="transition-transform group-hover:translate-x-1"
						/>
					</a>
				</div>
				{#if RESUME_CV_LINK}
					<div>
						<span class="text-xs">My Resume/CV:</span>
						<a
							href={RESUME_CV_LINK}
							class="group hover:bg-muted mt-2 flex w-full items-center justify-between rounded-none px-2 py-2 transition-colors"
							aria-label="View resume or CV document"
						>
							<span class="text-xs">View my CV</span>
							<ArrowRight
								size={15}
								class="transition-transform group-hover:translate-x-1"
							/>
						</a>
					</div>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>
</div>
