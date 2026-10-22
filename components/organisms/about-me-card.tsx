import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import { ContactRound } from "lucide-react";

export const AboutCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader
                index="01"
                title="About Me"
                tag="professional bio"
                icon={<ContactRound size={14} />}
            />

            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                    I am a <span className="font-semibold text-foreground">Frontend Developer</span> at{" "}
                    <span className="font-semibold text-foreground">Journey Better Business Group Inc.</span>,
                    passionate about crafting scalable and sophisticated applications. While I have a strong
                    command of the JavaScript/TypeScript ecosystem (React, Next.js), my expertise extends to
                    backend development with Java (Spring Boot) and Python (Flask), utilizing robust database
                    solutions like PostgreSQL and Supabase.
                </p>
                <p>
                    I hold a{" "}
                    <span className="font-semibold text-foreground">
                        Bachelor&apos;s degree in Information Technology (2025)
                    </span>
                    . My approach to engineering is deeply self-directed; I leverage AI-augmented workflows and
                    continuous learning resources to solve complex problems and accelerate development.
                </p>
                <p>
                    I believe great software requires great usability. My growing proficiency in{" "}
                    <span className="font-semibold text-foreground">UI/UX design</span> and tools like Figma
                    allows me to bridge the gap between technical functionality and intuitive user experiences.
                </p>
                <p>
                    Currently expanding my horizons into{" "}
                    <span className="font-semibold text-foreground">C and Go</span> to deepen my understanding
                    of low-level operations, memory management, and advanced DSA.
                </p>
            </div>
        </div>
    );
};
