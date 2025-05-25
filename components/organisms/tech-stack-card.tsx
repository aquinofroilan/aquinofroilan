import { BentoGridItem, Badge } from "@/components/ui";
import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from "@/data/techstack-array";
import { ArrowRightCircle, FlaskConical } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";

export const TechStackCard = ({ className }: { className?: string }) => {
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
                icon={<FlaskConical size={15} />}
                title={
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-lg">Tech Stack</h1>
                        <Link
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                            href={"/techstack"}
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </div>
                }
                description={
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1>Frontend</h1>
                            <div className="flex flex-wrap gap-2">
                                {FRONTEND.slice(0, 6).map((item) => (
                                    <Badge key={item} variant={"outline"} className="w-fit font-semibold text-xs">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1>Backend</h1>
                            <div className="flex flex-wrap gap-2">
                                {BACKEND.slice(0, 6).map((item) => (
                                    <Badge key={item} variant={"outline"} className="w-fit font-semibold text-xs">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1>DevOps & Cloud</h1>
                            <div className="flex flex-wrap gap-2">
                                {DEVOPS.slice(0, 6).map((item) => (
                                    <Badge key={item} variant={"outline"} className="w-fit font-semibold text-xs">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1>Developer Tools</h1>
                            <div className="flex flex-wrap gap-2">
                                {DEVELOPER_TOOLS.slice(0, 6).map((item) => (
                                    <Badge key={item} variant={"outline"} className="w-fit font-semibold text-xs">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />
        </motion.div>
    );
};
