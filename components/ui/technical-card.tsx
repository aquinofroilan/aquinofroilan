import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TechnicalCardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "muted" | "dashed";
}

const TechnicalCard = forwardRef<HTMLDivElement, TechnicalCardProps>(
    ({ className, variant = "default", children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative rounded-none border border-border bg-card p-6 text-card-foreground transition-all duration-200",
                    variant === "muted" && "bg-muted/30",
                    variant === "dashed" && "border-dashed",
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);
TechnicalCard.displayName = "TechnicalCard";

export { TechnicalCard };
