import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: process.env.PAGE_TITLE ? process.env.PAGE_TITLE + " | Projects" : "Froilan | Software Engineer | Projects",
    description: "A showcase of Froilan's projects and contributions.",
    keywords: ["Froilan's Projects", "Froilan's Showcase", "Froilan's Contributions"],
};

function Projects() {
    return (
        <main className="py-10 w-11/12 max-w-5xl gap-2 flex flex-col md:grid md:grid-cols-2">
            <Link
                href={"/"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>
            <div className="grid place-content-center col-span-2 w-full h-full">
                <h1 className="text-2xl text-center font-bold">Projects</h1>
                <p className="text-center text-neutral-500 dark:text-neutral-400">
                    This page is currently under construction. I am working on creating a projects section where I can
                    showcase my work, contributions, and any other projects I have been involved in. Stay tuned for
                    updates. In the meantime, feel free to check out my other pages.
                </p>
            </div>
        </main>
    );
}

export default Projects;
