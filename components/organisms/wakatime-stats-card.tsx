import React from "react";
import { FetchWakaTimeStats } from "@/actions/wakatime";
import { BentoGridItem, Progress } from "@/components/ui";
import { Clock, Code, Github, Laptop, Monitor, ChartColumnIcon, CircleArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
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
        categories: Array<{
            name: string;
            text: string;
            hours: number;
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

type GitHubStats = {
    total_stars_earned: number;
    total_commits_2025: number;
    total_prs: number;
    total_issues: number;
    contributed_to_last_year: number;
};
export const WakatimeStatsCard = async ({ className }: { className?: string }) => {
    const github_stats: GitHubStats = {
        total_stars_earned: 5,
        total_commits_2025: 512,
        total_prs: 119,
        total_issues: 47,
        contributed_to_last_year: 3,
    };
    const wakatimeStats: WakatimeStatsTypes = await FetchWakaTimeStats();
    const wakatimeLanguages = wakatimeStats?.data.languages;
    const wakatimeCategories = wakatimeStats?.data.categories;
    const wakatimeDailyAverage = wakatimeStats?.data.human_readable_daily_average;
    const wakatimeTotal = wakatimeStats?.data.human_readable_total;
    const wakatimeOperatingSystems = wakatimeStats?.data.operating_systems;
    const wakatimeEditors = wakatimeStats?.data.editors;
    return (
        <BentoGridItem
            className={cn("flex flex-col gap-3", className)}
            icon={<ChartColumnIcon size={15} />}
            title={"Wakatime Stats"}
            description={
                <>
                    <BentoGridItem
                        className="my-5"
                        icon={<CircleArrowUp size={15} />}
                        title={<h1 className="text-lg">Programming Activity</h1>}
                        description={
                            <div className="space-y-3">
                                {wakatimeCategories?.slice(0, 6).map((category, index) => (
                                    <div key={index} className="flex flex-col">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>{category.name}</span>
                                            <span>{category.percent.toFixed(1)}%</span>
                                        </div>
                                        <Progress value={category.percent} />
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    <BentoGridItem
                        className="my-5"
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
                        className="my-5"
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
                        className="my-5"
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
                        className="my-5"
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
                        className="my-5 md:col-span-2"
                        icon={<Github size={15} />}
                        title={<h1 className="text-lg">GitHub Activity</h1>}
                        description={
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                <div className="border border-border rounded-md p-2">
                                    <p className="text-xs text-muted-foreground">Stars</p>
                                    <p className="font-medium">{github_stats.total_stars_earned}</p>
                                </div>
                                <div className="border border-border rounded-md p-2">
                                    <p className="text-xs text-muted-foreground">Commits (2025)</p>
                                    <p className="font-medium">{github_stats.total_commits_2025}</p>
                                </div>
                                <div className="border border-border rounded-md p-2">
                                    <p className="text-xs text-muted-foreground">Pull Requests</p>
                                    <p className="font-medium">{github_stats.total_prs}</p>
                                </div>
                                <div className="border border-border rounded-md p-2">
                                    <p className="text-xs text-muted-foreground">Issues</p>
                                    <p className="font-medium">{github_stats.total_issues}</p>
                                </div>
                                <div className="border border-border rounded-md p-2">
                                    <p className="text-xs text-muted-foreground">Contributed To</p>
                                    <p className="font-medium">{github_stats.contributed_to_last_year}</p>
                                </div>
                            </div>
                        }
                    />
                </>
            }
        />
    );
};
