<script lang="ts">
	import Masonry from '$lib/components/ui/masonry.svelte';
	import FadeIn from '$lib/components/ui/fade-in.svelte';
	import ProfileCard from '$lib/components/organisms/profile-card.svelte';
	import AboutCard from '$lib/components/organisms/about-me-card.svelte';
	import CertificationCard from '$lib/components/organisms/certification-card.svelte';
	import TechStackCard from '$lib/components/organisms/tech-stack-card.svelte';
	import ProjectsCard from '$lib/components/organisms/projects-card.svelte';
	import TranscendingCodeCard from '$lib/components/organisms/transcending-coding-card.svelte';
	import CompetenciesCard from '$lib/components/organisms/competencies-card.svelte';
	import ContactMe from '$lib/components/organisms/contact-me-card.svelte';

	let { data } = $props();
</script>

<main class="mx-auto flex w-11/12 max-w-7xl flex-col items-center py-10">
	<Masonry gap={16} class="w-full">
		<FadeIn delay={0.1} class="h-auto overflow-visible">
			<ProfileCard
				class="h-full"
				githubStats={data.githubStats}
				CURRENT_TITLE={data.env.CURRENT_TITLE}
				CURRENT_COMPANY={data.env.CURRENT_COMPANY}
				CURRENT_WORK_LOCATION={data.env.CURRENT_WORK_LOCATION}
				SCHEDULE_A_CALL_URL={data.env.SCHEDULE_A_CALL_URL}
				SEND_EMAIL_URL={data.env.SEND_EMAIL_URL}
			/>
		</FadeIn>
		<FadeIn delay={0.15} class="h-auto overflow-visible">
			<AboutCard class="h-full" />
		</FadeIn>
		<FadeIn delay={0.2} class="h-auto overflow-visible">
			<CertificationCard class="h-full" credlyCerts={data.credlyCerts} />
		</FadeIn>
		<FadeIn delay={0.25} class="h-auto overflow-visible">
			<TechStackCard class="h-full" />
		</FadeIn>
		<FadeIn delay={0.3} class="h-auto overflow-visible">
			<ProjectsCard class="h-full" />
		</FadeIn>
		<FadeIn delay={0.35} class="h-auto overflow-visible">
			<TranscendingCodeCard class="h-full" />
		</FadeIn>
		<FadeIn delay={0.65} class="h-auto overflow-visible">
			<CompetenciesCard class="h-full" />
		</FadeIn>
		<FadeIn delay={0.7} class="h-auto overflow-visible">
			<ContactMe class="h-full" RESUME_CV_LINK={data.env.RESUME_CV_LINK} />
		</FadeIn>
	</Masonry>
</main>
