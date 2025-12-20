import React from "react";
import { Badge, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import Link from "next/link";
import { ArrowRightCircle, FolderCode } from "lucide-react";
import { ProjectsList } from "@/data/projects-list";

/**
 * Render a motion-enabled "Projects" card that displays a header with a "View All" link and up to two project entries.
 *
 * Each project entry shows a title (opens in a new tab), a "Details" link, a short description, and a row of footer badges.
 *
 * @param className - Optional CSS classes applied to the root motion container
 * @returns A React element representing the Projects card with animated entrance/exit, header controls, and project entries
 */
function ProjectsCard({ className }: { className?: string }) {
    return (
        <div className={className}>
            <Card className="flex flex-col gap-3 h-full w-full">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <FolderCode size={15} />
                            <span className="text-lg">Projects</span>
                        </div>
                        <Link
                            href={"/projects"}
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    );
}

export default ProjectsCard;
