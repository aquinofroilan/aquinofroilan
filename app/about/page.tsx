import Link from "next/link";
import Image from "next/image";
import AboutMeCode from "./components/about-me-code-snippets";
import TechStack from "@/app/about/tech-stack";
import NowPlayingWidget from "@/components/widget/now-playing-widget";

export const metadata = {
    title: "About - Froilan | Web Developer",
    description: "Personal Website of Froilan",
};

const About = () => {
    return (
        <div className="w-11/12 max-w-7xl flex flex-col gap-2 justify-start items-start">
            <h1 className="font-bold text-3xl lg:font-extrabold md:text-4xl lg:text-5xl xl:text-8xl">About</h1>
            <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="gap-5 flex lg:w-1/4 flex-col">
                    <h1 className="text-xs md:text-base">
                        Hi, I&apos;m Froilan Aquino, currently living in Caloocan City, Metro Manila, Philippines!
                        I&apos;m a full-stack developer/engineer, I develop and leverage JavaScript, Python, and MySQL,
                        and i am a technology enthusiast.
                    </h1>
                    <div>
                        <h1 className="font-bold text-xl">Contact</h1>
                        <p className="text-sm md:text-base">
                            You have any inquiries? Feel free to{" "}
                            <Link
                                className="underline text-primary font-bold"
                                href="mailto:froilan.j.aquino@gmail.com"
                                target="_blank"
                            >
                                contact
                            </Link>{" "}
                            me at:
                        </p>
                        <p className="text-sm text-primary">froilan.j.aquino@gmail.com</p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col w-full gap-5">
                        <div className="w-full flex flex-col gap-3">
                            <h1 className="text-xs md:text-base">
                                I develop applications using Javascript frameworks and libraries like React and also use
                                the React&apos;s Framework Next.js, like this website. I used Next.js to create this
                                website. I also used Supabase as my database and Firebase for my authentication.
                                I&apos;m currently getting my bachelor&apos;s degree in Information Technology and will
                                finish in 2025. To sum up, my learning modalities are not limited to school classes; I
                                also attend online sessions at the Google Developer Students Club to learn something new
                                and seek opportunities for my career.
                            </h1>
                            <h1 className="text-xs md:text-base">
                                In my self-taught programming session, I used platforms like YouTube and freecodecamp to
                                and at the same time learning UI/UX design since I&apos;m also interested in designing.
                                I also used Udemy, EdX, Coursera, and a like to learn something new and to add to my
                                knowledge of programming. I also used platforms like Medium and Dev.to to read articles
                                about programming and learn something new. I also used platforms like Stackoverflow and
                                GitHub to read questions and learn something new. Right now, I&apos;m currently planning
                                on getting certified in the Google UI/UX certification program through Coursera.
                            </h1>
                            <h1 className="text-xs md:text-base">
                                When I&apos;m not coding, I&apos; reading English books to hone my proficiency and
                                expand my vocabulary. I also watch emerging technology-related videos to keep myself
                                up-to-date with the latest technology trends.
                            </h1>
                        </div>
                        <TechStack />
                        <AboutMeCode />
                        <div className="grid max-h-screen w-full grid-rows-2 gap-3 justify-center items-center grid-cols-1 lg:grid-cols-2 overflow-y-auto">
                            <Image
                                src="https://roadmap.sh/card/wide/667cd2ae2028c2d81892c220?variant=light&roadmaps=frontend"
                                alt="Frontend Roadmap"
                                width={400}
                                height={400}
                                className="w-11/12  justify-self-center"
                            />
                            <NowPlayingWidget className="w-full self-center max-w-7xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
