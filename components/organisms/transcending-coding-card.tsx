import { Rocket } from "lucide-react";
import { BentoGridItem } from "@/components/ui";
import * as motion from "motion/react-client";

export const TrascendingCodeCard = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.8,
            }}
            className={className}
        >
            <BentoGridItem
                className="w-full h-full"
                icon={<Rocket size={15} />}
                title={<h1 className="text-lg">Beyond Coding</h1>}
                description={
                    <div className="flex flex-col gap-5">
                        <p className="text-sm text-justify">
                            I am not just a coder, I am a reader, a thinker, a tech enthusiast, and a problem solver.
                        </p>
                        <p className="text-sm text-justify">
                            I am passionate about learning and growing as a developer. To do this, I read books like C
                            Programming A Modern Approach, Design Patterns, and Java The Complete Reference. I also read
                            articles and watch videos on various topics related to programming, technology, and software
                            development.
                        </p>
                        <p className="text-sm text-justify">
                            Apart from coding books, I also read books on personal development, productivity, and
                            self-improvement. For instance Atomic Habits, Surrounded by Idiots and The Subtle Art of Not
                            Giving a F*ck.
                        </p>
                    </div>
                }
            />
        </motion.div>
    );
};
