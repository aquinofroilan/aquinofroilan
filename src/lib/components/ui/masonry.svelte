<script lang="ts">
	let { children, gap = 16, class: className = '' } = $props();
</script>

<div class="w-full columns-1 md:columns-2 lg:columns-3 {className}" style="column-gap: {gap}px;">
	{@render children()}
</div>
