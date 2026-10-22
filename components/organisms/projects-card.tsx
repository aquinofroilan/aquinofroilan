import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import Link from "next/link";
import { ArrowRight, FolderCode } from "lucide-react";
import { ProjectsList } from "@/data/projects-list";

/**
 * Blueprint-styled Projects card — shows a summary of the top 2 projects with
 * a "View All" link. Content layout follows the technical-blueprint aesthetic.
 */
function ProjectsCard({ className }: { className?: string }) {
    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader index="04" title="Projects" tag="selected work" icon={<FolderCode size={14} />}>
                <Link
                    href="/projects"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 uppercase tracking-wider"
                >
                    View All <ArrowRight size={12} />
                </Link>
            </BlueprintSectionHeader>

            <div className="flex flex-col gap-4">
                {ProjectsList.slice(0, 2).map((project) => (
                    <div
                        key={project.pageLink}
                        className="border border-border/30 px-3 py-3 flex flex-col gap-2 hover:border-primary/40 hover:bg-muted/20 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wide">
                                {project.title}
                            </span>
                            <Link
                                href={project.pageLink}
                                rel="noreferrer"
                                className="font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                            >
                                Details <ArrowRight size={11} />
                            </Link>
                        </div>
                        <p className="font-mono text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.footerContent.map((footer) => (
                                <span
                                    key={footer.text}
                                    className="inline-flex items-center gap-1 font-mono text-[10px] border border-border/40 px-1.5 py-0.5 text-muted-foreground bg-muted/20"
                                >
                                    {footer.icon}
                                    {footer.text}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectsCard;
