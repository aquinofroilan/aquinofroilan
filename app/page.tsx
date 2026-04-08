import {
    AboutCard,
    CertificationCard,
    CompetenciesCard,
    ContactMe,
    ProfileCard,
    TechStackCard,
    TrascendingCodeCard,
    RecentBlogsCard,
    BooksCard,
} from "@/components/organisms/";
import ProjectsCard from "@/components/organisms/projects-card";
import { Masonry, FadeIn } from "@/components/ui";
import type { Metadata } from "next";

export const revalidate = 14400;

export const metadata: Metadata = {
    title: `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"} | ${process.env.CURRENT_COMPANY || ""} | ${process.env.CURRENT_WORK_LOCATION || "Philippines"}`,
    description: `Personal Website of Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"} based in Caloocan, Philippines.${process.env.CURRENT_COMPANY ? ` Currently working at ${process.env.CURRENT_COMPANY}.` : ""}`,
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
                    <FadeIn delay={0.3} className="h-auto overflow-visible">
                        <RecentBlogsCard className="h-full overflow-auto col-span-2 row-span-1" />
                    </FadeIn>
                    <FadeIn delay={0.33} className="h-auto overflow-visible">
                        <BooksCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.35} className="h-auto overflow-visible">
                        <TrascendingCodeCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.65} className="h-auto overflow-visible">
                        <CompetenciesCard className="h-full" />
                    </FadeIn>
                    <FadeIn delay={0.7} className="h-auto overflow-visible">
                        <ContactMe className="h-full" />
                    </FadeIn>
                </Masonry>
            </main>
        </>
    );
}
