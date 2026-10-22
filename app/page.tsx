import {
    AboutCard,
    CertificationCard,
    CompetenciesCard,
    ContactMe,
    HeroSection,
    TechStackCard,
    TrascendingCodeCard,
    WorkflowsCard,
} from "@/components/organisms/";
import ProjectsCard from "@/components/organisms/projects-card";
import { FadeIn } from "@/components/ui";
import type { Metadata } from "next";

export const revalidate = 14400;

export const metadata: Metadata = {
    title: `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"} | ${process.env.CURRENT_COMPANY || ""} | ${process.env.CURRENT_WORK_LOCATION || "Philippines"}`,
    description: `Personal Website of Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"} based in Caloocan, Philippines.${process.env.CURRENT_COMPANY ? ` Currently working at ${process.env.CURRENT_COMPANY}.` : ""}`,
    keywords: ["Froilan", "Software Engineer", "Portfolio"],
};

export default function Home() {
    return (
        <main className="py-10 w-11/12 max-w-7xl flex flex-col gap-6">

            {/* 00 · Hero — full width 3-col */}
            <FadeIn delay={0.05}>
                <HeroSection />
            </FadeIn>

            {/* 01 + 03 · About & Tech Stack — side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                    <AboutCard className="h-full" />
                </FadeIn>
                <FadeIn delay={0.15}>
                    <TechStackCard className="h-full" />
                </FadeIn>
            </div>

            {/* 02 · Certifications — full width */}
            <FadeIn delay={0.2}>
                <CertificationCard />
            </FadeIn>

            {/* 04 · Projects — full width */}
            <FadeIn delay={0.25}>
                <ProjectsCard />
            </FadeIn>

            {/* 08 · Workflows simulator — full width */}
            <FadeIn delay={0.3}>
                <WorkflowsCard />
            </FadeIn>

            {/* 06 + 05 · Journey & Beyond Coding — side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={0.35}>
                    <CompetenciesCard className="h-full" />
                </FadeIn>
                <FadeIn delay={0.4}>
                    <TrascendingCodeCard className="h-full" />
                </FadeIn>
            </div>

            {/* 07 · Contact desk — full width */}
            <FadeIn delay={0.45}>
                <ContactMe />
            </FadeIn>

        </main>
    );
}
