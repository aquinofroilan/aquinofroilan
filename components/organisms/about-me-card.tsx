import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { ContactRoundIcon } from "lucide-react";

export const AboutCard = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ContactRoundIcon size={15} />
                        <span className="text-lg">About Me</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex flex-col gap-3">
                        <p className="text-sm text-justify">
                            I am a <b>Frontend Developer</b> at <b>Journey Better Business Group Inc.</b>, passionate
                            about crafting scalable and sophisticated applications. While I have a strong command of the
                            JavaScript/TypeScript ecosystem (React, Next.js), my expertise extends to backend
                            development with Java (Spring Boot) and Python (Flask), utilizing robust database solutions
                            like PostgreSQL and Supabase.
                        </p>
                        <p className="text-sm text-justify">
                            I hold a <b>Bachelor&apos;s degree in Information Technology (2025)</b>. My approach to
                            engineering is deeply self-directed; I leverage AI-augmented workflows and continuous
                            learning resources to solve complex problems and accelerate development, ensuring I stay at
                            the forefront of industry trends.
                        </p>
                        <p className="text-sm text-justify">
                            I believe great software requires great usability. My growing proficiency in <b>UI/UX design</b>
                            and tools like Figma allows me to bridge the gap between technical functionality and
                            intuitive user experiences.
                        </p>
                        <p className="text-sm text-justify">
                            Currently, I am expanding my technical horizons by diving into system-level programming with
                            <b> C</b> and <b>Go</b>. This pursuit aims to deepen my understanding of low-level operations,
                            memory management, and advanced Data Structures and Algorithms, enabling me to write more
                            efficient and optimized code.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
