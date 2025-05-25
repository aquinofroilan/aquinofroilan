import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from "@/data/techstack-array";
import { BentoGridItem, Badge } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";

function TechStack() {
    return (
        <main className="py-10 w-11/12 max-w-5xl gap-2 flex flex-col">
            <Link
                href={"/"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl text-center font-bold">TechStack</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: 0.1,
                        }}
                        className="w-full h-full"
                    >
                        <BentoGridItem
                            className="h-full"
                            title={<h1 className="text-lg">Frontend</h1>}
                            description={
                                <div className="flex flex-wrap gap-2">
                                    {FRONTEND.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            }
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                        className="w-full h-full"
                    >
                        <BentoGridItem
                            className="h-full"
                            title={<h1 className="text-lg">Backend</h1>}
                            description={
                                <div className="flex flex-wrap gap-2">
                                    {BACKEND.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            }
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: 0.3,
                        }}
                        className="w-full h-full"
                    >
                        <BentoGridItem
                            className="h-full"
                            title={<h1 className="text-lg">DevOps & Cloud</h1>}
                            description={
                                <div className="flex flex-wrap gap-2">
                                    {DEVOPS.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            }
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: 0.4,
                        }}
                        className="w-full h-full"
                    >
                        <BentoGridItem
                            className="h-full"
                            title={<h1 className="text-lg">Developer Tools</h1>}
                            description={
                                <div className="flex flex-wrap gap-2 h-full">
                                    {DEVELOPER_TOOLS.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            }
                        />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

export default TechStack;
