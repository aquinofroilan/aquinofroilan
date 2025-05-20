import NowPlayingWidget from "@/components/organisms/now-playing-widget";
import ProfileCard from "@/components/organisms/profile-card";
import CertificationCard from "@/components/organisms/certification-card";
import AboutCard from "@/components/organisms/about-me-card";
import TechStackCard from "@/components/organisms/tech-stack-card";
import WakatimeStatsCard from "@/components/organisms/wakatime-stats-card";
import ContactMe from "@/components/organisms/contact-me-card";

export default function Home() {
    return (
        <main className="py-10 w-11/12 max-w-5xl gap-3 flex flex-col md:grid md:grid-cols-2">
            <ProfileCard className="col-span-2" />
            <AboutCard className="col-span-1 row-span-2" />
            <CertificationCard className="w-full col-span-1 row-span-1" />
            <TechStackCard className="w-full col-span-1 row-span-1" />
            <NowPlayingWidget className="w-full col-span-2 row-span-1" />
            <WakatimeStatsCard className="row-span-2 col-span-1" />
            <ContactMe />
        </main>
    );
}
