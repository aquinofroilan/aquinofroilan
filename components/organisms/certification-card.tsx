import { BadgeCheckIcon } from "lucide-react";
import Link from "next/link";
import { getCredlyCertifications } from "@/actions";
import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";

export const CertificationCard = async ({ className }: { className?: string }) => {
    const credlyCerts = await getCredlyCertifications();

    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader
                index="02"
                title="Certifications"
                tag="verified credentials"
                icon={<BadgeCheckIcon size={14} />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {credlyCerts.map((cert, i) => (
                    <Link
                        key={i}
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        data-cricket-perch="true"
                        className="group flex flex-col justify-between gap-2 border border-border/30 p-3.5 hover:border-primary/40 hover:bg-muted/20 transition-all"
                    >
                        <span className="font-mono text-xs font-medium text-foreground group-hover:text-primary transition-colors uppercase tracking-wide leading-snug">
                            {cert.title}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">{cert.issuer}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
