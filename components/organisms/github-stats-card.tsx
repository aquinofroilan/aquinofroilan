import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui";
import { Github } from "@/components/atoms";
import { getGithubStats } from "@/actions";

export const GithubStatsCard = async ({ className }: { className?: string }) => {
    let github_stats;
    try {
        github_stats = await getGithubStats();
    } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        return null;
    }
    if (!github_stats) return null;

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span className="text-lg">GitHub Activity</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span>Stars</span>
                        <span>{github_stats.stars}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span>Commits (Year)</span>
                        <span>{github_stats.commitsPastYear}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span>PRs</span>
                        <span>{github_stats.pullRequests}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span>Issues</span>
                        <span>{github_stats.issues}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
