import { FetchWakaTimeStats } from "@/actions/wakatime";
import CodeSnippetsWrapper from "@/app/about/components/CodeSnippetsWrapper";
import {
    Comments,
    VariableDeclaration,
    StringKeyNonStringValueDictionary,
    StringKeyValueDictionary,
} from "@/app/about/components/code_syntax/SyntaxHighLight";
import React from "react";

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

const AboutMeCode = async () => {
    // This data will be fetched from the GitHub API. For now, I'll just hardcode it.
    const top_languages = [
        {
            lang_name: "TypeScript",
            percentage: 71.37,
        },
        {
            lang_name: "HTML",
            percentage: 16.82,
        },
        {
            lang_name: "Python",
            percentage: 7.74,
        },
        {
            lang_name: "Jupyter Notebook",
            percentage: 1.73,
        },
        {
            lang_name: "Java",
            percentage: 1.42,
        },
    ];

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
        <CodeSnippetsWrapper>
            <Comments comment_content="Froilan's top languages" />
            <div className="flex flex-row items-center gap-3">
                <VariableDeclaration variable_name="top_languages" />
                {"{"}
            </div>
            <div className="pl-5">
                {top_languages.map((lang, index) => {
                    return (
                        <StringKeyNonStringValueDictionary
                            dict_key={lang.lang_name}
                            key={lang.lang_name}
                            value={lang.percentage.toString()}
                        />
                    );
                })}
            </div>
            {"}"}
            <Comments comment_content="Froilan's GitHub Stats" />
            <div className="flex flex-row items-center gap-3">
                <VariableDeclaration variable_name="github_stats" />
                {"{"}
            </div>
            <div className="pl-5">
                {(Object.keys(github_stats) as (keyof GitHubStats)[]).map((key, index) => {
                    return (
                        <StringKeyNonStringValueDictionary
                            dict_key={key}
                            key={key}
                            value={github_stats[key].toString()}
                        />
                    );
                })}
            </div>
            {"}"}

            <Comments comment_content="Froilan's WakaTime Stats" />
            <div className="flex flex-row items-center gap-3">
                <VariableDeclaration variable_name="wakatime_stats" />
                {"{"}
            </div>
            <div className="pl-5 flex flex-col">
                <p className="text-[#F1FA8C]">
                    &apos;languages&apos;: <span className="text-white">{"{"}</span>
                </p>
                {wakatimeLanguages?.map((lang) => {
                    return (
                        <StringKeyValueDictionary
                            className="pl-5"
                            dict_key={lang.name.toLowerCase().replace(" ", "_")}
                            key={lang.name}
                            value={`${lang.text}`}
                        />
                    );
                })}
                {"}"},
                <p className="text-[#F1FA8C]">
                    &apos;activity&apos;:
                    <span className="text-white"> {"{"}</span>
                </p>
                {wakatimeCategories?.map((category) => {
                    return (
                        <StringKeyValueDictionary
                            className="pl-5"
                            dict_key={category.name.toLowerCase().replace(" ", "_")}
                            key={category.name}
                            value={`${category.text}`}
                        />
                    );
                })}
                {"}"},
                <p className="text-[#F1FA8C]">
                    &apos;editors&apos;: <span className="text-white"> {"{"}</span>
                </p>
                {wakatimeEditors?.map((editor) => {
                    return (
                        <StringKeyValueDictionary
                            className="pl-5"
                            dict_key={editor.name.toLowerCase().replace(" ", "_")}
                            key={editor.name}
                            value={`${editor.text}`}
                        />
                    );
                })}
                {"}"},
                <p className="text-[#F1FA8C]">
                    &apos;operating_systems&apos;:
                    <span className="text-white"> {"{"}</span>
                </p>
                {wakatimeOperatingSystems?.map((os) => {
                    return (
                        <StringKeyValueDictionary
                            className="pl-5"
                            dict_key={os.name.toLowerCase()}
                            key={os.name}
                            value={`${os.text}`}
                        />
                    );
                })}
                {"}"},
                <StringKeyValueDictionary dict_key="average" value={wakatimeDailyAverage} />
                <StringKeyValueDictionary dict_key="total_hours" value={wakatimeTotal.toString()} />
            </div>
            {"}"}
        </CodeSnippetsWrapper>
    );
};

export default AboutMeCode;
