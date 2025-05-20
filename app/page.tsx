import NowPlayingWidget from "@/components/organisms/now-playing-widget";
import ProfileCard from "@/components/organisms/profile-card";
import CertificationCard from "@/components/organisms/certification-card";
import AboutCard from "@/components/organisms/about-me-card";
import TechStackCard from "@/components/organisms/tech-stack-card";
import WakatimeStatsCard from "@/components/organisms/wakatime-stats-card";
import ContactMe from "@/components/organisms/contact-me-card";

export default function Home() {
    return (
        <main className="py-10 w-11/12 max-w-5xl gap-5 flex flex-col">
            <ProfileCard />
            <AboutCard />
            <NowPlayingWidget className="w-full" />
            <CertificationCard />
            <TechStackCard />
            <WakatimeStatsCard />
            <ContactMe />
        </main>
    );
}
