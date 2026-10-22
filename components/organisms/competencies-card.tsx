import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import { PartyPopper } from "lucide-react";

const milestones = [
    {
        year: "07/25 – Present",
        title: "AI Developer | Salesperson Inc.",
        description:
            "Developed client-facing AI services and applications with a focus on clean code and architecture decisions, while serving as a primary maintainer for the company's AI Search infrastructure to ensure swift issue resolution and high uptime.",
        badge: "Full time",
    },
    {
        year: "09/24 – 07/25",
        title: "Frontend Developer | Journey Better Business Group Inc.",
        description:
            "Stabilized the company's AI Search product by refactoring monolithic Python modules into modular, object-oriented components (reducing file sizes by up to 50%), resolving architectural bottlenecks, and contributing across the full stack.",
        badge: "Full time",
    },
    {
        year: "05/25",
        title: "Bachelor's Degree & Academic Excellence",
        description: "Graduated with a degree in Information Technology. Awarded Best in Capstone and Practicum.",
        badge: "Education",
    },
    {
        year: "01/25 – 05/25",
        title: "Web Development Internship",
        description: "Internship as web developer at Ishkaster Media",
        badge: "Internship",
    },
    {
        year: "11/23",
        title: "IT Olympics 2023 | Quiz Bee Participant",
        description:
            'Quiz Bee University of Makati — Theme: "The IT Innovators\' Gauntlet: Forging Ahead the Future of Technology"',
        badge: "Competition",
    },
    {
        year: "10/20",
        title: "Humble Beginnings",
        description: "Wrote my first line of code",
        badge: "Beginning",
    },
];

const badgeVariant: Record<string, string> = {
    "Full time": "text-primary border-primary/40 bg-primary/5",
    Education: "text-emerald-600 border-emerald-400/40 bg-emerald-50/20 dark:text-emerald-400",
    Internship: "text-amber-600 border-amber-400/40 bg-amber-50/20 dark:text-amber-400",
    Competition: "text-violet-600 border-violet-400/40 bg-violet-50/20 dark:text-violet-400",
    Beginning: "text-muted-foreground border-border/40 bg-muted/20",
};

export const CompetenciesCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader index="06" title="My Journey" tag="timeline" icon={<PartyPopper size={14} />} />

            <div className="relative pl-6">
                {/* vertical line */}
                <div className="absolute left-0 top-1 bottom-6 w-px bg-gradient-to-b from-primary/70 to-primary/10" />

                <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="relative group">
                            {/* timeline dot */}
                            <div className="absolute -left-[25px] top-1 h-2.5 w-2.5 border-2 border-primary bg-background group-hover:bg-primary transition-colors" />

                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-mono text-[10px] border border-border/40 px-1.5 py-0.5 text-muted-foreground bg-muted/20 uppercase tracking-wide">
                                    {milestone.year}
                                </span>
                                <span
                                    className={cn(
                                        "font-mono text-[10px] border px-1.5 py-0.5 uppercase tracking-wide",
                                        badgeVariant[milestone.badge] ?? "text-muted-foreground border-border/40",
                                    )}
                                >
                                    {milestone.badge}
                                </span>
                            </div>
                            <h3 className="font-mono text-xs font-semibold text-foreground leading-snug">
                                {milestone.title}
                            </h3>
                            <p className="font-mono text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                {milestone.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
