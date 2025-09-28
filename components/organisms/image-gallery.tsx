"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui";

const ImageGallery = ({ images }: { images: Array<{ key: string | undefined; url: string }> }) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const formatImageTitle = (key?: string) => {
        const base = key?.split(".", 1)[0] ?? "image";
        return base.replaceAll("-", " ").toUpperCase();
    };

    const handleImageLoad = (url: string) => {
        setLoadedImages((prev) => {
            const newSet = new Set(prev);
            newSet.add(url);
            return newSet;
        });
    };

    return (
        <div className="flex flex-col items-center lg:grid grid-cols-2 gap-4">
            {images.map((image, index) => (
                <Dialog key={image.key ?? image.url}>
                    <DialogTrigger asChild>
                        <div className="relative w-full h-[300px] cursor-pointer hover:opacity-80 transition duration-200">
                            <Image
                                src={image.url}
                                alt={image.key ?? "Image"}
                                fill
                                className="object-cover rounded-md"
                                priority={index < 2}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                onLoad={() => handleImageLoad(image.url)}
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-11/12 max-w-7xl">
                        <DialogTitle className="text-center mb-2">{formatImageTitle(image.key)}</DialogTitle>
                        <DialogDescription className="flex justify-center text-sm text-muted-foreground">
                            Snapshot {index + 1} of {images.length}
                        </DialogDescription>
                        <div className="relative w-full max-h-[70vh] aspect-video">
                            <Image
                                src={image.url}
                                alt={image.key ?? "Image"}
                                fill
                                quality={95}
                                className="object-contain"
                                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 70vw"
                                priority={loadedImages.has(image.url)}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
};

export default ImageGallery;
