import React from "react";
import { FetchWakaTimeStats } from "@/actions/wakatime";
import { Card, CardHeader, CardContent, CardTitle, Progress } from "@/components/ui";
import { Clock, Code, Laptop, Monitor, ChartColumnIcon } from "lucide-react";
import { Github } from "@/components/atoms";
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
            minutes: number;
            percent: number;
            total_seconds: number;
        }>;
    };
};

export const WakatimeStatsCard = async ({ className }: { className?: string }) => {
    const wakatimeStats: WakatimeStatsTypes | null = await FetchWakaTimeStats();
    const github_stats = await getGithubStats();

    const wakatimeLanguages = wakatimeStats?.data.languages;
    const wakatimeDailyAverage = wakatimeStats?.data.human_readable_daily_average;
    const wakatimeTotal = wakatimeStats?.data.human_readable_total;
    const wakatimeOperatingSystems = wakatimeStats?.data.operating_systems;
    const wakatimeEditors = wakatimeStats?.data.editors;

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ChartColumnIcon size={15} />
                    <span className="text-lg">Wakatime Stats</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    <div className="my-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Code size={15} />
                            <h1 className="text-lg font-semibold">Programming Languages</h1>
                        </div>
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
                    </div>
                    <div className="my-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock size={15} />
                            <h1 className="text-lg font-semibold">Daily Activity</h1>
                        </div>
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
                    </div>
                    <div className="my-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Monitor size={15} />
                            <h1 className="text-lg font-semibold">Editors</h1>
                        </div>
                        <div className="space-y-2">
                            {wakatimeEditors?.map((editor, index) => (
                                <div key={index} className="flex justify-between items-center text-xs">
                                    <span>{editor.name}</span>
                                    <span>{editor.percent.toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Laptop size={15} />
                            <h1 className="text-lg font-semibold">Operating Systems</h1>
                        </div>
                        <div className="space-y-2">
                            {wakatimeOperatingSystems?.map((os, index) => (
                                <div key={index} className="flex justify-between items-center text-xs">
                                    <span>{os.name}</span>
                                    <span>{os.percent.toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Github className="w-4 h-4" />
                            <h1 className="text-lg font-semibold">GitHub Activity</h1>
                        </div>
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
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
