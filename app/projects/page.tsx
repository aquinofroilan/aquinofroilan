import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Badge } from "@/components/ui";
import { ProjectsList } from "@/data/projects-list";
import React from "react";

export const metadata: Metadata = {
    title: process.env.PAGE_TITLE ? process.env.PAGE_TITLE + " | Projects" : "Froilan | Software Engineer | Projects",
    description: "A showcase of Froilan's projects and contributions.",
    keywords: ["Froilan's Projects", "Froilan's Showcase", "Froilan's Contributions"],
};

function Projects() {
    return (
        <main className="py-10 w-11/12 max-w-7xl gap-2 flex flex-col md:grid md:grid-cols-2">
            <Link
                href={"/"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>
            <div className="col-span-2 w-full flex flex-col gap-5">
                <h1 className="text-2xl text-center font-bold">Projects</h1>
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {ProjectsList.map((project, index) => {
                        return (
                            <motion.div
                                key={project.pageLink}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                    delay: index * 0.1,
                                }}
                                className="w-full h-full"
                            >
                                <div
                                    key={project.projectLink}
                                    className="flex gap-2 items-center p-5 rounded-md border transition duration-200"
                                >
                                    <div className="flex flex-col gap-1">
                                        <section className="flex justify-between w-full items-center">
                                            <Link
                                                href={project.projectLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-base font-semibold hover:underline underline-offset-2"
                                            >
                                                {project.title}
                                            </Link>
                                            <Link
                                                className="text-base font-semibold hover:underline underline-offset-2"
                                                href={project.pageLink}
                                            >
                                                View
                                            </Link>
                                        </section>
                                        <p className="text-sm">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.footerContent.map((footer) => (
                                                <Badge
                                                    key={footer.text}
                                                    variant="outline"
                                                    className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                                >
                                                    {footer.icon}
                                                    {footer.text}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default Projects;
