import React from "react";
import * as motion from "motion/react-client";
import {Badge, BentoGridItem} from "@/components/ui";
import Link from "next/link";
import {ArrowRightCircle, FolderCode} from "lucide-react";
import {ProjectsList} from "@/data/projects-list";

function ProjectsCard({className}: { className?: string }) {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.4,
            }}
            className={className}
        >
            <BentoGridItem
                className="flex flex-col gap-3 h-full w-full"
                icon={<FolderCode size={15}/>}
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
                        {
                            ProjectsList.slice(0, 2).map((project) => (
                                <Link
                                    href={project.link}
                                    key={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex gap-2 items-center p-5 rounded-md border transition duration-200"
                                >
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-sm md:text-base">
                                            {project.title}
                                        </h1>
                                        <p>{project.description}</p>
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
                                </Link>
                            ))
                        }
                    </div>
                }
            />
        </motion.div>
    );
}

export default ProjectsCard;
