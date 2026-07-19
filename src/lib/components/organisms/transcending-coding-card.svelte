<script lang="ts">
	import { Rocket } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
	<Card.Root class="h-full w-full">
		<Card.Header>
			<Card.Title class="flex items-center gap-2">
				<Rocket size={15} />
				<span class="text-lg">Beyond Coding</span>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-5">
				<p class="text-justify text-sm">
					Beyond the IDE, I see myself as a problem solver and a lifelong learner. I
					believe that true engineering excellence requires not just technical skill, but
					a holistic mindset that embraces constant evolution.
				</p>
				<p class="text-justify text-sm">
					To deepen my craft, I turn to foundational literature. I study books such as
					<i>C Programming: A Modern Approach</i>, <i>Design Patterns</i>,
					<i>Java: The Complete Reference</i>, <i>Kotlin in Action</i>, and
					<i>The Rust Programming Language</i> to build a strong foundation in software engineering,
					language design, and systems programming.
				</p>
				<p class="text-justify text-sm">
					My interests extend beyond software engineering. I enjoy reading about personal
					development and investing through books like <i>Atomic Habits</i>,
					<i>Surrounded by Idiots</i>, <i>The Psychology of Money</i>, and
					<i>The Intelligent Investor</i>, which continue to shape how I think, learn, and
					make decisions.
				</p>
			</div>
		</Card.Content>
	</Card.Root>
</div>
