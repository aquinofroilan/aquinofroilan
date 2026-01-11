import { PartyPopper } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";

const milestones = [
    {
        year: "09/29/2025 - Present",
        title: "AI/Software Engineer",
        description: "Hired as AI/Software Engineer at Journey Better Business Group Inc.",
        badge: "Full time",
    },
    {
        year: "05/2025",
        title: "Bachelor's Degree & Academic Excellence",
        description: "Graduated with a degree in Information Technology. Awarded Best in Capstone and Practicum.",
        badge: "Education",
    },
    {
        year: "01/2025 - 05/2025",
        title: "Web Development Internship",
        description: "Internship as web developer at Ishkaster Media",
        badge: "Internship",
    },
    {
        year: "11/2023",
        title: "IT Olympics 2023 | Quiz Bee Participant",
        description:
            'Quiz Bee University of Makati — Theme: "The IT Innovators\' Gauntlet: Forging Ahead the Future of Technology"',
        badge: "Competition",
    },
    {
        year: "10/2020",
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
                            {milestones.map((milestone, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-transparent border-primary border-2 group-hover:bg-primary transition-colors" />
                                    <div className="pb-2 pl-3">
                                        <Badge variant="outline" className="text-xs py-0">
                                            {milestone.year}
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className="ml-2 text-xs py-0"
                                        >
                                            {milestone.badge}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-medium">{milestone.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
