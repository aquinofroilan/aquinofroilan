<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Froilan | AI Developer at Salesperson Inc.</title>
	<meta
		name="description"
		content="Froilan Aquino's Portfolio - AI Developer at Salesperson Inc."
	/>
	<meta
		name="keywords"
		content="Froilan Aquino, AI Developer, Salesperson Inc., Makati City Metro Manila"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="system" />
{@render children()}
