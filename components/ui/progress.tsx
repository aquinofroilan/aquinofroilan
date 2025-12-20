"use client";
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from "react";
import { Root, Indicator } from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
    ({ className, value, ...props }, ref) => (
        <Root
            ref={ref}
            className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
            {...props}
        >
            <Indicator
                className="h-full w-full flex-1 bg-primary rounded-full transition-all"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </Root>
    ),
);
Progress.displayName = Root.displayName;

export { Progress };
