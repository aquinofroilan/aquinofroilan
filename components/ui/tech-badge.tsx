import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const techBadgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-none border font-mono text-xs font-medium uppercase tracking-wider transition-colors",
    {
        variants: {
            variant: {
                default: "border-border bg-card text-foreground hover:bg-muted/50",
                solid: "border-primary bg-primary text-primary-foreground",
                outline: "border-border text-muted-foreground",
                muted: "border-transparent bg-muted/60 text-muted-foreground",
                tag: "border-border/60 bg-muted/20 px-2 py-0.5 text-[11px] text-muted-foreground",
            },
            size: {
                sm: "px-2 py-0.5 text-[10px]",
                default: "px-2.5 py-1 text-xs",
                lg: "px-3 py-1.5 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface TechBadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof techBadgeVariants> {
    prefixChar?: string;
}

const TechBadge = forwardRef<HTMLSpanElement, TechBadgeProps>(
    ({ className, variant, size, prefixChar, children, ...props }, ref) => {
        return (
            <span ref={ref} className={cn(techBadgeVariants({ variant, size }), className)} {...props}>
                {prefixChar && <span className="opacity-50 select-none">{prefixChar}</span>}
                {children}
            </span>
        );
    },
);
TechBadge.displayName = "TechBadge";

export { TechBadge, techBadgeVariants };
