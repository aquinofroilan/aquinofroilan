<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	let { children, delay = 0, class: className = '' } = $props();
</script>

<div
	class="mb-4 break-inside-avoid {className}"
	in:fly={{ y: 20, duration: 500, delay: delay * 1000, easing: expoOut }}
>
	{@render children()}
</div>
