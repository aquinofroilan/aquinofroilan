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

export const WakatimeStatsLanguages = async ({ className }: { className?: string }) => {
    const wakatimeStats: WakatimeStatsTypes | null = await FetchWakaTimeStats();
    const wakatimeLanguages = wakatimeStats?.data.languages;

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Code size={15} />
                    <span className="text-lg">Languages</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
};

export const WakatimeStatsActivity = async ({ className }: { className?: string }) => {
    const wakatimeStats: WakatimeStatsTypes | null = await FetchWakaTimeStats();
    const wakatimeDailyAverage = wakatimeStats?.data.human_readable_daily_average;
    const wakatimeTotal = wakatimeStats?.data.human_readable_total;

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock size={15} />
                    <span className="text-lg">Daily Activity</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
};

export const WakatimeStatsEditors = async ({ className }: { className?: string }) => {
    const wakatimeStats: WakatimeStatsTypes | null = await FetchWakaTimeStats();
    const wakatimeEditors = wakatimeStats?.data.editors;

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Monitor size={15} />
                    <span className="text-lg">Editors</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {wakatimeEditors?.map((editor, index) => (
                        <div key={index} className="flex justify-between items-center text-xs">
                            <span>{editor.name}</span>
                            <span>{editor.percent.toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export const WakatimeStatsOS = async ({ className }: { className?: string }) => {
    const wakatimeStats: WakatimeStatsTypes | null = await FetchWakaTimeStats();
    const wakatimeOperatingSystems = wakatimeStats?.data.operating_systems;

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Laptop size={15} />
                    <span className="text-lg">Operating Systems</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {wakatimeOperatingSystems?.map((os, index) => (
                        <div key={index} className="flex justify-between items-center text-xs">
                            <span>{os.name}</span>
                            <span>{os.percent.toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export const GithubStatsCard = async ({ className }: { className?: string }) => {
    const github_stats = await getGithubStats();

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span className="text-lg">GitHub Activity</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-2">
                    <div className="border border-border rounded-md p-2 flex-1">
                        <p className="text-xs text-muted-foreground">Stars</p>
                        <p className="font-medium">{github_stats.stars}</p>
                    </div>
                    <div className="border border-border rounded-md p-2 flex-1">
                        <p className="text-xs text-muted-foreground">Commits (Year)</p>
                        <p className="font-medium">{github_stats.commitsPastYear}</p>
                    </div>
                    <div className="border border-border rounded-md p-2 flex-1">
                        <p className="text-xs text-muted-foreground">PRs</p>
                        <p className="font-medium">{github_stats.pullRequests}</p>
                    </div>
                    <div className="border border-border rounded-md p-2 flex-1">
                        <p className="text-xs text-muted-foreground">Issues</p>
                        <p className="font-medium">{github_stats.issues}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
