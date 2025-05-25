import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from "@/data/techstack-array";
import { BentoGridItem, Badge } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
                    <BentoGridItem
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
                    <BentoGridItem
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
                    <BentoGridItem
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
                    <BentoGridItem
                        title={<h1 className="text-lg">Developer Tools</h1>}
                        description={
                            <div className="flex flex-wrap gap-2">
                                {DEVELOPER_TOOLS.map((item) => (
                                    <Badge key={item} variant={"outline"}>
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        }
                    />
                </div>
            </div>
        </main>
    );
}

export default TechStack;
