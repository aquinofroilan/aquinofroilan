import {
    AboutCard,
    CertificationCard,
    ContactMe,
    NowPlayingWidget,
    ProfileCard,
    TechStackCard,
    TrascendingCodeCard,
    WakatimeStatsCard,
} from "@/components/organisms/";

export default function Home() {
    return (
        <main className="py-10 w-11/12 max-w-5xl gap-2 flex flex-col md:grid md:grid-cols-2">
            <ProfileCard className="col-span-2" />
            <AboutCard className="col-span-1 row-span-2" />
            <CertificationCard className="w-full col-span-1 row-span-1" />
            <TechStackCard className="w-full col-span-1 row-span-1" />
            <NowPlayingWidget className="w-full col-span-2 row-span-3" />
            <WakatimeStatsCard className="row-span-2 col-span-1" />
            <TrascendingCodeCard />
            <ContactMe />
        </main>
    );
}
