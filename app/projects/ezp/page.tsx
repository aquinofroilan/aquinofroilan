import { fetchImagesWithPrefix } from "@/actions";
import { Expo, Flask, Github, MapBox, PostgreSQL, Python, React, TypeScript } from "@/components/atoms";
import ImageGallery from "@/components/organisms/image-gallery";
import { Separator, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"} | ${process.env.CURRENT_WORK_LOCATION || "Philippines"} | EZ Parking System`,
    description: `EZ Parking System - A comprehensive parking management solution by Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"}. Built with Python Flask, React, and PostgreSQL.`,
    keywords: ["EZ Parking System", "Parking Management", "Python Flask", "React", "Froilan's Projects"],
};

const EZP = async () => {
    const snapshotLinks = await fetchImagesWithPrefix("ez-parking-");

    return (
        <main className="py-10 w-11/12 max-w-7xl gap-2 flex flex-col md:grid md:grid-cols-2">
            <Link
                href={"/projects"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back to Projects</h1>
            </Link>
            <div className="grid place-content-center col-span-2 w-full h-full">
                <section className="flex flex-row justify-between items-center gap-4 mb-5">
                    <h1 className="text-2xl text-center font-bold">EZ Parking System</h1>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="https://github.com/aquinofroilan/ez-parking-system"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="w-5 h-5 md:w-6 md:h-6" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-sm">View Source Code</p>
                        </TooltipContent>
                    </Tooltip>
                </section>
                <section>
                    <h6 className="text-lg font-semibold">Overview</h6>
                    <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                        EZ Parking System is a comprehensive parking management solution designed to streamline parking
                        operations. Built with Python Flask, it offers features such as real-time parking space
                        tracking, and automated ticketing, enhancing the overall efficiency and user experience for both
                        parking operators and customers.
                    </p>
                </section>
                <Separator className="my-4" />
                <section>
                    <h6 className="text-lg font-semibold">Snapshots</h6>
                    <ImageGallery images={snapshotLinks} />
                </section>
                <section className="flex justify-end items-center my-4">
                    <div className="flex flex-row gap-4">
                        <PostgreSQL className="w-6 h-6" />
                        <TypeScript className="w-6 h-6" />
                        <React className="w-6 h-6" />
                        <Expo className="w-6 h-6" />
                        <Python className="w-6 h-6" />
                        <Flask className="w-6 h-6" />
                        <MapBox className="w-6 h-6" />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default EZP;
