import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import { Rocket } from "lucide-react";

export const TrascendingCodeCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader
                index="05"
                title="Beyond Coding"
                tag="mindset & growth"
                icon={<Rocket size={14} />}
            />

            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                    Beyond the IDE, I see myself as a problem solver and a lifelong learner. True engineering
                    excellence requires not just technical skill, but a holistic mindset that embraces constant
                    evolution.
                </p>
                <p>
                    To deepen my craft, I study classics like{" "}
                    <span className="italic text-foreground">C Programming: A Modern Approach</span>,{" "}
                    <span className="italic text-foreground">Design Patterns</span>, and{" "}
                    <span className="italic text-foreground">Java: The Complete Reference</span> to ground my
                    modern development work in timeless software engineering principles.
                </p>
                <p>
                    My growth isn&apos;t limited to technology. I actively cultivate productivity and emotional
                    intelligence through books like{" "}
                    <span className="italic text-foreground">Atomic Habits</span> and{" "}
                    <span className="italic text-foreground">Surrounded by Idiots</span>, ensuring I bring both
                    technical acuity and personal effectiveness to every team I join.
                </p>
            </div>
        </div>
    );
};
