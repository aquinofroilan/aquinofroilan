import { BentoGridItem } from "@/components/ui";
import { ContactRoundIcon } from "lucide-react";
function AboutCard() {
    return (
        <BentoGridItem
            title={<h1>About Me</h1>}
            icon={<ContactRoundIcon size={25} />}
            description={
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-xs md:text-base">
                        I develop applications using Javascript frameworks and libraries like React and also use the
                        React&apos;s Framework Next.js, like this website. I used Next.js to create this website. I also
                        used Supabase as my database and Firebase for my authentication. I&apos;m currently getting my
                        bachelor&apos;s degree in Information Technology and will finish in 2025. To sum up, my learning
                        modalities are not limited to school classes; I also attend online sessions at the Google
                        Developer Students Club to learn something new and seek opportunities for my career.
                    </h1>
                    <h1 className="text-xs md:text-base">
                        In my self-taught programming session, I used platforms like YouTube and freecodecamp to and at
                        the same time learning UI/UX design since I&apos;m also interested in designing. I also used
                        Udemy, EdX, Coursera, and a like to learn something new and to add to my knowledge of
                        programming. I also used platforms like Medium and Dev.to to read articles about programming and
                        learn something new. I also used platforms like Stackoverflow and GitHub to read questions and
                        learn something new. Right now, I&apos;m currently planning on getting certified in the Google
                        UI/UX certification program through Coursera.
                    </h1>
                    <h1 className="text-xs md:text-base">
                        When I&apos;m not coding, I&apos; reading English books to hone my proficiency and expand my
                        vocabulary. I also watch emerging technology-related videos to keep myself up-to-date with the
                        latest technology trends.
                    </h1>
                </div>
            }
        />
    );
}

export default AboutCard;
