<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import * as Dialog from '$lib/components/ui/dialog';

	let { images = [] } = $props<{ images: Array<{ key: string | undefined; url: string }> }>();

	const loadedImages = new SvelteSet<string>();

	const formatImageTitle = (key?: string) => {
		const base = key?.split('.', 1)[0] ?? 'image';
		return base.replaceAll('-', ' ').toUpperCase();
	};

	const handleImageLoad = (url: string) => {
		loadedImages.add(url);
	};
</script>

<div class="flex grid-cols-2 flex-col items-center gap-4 lg:grid">
	{#each images as image, index (image.url)}
		<Dialog.Root>
			<Dialog.Trigger class="w-full">
				<div
					class="relative h-[300px] w-full cursor-pointer transition duration-200 hover:opacity-80"
				>
					<img
						src={image.url}
						alt={image.key ?? 'Image'}
						class="h-full w-full rounded-none object-cover"
						loading={index < 2 ? 'eager' : 'lazy'}
						onload={() => handleImageLoad(image.url)}
					/>
				</div>
			</Dialog.Trigger>
			<Dialog.Content class="w-11/12 max-w-7xl">
				<Dialog.Title class="mb-2 text-center">{formatImageTitle(image.key)}</Dialog.Title>
				<Dialog.Description class="text-muted-foreground flex justify-center text-sm">
					Snapshot {index + 1} of {images.length}
				</Dialog.Description>
				<div class="relative flex aspect-video max-h-[70vh] w-full justify-center">
					<img
						src={image.url}
						alt={image.key ?? 'Image'}
						class="max-h-full max-w-full object-contain"
						loading={loadedImages.has(image.url) ? 'eager' : 'lazy'}
					/>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
</div>
