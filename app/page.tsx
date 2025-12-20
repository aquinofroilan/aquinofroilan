import {
    AboutCard,
    CertificationCard,
    CompetenciesCard,
    ContactMe,
    ProfileCard,
    TechStackCard,
    TrascendingCodeCard,
    WakatimeStatsLanguages,
    WakatimeStatsActivity,
    WakatimeStatsEditors,
    WakatimeStatsOS,
    GithubStatsCard,
    SpotifyCard,
} from "@/components/organisms/";
import ProjectsCard from "@/components/organisms/projects-card";
import { Masonry } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: process.env.PAGE_TITLE ? process.env.PAGE_TITLE : "Froilan | Software Engineer",
    description: "Welcome to my portfolio website.",
    keywords: ["Froilan", "Software Engineer", "Portfolio"],
};
export default function Home() {
    return (
        <>
            <main className="py-10 w-11/12 max-w-7xl">
                <Masonry
                    columnCount={3}
                    gap={16}
                    className="w-full"
                >
                    <ProfileCard className="h-auto overflow-visible" />
                    <AboutCard className="h-auto overflow-visible" />
                    <CertificationCard className="h-auto overflow-visible" />
                    <TechStackCard className="h-auto overflow-visible" />
                    <ProjectsCard className="h-auto overflow-visible" />
                    <TrascendingCodeCard className="h-auto overflow-visible" />
                    <WakatimeStatsLanguages className="h-auto overflow-visible" />
                    <WakatimeStatsActivity className="h-auto overflow-visible" />
                    <WakatimeStatsEditors className="h-auto overflow-visible" />
                    <WakatimeStatsOS className="h-auto overflow-visible" />
                    <GithubStatsCard className="h-auto overflow-visible" />
                    <CompetenciesCard className="h-auto overflow-visible" />
                    <ContactMe className="h-auto overflow-visible" />
                    <SpotifyCard className="h-auto overflow-visible w-full" />
                </Masonry>
            </main>
        </>
    );
}
