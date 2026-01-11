import { fetchImagesWithPrefix } from "@/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import ImageGallery from "@/components/organisms/image-gallery";
import { Java, PostgreSQL, Angular, Github, TailwindCSS, TypeScript, SpringBoot } from "@/components/atoms";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"} | ${process.env.CURRENT_WORK_LOCATION || "Philippines"} | Synectix`,
    description: `Synectix - A comprehensive business management solution by Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"}. Built with Spring Boot, Angular, and PostgreSQL.`,
    keywords: ["Synectix", "Business Management", "Spring Boot", "Angular", "Froilan's Projects"],
};

const SynectixDetails = async () => {
    const project = ProjectsList.find((p) => p.slug === "synectix");

    if (!project) {
        redirect("/projects");
    }

    const { title, longDescription, imgPrefix, projectLink, techStackEntries } = project;
    const snapshotLinks = imgPrefix ? await fetchImagesWithPrefix(imgPrefix) : [];

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
                    <h1 className="text-2xl text-center font-bold">{title}</h1>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={projectLink[0] || "#"} target="_blank">
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
                        {longDescription}
                    </p>
                </section>
                <Separator className="my-4" />
                <section>
                    <h6 className="text-lg font-semibold">Snapshots</h6>
                    <ImageGallery images={snapshotLinks} />
                </section>
                <section className="flex justify-end items-center my-4">
                    <div className="flex flex-row gap-4">
                        {techStackEntries}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SynectixDetails;
