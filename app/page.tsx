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
import { Masonry, FadeIn } from "@/components/ui";
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
                <Masonry columnCount={3} gap={16} className="w-full">
                    <FadeIn delay={0.1} className="h-auto overflow-visible">
                        <ProfileCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.15} className="h-auto overflow-visible">
                        <AboutCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.2} className="h-auto overflow-visible">
                        <CertificationCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.25} className="h-auto overflow-visible">
                        <TechStackCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.3} className="h-auto overflow-visible">
                        <ProjectsCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.35} className="h-auto overflow-visible">
                        <TrascendingCodeCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.4} className="h-auto overflow-visible">
                        <WakatimeStatsLanguages className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.45} className="h-auto overflow-visible">
                        <WakatimeStatsActivity className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.5} className="h-auto overflow-visible">
                        <WakatimeStatsEditors className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.55} className="h-auto overflow-visible">
                        <WakatimeStatsOS className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.6} className="h-auto overflow-visible">
                        <GithubStatsCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.65} className="h-auto overflow-visible">
                        <CompetenciesCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.7} className="h-auto overflow-visible">
                        <ContactMe className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.75} className="h-auto overflow-visible w-full">
                        <SpotifyCard className="h-full w-full" />
                    </FadeIn>
                </Masonry>
            </main>
        </>
    );
}
