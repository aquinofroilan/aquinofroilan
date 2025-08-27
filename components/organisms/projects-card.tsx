import React from "react";
import * as motion from "motion/react-client";
import { Badge, BentoGridItem } from "@/components/ui";
import Link from "next/link";
import { FolderCode } from "lucide-react";
import { SpringBoot } from "@/components/atoms/icons/springboot";
import { Java } from "@/components/atoms/icons/java";
import { PostgreSQL } from "@/components/atoms/icons/postgresql";
import { Python } from "@/components/atoms/icons/python";
import { Flask } from "@/components/atoms/icons/flask";

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
                    </div>
                }
                description={
                    <div className="flex flex-col gap-2">
                        <Link
                            href="https://github.com/aquinofroilan/synectix"
                            target="_blank"
                            rel="noreferrer"
                            className="flex gap-2 items-center p-5 rounded-md border transition duration-200"
                        >
                            <div className="flex flex-col gap-1">
                                <h1 className="text-sm md:text-base">
                                    Synectix ERP Backend Built on top of Spring Boot
                                </h1>
                                <p>Backend for an ERP system built with Spring Boot</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant="outline"
                                        className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        <Java />
                                        Java
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        <SpringBoot />
                                        Spring Boot
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        <PostgreSQL />
                                        PostgreSQL
                                    </Badge>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="https://github.com/aquinofroilan/ez-parking-system"
                            target="_blank"
                            rel="noreferrer"
                            className="flex gap-2 items-center p-5 rounded-md border transition duration-200"
                        >
                            <div className="flex flex-col gap-1">
                                <h1 className="text-sm md:text-base">EZ Parking System</h1>
                                <p>Backend for a parking management system built with Python Flask</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant="outline"
                                        className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        <Python />
                                        Python
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        <Flask />
                                        Flask
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        <PostgreSQL />
                                        PostgreSQL
                                    </Badge>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
            />
        </motion.div>
    );
}

export default ProjectsCard;
