import { BentoGridItem } from "@/components/ui";
import { ContactRoundIcon } from "lucide-react";
import * as motion from "motion/react-client";

export const AboutCard = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.2,
            }}
            className={className}
        >
            <BentoGridItem
                className="w-full h-full"
                title={<h1 className="text-lg">About Me</h1>}
                icon={<ContactRoundIcon size={15} />}
                description={
                    <div className="w-full flex flex-col gap-3">
                        <p className="text-sm text-justify">
                            I work as a web developer and have a passion for creating scalable, maintainable, and
                            sophisticated applications utilizing contemporary JavaScript technologies, especially React
                            and its powerful Next.js, the framework that powers this website. In terms of service and
                            backend architecture, I use platforms such as Firebase for smooth authentication and
                            Supabase for database orchestration integration.
                        </p>
                        <p className="text-sm text-justify">
                            I recently received my information technology bachelor&apos;s degree in 2025, and I&apos;m
                            still expanding my knowledge outside of the classroom. I have a very self-directed approach
                            to learning—I actively use AI-based tools like ChatGPT and websites like YouTube and
                            FreeCode. and Claude to deepen my understanding and reaffirm ideas. My inquisitive nature
                            frequently results in examining subjects using Dev.to, Medium, and technical discussions on
                            GitHub and Stack Overflow. archives.
                        </p>
                        <p className="text-sm text-justify">
                            A growing interest in UI/UX design complements my programming journey, which I develop using
                            Figma and organized education from sites such as Udemy, EdX, and Coursera.
                        </p>
                        <p className="text-sm text-justify">
                            I am currently broadening my technical foundation by studying system-level programming
                            languages such as C and Go, with the aim of deepening my understanding of low-level
                            operations and enhancing my algorithmic thinking. In parallel, I am exploring Java and
                            Kotlin to adopt a native-first approach to mobile development.
                        </p>
                    </div>
                }
            />
        </motion.div>
    );
};
