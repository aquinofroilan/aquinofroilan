import { BadgeCheckIcon, ArrowRightCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import Link from "next/link";
import { getCredlyCertifications } from "@/actions";

export const CertificationCard = async ({ className }: { className?: string }) => {
    const credlyCerts = await getCredlyCertifications();

    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <BadgeCheckIcon size={15} />
                            <span className="text-lg">Certifications</span>
                        </div>
                        <Link
                            href={"/certifications"}
                            className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                        >
                            View All
                            <ArrowRightCircle size={15} />
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex flex-col gap-4">
                        {credlyCerts.slice(0, 4).map((cert, i) => {
                            return (
                                <Link
                                    href={cert.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={i}
                                    className="flex flex-col gap-1 group"
                                >
                                    <h1 className="text-sm font-medium group-hover:underline underline-offset-2">
                                        {cert.title}
                                    </h1>
                                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                                </Link>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
