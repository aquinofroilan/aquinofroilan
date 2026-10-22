import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import { FRONTEND, BACKEND, DEVELOPER_TOOLS, DEVOPS } from "@/data/techstack-list";
import { FlaskConical } from "lucide-react";

function TechGroup({ label, items }: { label: string; items: string[] }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none">
                {label}
            </span>
            <div className="flex flex-wrap gap-2.5">
                {items.map((item) => (
                    <span
                        key={item}
                        className="font-mono text-[11px] border border-border/50 px-2.5 py-1 text-foreground bg-muted/20 hover:border-primary/50 transition-colors"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export const TechStackCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader
                index="03"
                title="Tech Stack"
                tag="developer stack"
                icon={<FlaskConical size={14} />}
            />

            <div className="flex flex-col gap-5">
                <TechGroup label="Frontend" items={FRONTEND} />
                <TechGroup label="Backend" items={BACKEND} />
                <TechGroup label="DevOps & Cloud" items={DEVOPS} />
                <TechGroup label="Developer Tools" items={DEVELOPER_TOOLS} />
            </div>
        </div>
    );
};
