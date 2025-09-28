import React from "react";
import * as motion from "motion/react-client";
import { Badge, BentoGridItem } from "@/components/ui";
import Link from "next/link";
import { ArrowRightCircle, FolderCode } from "lucide-react";
import { ProjectsList } from "@/data/projects-list";

function ProjectsCard({ className }: { className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.4,
            }}
            className={className}
        >
            <BentoGridItem
                className="flex flex-col gap-3 h-full w-full"
                icon={<FolderCode size={15} />}
                title={
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-lg">Projects</h1>
                        <Link
                            href={"/projects"}
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </div>
                }
                description={
                    <div className="flex flex-col gap-2">
                        {ProjectsList.slice(0, 2).map((project) => (
                            <div
                                className="flex-col flex gap-2 items-start p-5 rounded-md border transition duration-200"
                                key={project.pageLink}
                            >
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
                                        href={project.pageLink}
                                        rel="noreferrer"
                                        className="text-sm hover:underline underline-offset-2"
                                    >
                                        Details
                                    </Link>
                                </section>
                                <p>{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.footerContent.map((footer) => (
                                        <Badge
                                            key={footer.text}
                                            variant="outline"
                                            className="w-fit text-xs flex flex-row gap-1 items-center font-semibold"
                                        >
                                            {footer.icon}
                                            {footer.text}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />
        </motion.div>
    );
}

export default ProjectsCard;
