import { PartyPopper } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";

const milestones = [
    {
        year: "07/15 - Present",
        title: "AI Developer | Salesperson Inc.",
        description: "Developed client-facing AI services and applications with a focus on clean code and architecture decisions, while serving as a primary maintainer for the company's AI Search infrastructure to ensure swift issue resolution and high uptime.",
        badge: "Full time",
    },
    {
        year: "09/25 - 07/15",
        title: "Frontend Developer | Journey Better Business Group Inc.",
        description: "Stabilized the company's AI Search product by refactoring monolithic Python modules into modular, object-oriented components (reducing file sizes by up to 50%), resolving architectural bottlenecks, and contributing across the full stack (backend logic, AI integration, Magento) alongside CI/CD and security workflows.",
        badge: "Full time",
    },
    {
        year: "05/25",
        title: "Bachelor's Degree & Academic Excellence",
        description: "Graduated with a degree in Information Technology. Awarded Best in Capstone and Practicum.",
        badge: "Education",
    },
    {
        year: "01/25 - 05/25",
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

export const CompetenciesCard = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PartyPopper size={15} />
                        <span className="text-lg">My Journey</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative pl-8 mt-4">
                        <div className="absolute left-0 top-1 bottom-8 w-0.5 bg-linear-to-t to-primary/80 from-primary/20 rounded-full" />
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => {
                                return (
                                    <div key={index} className="relative group">
                                        <div className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-transparent border-primary border-2 group-hover:bg-primary transition-colors" />
                                        <div className="pb-2 pl-3">
                                            <Badge variant="outline" className="text-xs py-0">
                                                {milestone.year}
                                            </Badge>
                                            <Badge variant="secondary" className="ml-2 text-xs py-0">
                                                {milestone.badge}
                                            </Badge>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium">{milestone.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
