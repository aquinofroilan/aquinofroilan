import { Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const TrascendingCodeCard = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Rocket size={15} />
                        <span className="text-lg">Beyond Coding</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-5">
                        <p className="text-sm text-justify">
                            Beyond the IDE, I see myself as a problem solver and a lifelong learner. I believe that true
                            engineering excellence requires not just technical skill, but a holistic mindset that
                            embraces constant evolution.
                        </p>
                        <p className="text-sm text-justify">
                            To deepen my craft, I turn to foundational literature. I study classics like{" "}
                            <i>C Programming: A Modern Approach</i>, <i>Design Patterns</i>, and{" "}
                            <i>Java: The Complete Reference</i> to ground my modern development work in timeless
                            software engineering principles.
                        </p>
                        <p className="text-sm text-justify">
                            My growth isn&apos;t limited to technology. I actively cultivate productivity and emotional
                            intelligence through books like <i>Atomic Habits</i> and <i>Surrounded by Idiots</i>,
                            ensuring I bring both technical acuity and personal effectiveness to every team I join.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
