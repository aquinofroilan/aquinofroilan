<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";

    let { images = [] } = $props<{ images: Array<{ key: string | undefined; url: string }> }>();

    let loadedImages = $state<Set<string>>(new Set());

    const formatImageTitle = (key?: string) => {
        const base = key?.split(".", 1)[0] ?? "image";
        return base.replaceAll("-", " ").toUpperCase();
    };

    const handleImageLoad = (url: string) => {
        const newSet = new Set(loadedImages);
        newSet.add(url);
        loadedImages = newSet;
    };
</script>

<div class="flex flex-col items-center lg:grid grid-cols-2 gap-4">
    {#each images as image, index}
        <Dialog.Root>
            <Dialog.Trigger class="w-full">
                <div class="relative w-full h-[300px] cursor-pointer hover:opacity-80 transition duration-200">
                    <img
                        src={image.url}
                        alt={image.key ?? "Image"}
                        class="object-cover rounded-md w-full h-full"
                        loading={index < 2 ? "eager" : "lazy"}
                        onload={() => handleImageLoad(image.url)}
                    />
                </div>
            </Dialog.Trigger>
            <Dialog.Content class="w-11/12 max-w-7xl">
                <Dialog.Title class="text-center mb-2">{formatImageTitle(image.key)}</Dialog.Title>
                <Dialog.Description class="flex justify-center text-sm text-muted-foreground">
                    Snapshot {index + 1} of {images.length}
                </Dialog.Description>
                <div class="relative w-full max-h-[70vh] flex justify-center aspect-video">
                    <img
                        src={image.url}
                        alt={image.key ?? "Image"}
                        class="object-contain max-h-full max-w-full"
                        loading={loadedImages.has(image.url) ? "eager" : "lazy"}
                    />
                </div>
            </Dialog.Content>
        </Dialog.Root>
    {/each}
</div>
