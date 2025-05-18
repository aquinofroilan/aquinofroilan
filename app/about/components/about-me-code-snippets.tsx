import { FetchWakaTimeStats } from "@/actions/wakatime";
import {
    Comments,
    VariableDeclaration,
    StringKeyNonStringValueDictionary,
    StringKeyValueDictionary,
} from "@/app/about/components/code_syntax/syntax-highlighting-component";
import { Fira_Code } from "next/font/google";
import { Card, CardContent, CardHeader } from "@/components/ui";

const fira_code = Fira_Code({
    weight: "500",
    style: "normal",
    subsets: ["latin"],
});

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
        <Card className={`rounded-md ${fira_code.className}`}>
            <CardHeader className="bg-[#2e343b] px-5 py-3 rounded-t-md flex flex-row gap-5 items-center justify-start">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <div className="w-4 h-4 rounded-full bg-[#ff4f4e]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#ffb900]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#00cc1a]"></div>
                </div>

                <div className="bg-[#282A36] rounded-xl p-2 flex flex-row items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-8 h-8" viewBox="0 0 48 48">
                        <path
                            fill="#0277BD"
                            d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"
                        ></path>
                        <path
                            fill="#FFC107"
                            d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"
                        ></path>
                    </svg>
                    <h1 className="text-white">stats.py</h1>
                </div>
            </CardHeader>
            <CardContent className="bg-[#282A36] flex-col flex gap-5 rounded-b-md text-white pt-5">
                <Comments comment_content="Froilan's top languages" />
                <div className="flex flex-row items-center gap-3">
                    <VariableDeclaration variable_name="top_languages" />
                    {"{"}
                </div>
                <div className="pl-5">
                    {top_languages.map((lang) => {
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
                    {(Object.keys(github_stats) as (keyof GitHubStats)[]).map((key) => {
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
            </CardContent>
        </Card>
    );
};

export default AboutMeCode;
