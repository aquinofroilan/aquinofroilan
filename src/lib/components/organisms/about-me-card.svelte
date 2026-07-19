<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ContactRound } from 'lucide-svelte';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
	<Card.Root class="h-full w-full">
		<Card.Header>
			<Card.Title class="flex items-center gap-2">
				<ContactRound size={15} />
				<span class="text-lg">About Me</span>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex w-full flex-col gap-3">
				<p class="text-justify text-sm">
					I am an <b>AI Developer</b> at <b>Salesperson Inc.</b> with 1 year of professional
					experience building scalable AI-powered applications. My work focuses on maintaining
					and improving AI Search solutions by developing new features, refactoring the codebase
					for long-term maintainability, resolving bugs, responding to security vulnerabilities
					(CVEs), reducing technical debt, and supporting the AI Search infrastructure. I also
					collaborate with stakeholders to plan features, analyze data, and translate business
					requirements into practical technical solutions. While my primary expertise is in
					the JavaScript/TypeScript ecosystem (React and Next.js), I also develop backend services
					using Java/Kotlin (Spring Framework) and Python (Flask/FastAPI), working with databases
					such as PostgreSQL and Supabase.
				</p>
				<p class="text-justify text-sm">
					I hold a <b>Bachelor's degree in Information Technology (2025)</b>. I believe
					continuous learning is part of the job. I use AI to speed up research and
					experimentation, but I rely on engineering fundamentals and careful reasoning to
					build simple, maintainable software.
				</p>
				<p class="text-justify text-sm">
					I believe the best software is often the least noticeable. My goal is to build
					applications that are simple, dependable, and let users focus on their work
					instead of the software itself.
				</p>
				<p class="text-justify text-sm">
					Currently, I am expanding my technical horizons by diving into system-level
					programming with
					<b> C</b> and <b>Go</b>. This pursuit aims to deepen my understanding of
					low-level operations, memory management, and advanced Data Structures and
					Algorithms, enabling me to write more efficient and optimized code.
				</p>
			</div>
		</Card.Content>
	</Card.Root>
</div>
