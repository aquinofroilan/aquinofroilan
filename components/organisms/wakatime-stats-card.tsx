import React from "react";
import { FetchWakaTimeStats } from "@/actions/wakatime";
import { BentoGridItem, Progress } from "@/components/ui";
import { Clock, Code, Laptop, Monitor, ChartColumnIcon } from "lucide-react";
import { Github } from "@/components/atoms";
import * as motion from "motion/react-client";
import { getGithubStats } from "@/actions";

type WakatimeStatsTypes = {
    data: {
        editors: Array<{
            name: string;
            text: string;
            percent: number;
        }>;
        languages: Array<{
            name: string;
            text: string;
            percent: number;
        }>;
        human_readable_daily_average: string;
        human_readable_total: number;
        operating_systems: Array<{
            name: string;
            text: string;
            hours: number;
            percent: number;
        }>;
    };
};

type GitHubStats = { pullRequests: number; issues: number; commitsPastYear: number; stars: number };
export const WakatimeStatsCard = async ({ className }: { className?: string }) => {
    const github_stats: GitHubStats = await getGithubStats();
    const wakatimeStats: WakatimeStatsTypes = await FetchWakaTimeStats();
    const wakatimeLanguages = wakatimeStats?.data.languages;
    const wakatimeDailyAverage = wakatimeStats?.data.human_readable_daily_average;
    const wakatimeTotal = wakatimeStats?.data.human_readable_total;
    const wakatimeOperatingSystems = wakatimeStats?.data.operating_systems;
    const wakatimeEditors = wakatimeStats?.data.editors;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.6,
            }}
            className={className}
        >
            <BentoGridItem
                className="flex flex-col gap-3 w-full h-full hover:shadow-md"
                icon={<ChartColumnIcon size={15} />}
                title={"Wakatime Stats"}
                description={
                    <>
                        <BentoGridItem
                            className="my-5 hover:shadow-none"
                            icon={<Code size={15} />}
                            title={<h1 className="text-lg">Programming Languages</h1>}
                            description={
                                <div className="space-y-3">
                                    {wakatimeLanguages?.slice(0, 6).map((lang, index) => (
                                        <div key={index} className="flex flex-col">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>{lang.name}</span>
                                                <span>{lang.percent.toFixed(1)}%</span>
                                            </div>
                                            <Progress value={lang.percent} />
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                        <BentoGridItem
                            className="my-5 hover:shadow-none"
                            icon={<Clock size={15} />}
                            title={<h1 className="text-lg">Daily Activity</h1>}
                            description={
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="border border-border rounded-md p-2">
                                        <p className="text-xs text-muted-foreground">Daily Average</p>
                                        <p className="font-medium">{wakatimeDailyAverage}</p>
                                    </div>
                                    <div className="border border-border rounded-md p-2">
                                        <p className="text-xs text-muted-foreground">Total</p>
                                        <p className="font-medium">{wakatimeTotal}</p>
                                    </div>
                                </div>
                            }
                        />
                        <BentoGridItem
                            className="my-5 hover:shadow-none"
                            icon={<Monitor size={15} />}
                            title={<h1 className="text-lg">Editors</h1>}
                            description={
                                <div className="space-y-2">
                                    {wakatimeEditors?.map((editor, index) => (
                                        <div key={index} className="flex justify-between items-center text-xs">
                                            <span>{editor.name}</span>
                                            <span>{editor.percent.toFixed(1)}%</span>
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                        <BentoGridItem
                            className="my-5 hover:shadow-none"
                            icon={<Laptop size={15} />}
                            title={<h1 className="text-lg">Operating Systems</h1>}
                            description={
                                <div className="space-y-2">
                                    {wakatimeOperatingSystems?.map((os, index) => (
                                        <div key={index} className="flex justify-between items-center text-xs">
                                            <span>{os.name}</span>
                                            <span>{os.percent.toFixed(1)}%</span>
                                        </div>
                                    ))}
                                </div>
                            }
                        />

                        <BentoGridItem
                            className="my-5 md:col-span-2 hover:shadow-none"
                            icon={<Github className="w-4 h-4" />}
                            title={<h1 className="text-lg">GitHub Activity</h1>}
                            description={
                                <div className="flex flex-col lg:flex-row gap-2">
                                    <div className="border border-border rounded-md p-2">
                                        <p className="text-xs text-muted-foreground">Stars</p>
                                        <p className="font-medium">{github_stats.stars}</p>
                                    </div>
                                    <div className="border border-border rounded-md p-2">
                                        <p className="text-xs text-muted-foreground">Commits Past Year</p>
                                        <p className="font-medium">{github_stats.commitsPastYear}</p>
                                    </div>
                                    <div className="border border-border rounded-md p-2">
                                        <p className="text-xs text-muted-foreground">Pull Requests</p>
                                        <p className="font-medium">{github_stats.pullRequests}</p>
                                    </div>
                                    <div className="border border-border rounded-md p-2">
                                        <p className="text-xs text-muted-foreground">Issues</p>
                                        <p className="font-medium">{github_stats.issues}</p>
                                    </div>
                                </div>
                            }
                        />
                    </>
                }
            />
        </motion.div>
    );
};
