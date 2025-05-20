import { BentoGridItem, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowRightCircle, FlaskConical } from "lucide-react";
import Link from "next/link";

const FRONTEND = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Svelte",
    "Prettier",
    "ESLint",
    "Styled Components",
    "Webpack",
];
const BACKEND = ["Node.js", "Python", "Flask", "Django", "REST API", "MySQL", "PostgreSQL", "MongoDB", "Redis", "JWT"];
const DEVOPS = [
    "Docker",
    "Kubernetes",
    "AWS",
    "Google Cloud Platform",
    "Firebase",
    "Vercel",
    "GitHub Actions",
    "CI/CD",
];
const DEVELOPER_TOOLS = [
    "Git",
    "GitHub",
    "Postman",
    "Figma",
    "Visual Studio Code",
    "Trello",
    "Jira",
    "PyCharm",
    "IntelliJ IDEA",
    "Android Studio",
    "Sublimetext",
    "Notion",
    "Discord",
    "Teams",
];
const TechStackCard = ({ className }: { className?: string }) => {
    return (
        <BentoGridItem
            className={cn("flex flex-col gap-3", className)}
            icon={<FlaskConical size={15} />}
            title={
                <div className="flex justify-between items-center w-full">
                    <h1>Tech Stack</h1>
                    <Link
                        className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                        href={"/tech-stack"}
                        target="_blank"
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
                        <h1>Devlops & Cloud</h1>
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
    );
};

export default TechStackCard;
