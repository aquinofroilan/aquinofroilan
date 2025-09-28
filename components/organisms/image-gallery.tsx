"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui";

const ImageGallery = ({ images }: { images: Array<{ key: string | undefined; url: string }> }) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

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
                <Dialog key={image.key}>
                    <DialogTrigger asChild>
                        <div className="relative w-full h-[300px] cursor-pointer hover:opacity-80 transition duration-200">
                            <Image
                                src={image.url}
                                alt={image.key as string}
                                fill
                                className="object-cover rounded-md"
                                priority={index < 2}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                onLoad={() => handleImageLoad(image.url)}
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-11/12 max-w-7xl">
                        <DialogTitle className="text-center mb-2">
                            {(image.key as string)
                                .replaceAll("-", " ")
                                .toUpperCase()
                                .slice(0, (image.key as string).indexOf("."))}
                        </DialogTitle>
                        <DialogDescription className="flex justify-center text-sm text-muted-foreground">
                            Snapshot {index + 1} of {images.length}
                        </DialogDescription>
                        <div className="relative w-full max-h-[70vh] aspect-video">
                            <Image
                                src={image.url}
                                alt={image.key as string}
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
