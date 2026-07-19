<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="system" />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
