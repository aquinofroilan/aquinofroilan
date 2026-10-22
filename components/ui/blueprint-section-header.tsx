import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BlueprintSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
    index: string; // e.g. "01", "02", "05"
    title: string; // e.g. "ABOUT ME", "WORKFLOWS"
    tag?: string; // e.g. "professional bio", "developer stack", "live n8n orchestration"
    icon?: ReactNode;
}

const BlueprintSectionHeader = forwardRef<HTMLDivElement, BlueprintSectionHeaderProps>(
    ({ className, index, title, tag, icon, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-3 mb-8",
                    className,
                )}
                {...props}
            >
                <div className="flex items-center gap-2.5 font-mono">
                    {icon && <span className="text-muted-foreground select-none">{icon}</span>}
                    <span className="text-muted-foreground/60 select-none">{"</>"}</span>
                    <span className="font-bold tracking-wider text-foreground">{index}</span>
                    <span className="text-muted-foreground/50 select-none">/</span>
                    <h2 className="font-extrabold uppercase tracking-widest text-foreground text-sm sm:text-base">
                        {title}
                    </h2>
                </div>
                {tag && (
                    <span className="font-mono text-xs tracking-wider text-muted-foreground select-none">
                        [ {tag} ]
                    </span>
                )}
                {children}
            </div>
        );
    },
);
BlueprintSectionHeader.displayName = "BlueprintSectionHeader";

export { BlueprintSectionHeader };
