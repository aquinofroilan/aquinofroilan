import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from "@/data/techstack-list";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"} | ${process.env.CURRENT_COMPANY || ""} | ${process.env.CURRENT_WORK_LOCATION || "Philippines"} | TechStack`,
    description: `A showcase of Froilan's technical skills and tools as a ${process.env.CURRENT_TITLE || "Software Engineer"}.`,
    keywords: ["Froilan's TechStack", "Froilan's Skills", "Froilan's Tools"],
};

function TechStack() {
    return (
        <main className="py-10 w-11/12 max-w-7xl gap-2 flex flex-col">
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
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg">Frontend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {FRONTEND.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
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
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg">Backend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {BACKEND.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
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
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg">DevOps & Cloud</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {DEVOPS.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
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
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg">Developer Tools</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 h-full">
                                    {DEVELOPER_TOOLS.map((item) => (
                                        <Badge key={item} variant={"outline"}>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

export default TechStack;
