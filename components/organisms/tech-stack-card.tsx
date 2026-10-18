import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from "@/data/techstack-list";
import { ArrowRightCircle, FlaskConical } from "lucide-react";
import Link from "next/link";

export const TechStackCard = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Card className="flex flex-col gap-3 h-full w-full">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <FlaskConical size={15} />
                            <span className="text-lg">Tech Stack</span>
                        </div>
                        <Link
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                            href={"/techstack"}
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-5">
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
                </CardContent>
            </Card>
        </div>
    );
};
