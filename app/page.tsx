import {
    AboutCard,
    CertificationCard,
    CompentenciesCard,
    ContactMe,
    NowPlayingWidget,
    ProfileCard,
    TechStackCard,
    TrascendingCodeCard,
    WakatimeStatsCard,
} from "@/components/organisms/";
import ProjectsCard from "@/components/organisms/projects-card";

export default function Home() {
    return (
        <>
            <main className="py-10 w-11/12 max-w-7xl gap-2 flex flex-col md:grid md:grid-cols-2">
                <ProfileCard className="h-full overflow-scroll col-span-2" />
                <AboutCard className="h-full overflow-scroll col-span-1 row-span-2" />
                <CertificationCard className="h-full overflow-scroll col-span-1 row-span-1" />
                <TechStackCard className="h-full overflow-scroll col-span-1 row-span-1" />
                <ProjectsCard className="h-full overflow-scroll col-span-1 row-span-1" />
                <NowPlayingWidget className="h-full overflow-scroll w-full col-span-1 row-span-1" />
                <TrascendingCodeCard className="h-full overflow-scroll col-span-1 row-span-1" />
                <WakatimeStatsCard className="h-full overflow-scroll row-span-3 col-span-1" />
                <CompentenciesCard />
                <ContactMe />
            </main>
        </>
    );
}
