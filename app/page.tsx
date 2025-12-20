import {
    AboutCard,
    CertificationCard,
    CompetenciesCard,
    ContactMe,
    ProfileCard,
    TechStackCard,
    TrascendingCodeCard,
    WakatimeStatsCard,
    SpotifyCard,
} from "@/components/organisms/";
import ProjectsCard from "@/components/organisms/projects-card";
import { Masonry, MasonryItem } from "@/components/ui";
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
                    columnWidth={350}
                    gap={16}
                    columnCount={3}
                    maxColumnCount={3}
                    itemHeight={200}
                    className="w-full"
                >
                    <MasonryItem asChild>
                        <ProfileCard className="h-full overflow-scroll col-span-2" />
                    </MasonryItem>
                    <MasonryItem>
                        <AboutCard className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <CertificationCard className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <TechStackCard className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <ProjectsCard className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <TrascendingCodeCard className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <WakatimeStatsCard className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <CompetenciesCard className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <ContactMe className="h-auto overflow-visible" />
                    </MasonryItem>
                    <MasonryItem>
                        <SpotifyCard className="h-auto overflow-visible w-full" />
                    </MasonryItem>
                </Masonry>
            </main>
        </>
    );
}
