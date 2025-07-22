import React from "react";
import * as motion from "motion/react-client";
import { Badge, BentoGridItem } from "@/components/ui";
import Link from "next/link";
import { FolderCode } from "lucide-react";

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
                                    <Badge variant="outline" className="w-fit font-semibold text-xs">
                                        Java
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="w-fit font-semibold text-xs flex flex-row gap-1 items-center"
                                    >
                                        <svg
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M20.205 16.392c-2.469 3.289-7.741 2.179-11.122 2.338 0 0-.599.034-1.201.133 0 0 .228-.097.519-.198 2.374-.821 3.496-.986 4.939-1.727 2.71-1.388 5.408-4.413 5.957-7.555-1.032 3.022-4.17 5.623-7.027 6.679-1.955.722-5.492 1.424-5.493 1.424a5.28 5.28 0 0 1-.143-.076c-2.405-1.17-2.475-6.38 1.894-8.059 1.916-.736 3.747-.332 5.818-.825 2.208-.525 4.766-2.18 5.805-4.344 1.165 3.458 2.565 8.866.054 12.21zm.042-13.28a9.212 9.212 0 0 1-1.065 1.89 9.982 9.982 0 0 0-7.167-3.031C6.492 1.971 2 6.463 2 11.985a9.983 9.983 0 0 0 3.205 7.334l.22.194a.856.856 0 1 1 .001.001l.149.132A9.96 9.96 0 0 0 12.015 22c5.278 0 9.613-4.108 9.984-9.292.274-2.539-.476-5.763-1.752-9.596"></path>
                                            </g>
                                        </svg>
                                        Spring Boot
                                    </Badge>
                                    <Badge variant="outline" className="w-fit font-semibold text-xs">
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
