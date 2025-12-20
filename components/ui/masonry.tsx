/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Children, forwardRef, isValidElement, useMemo, type HTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface MasonryProps extends HTMLAttributes<HTMLDivElement> {
    columnCount?: number;
    gap?: number;
    // Legacy props to prevent errors, though they might be ignored in this simple version
    columnWidth?: number;
    maxColumnCount?: number;
    itemHeight?: number;
    defaultWidth?: number;
    defaultHeight?: number;
    overscan?: number;
    scrollFps?: number;
    linear?: boolean;
    asChild?: boolean;
}

const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
    (
        {
            className,
            children,
            columnCount = 3,
            gap = 16,
            // Destructure unused props to avoid passing them to the DOM
            columnWidth,
            maxColumnCount,
            itemHeight,
            defaultWidth,
            defaultHeight,
            overscan,
            scrollFps,
            linear,
            asChild,
            ...props
        },
        ref,
    ) => {
        // Distribute children into columns
        const columns = useMemo(() => {
            const cols: ReactNode[][] = Array.from({ length: columnCount }, () => []);

            Children.forEach(children, (child, index) => {
                if (isValidElement(child)) {
                    cols[index % columnCount].push(child);
                }
            });
            return cols;
        }, [children, columnCount]);

        return (
            <div
                ref={ref}
                className={cn("flex w-full", className)}
                style={{ gap: `${gap}px` }}
                {...props}
            >
                {columns.map((col, i) => (
                    <div key={i} className="flex flex-col flex-1" style={{ gap: `${gap}px` }}>
                        {col}
                    </div>
                ))}
            </div>
        );
    },
);
Masonry.displayName = "Masonry";

interface MasonryItemProps extends HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
}

const MasonryItem = forwardRef<HTMLDivElement, MasonryItemProps>(
    ({ className, children, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : "div";
        return (
            <Comp ref={ref} className={cn("mb-0", className)} {...props}>
                {children}
            </Comp>
        );
    },
);
MasonryItem.displayName = "MasonryItem";

export { Masonry, MasonryItem, type MasonryProps };
