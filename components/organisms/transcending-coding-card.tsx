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
                </CardContent>
            </Card>
        </div>
    );
};
