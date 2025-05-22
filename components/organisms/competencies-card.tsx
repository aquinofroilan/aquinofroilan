import { PartyPopper } from "lucide-react";
import { BentoGridItem, Badge } from "@/components/ui";

// Timeline data
const milestones = [
    {
        year: "2021",
        title: "First Steps",
        description: "Wrote my first line of code",
        badge: "Beginning",
    },
    {
        year: "2023",
        title: "IT Olympics 2023",
        description:
            'Quiz Bee University of Makati — Theme: "The IT Innovators\' Gauntlet: Forging Ahead the Future of Technology"',
        badge: "Competition",
    },
    {
        year: "2025",
        title: "Web Development Internship",
        description: "Internship as web developer at Ishkaster Media",
        badge: "Internship",
    },
    {
        year: "2025",
        title: "Bachelor's Degree",
        description: "Graduated with a degree in Information Technology",
        badge: "Education",
    },
    {
        year: "2025",
        title: "Academic Excellence",
        description: "Best in Capstone and Practicum",
        badge: "Achievement",
    },
];

export const CompentenciesCard = ({ className }: { className?: string }) => {
    return (
        <BentoGridItem
            className={className}
            icon={<PartyPopper size={15} />}
            title={<h1 className="text-lg">My Journey</h1>}
            description={
                <div className="relative pl-8 mt-4">
                    {/* Timeline line */}
                    <div className="absolute left-0 top-1 bottom-8 w-[2px] bg-gradient-to-b from-primary/80 to-primary/20 rounded-full" />

                    {/* Timeline items */}
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="relative">
                                {/* Timeline dot */}
                                <div className="absolute left-[-8px] top-1 w-3 h-3 rounded-full bg-primary" />

                                {/* Content */}
                                <div className="pb-2">
                                    <Badge variant="outline" className="text-xs py-0">
                                        {milestone.year}
                                    </Badge>
                                    <h3 className="text-base font-medium">{milestone.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        />
    );
};
