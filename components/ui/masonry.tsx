"use client";
import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
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

// Mapping of column counts to Tailwind grid classes for desktop breakpoint
const DESKTOP_GRID_COLS: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
};

/**
 * Masonry layout component using CSS Grid
 * Responsive breakpoints:
 * - Mobile (<768px): 1 column
 * - Tablet (≥768px, <1024px): 2 columns
 * - Desktop (≥1024px): configurable columns (default: 3, supports 1-6, fallback to 3 for others)
 * Uses pure CSS for immediate responsive behavior without JS hydration issues
 */
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
            style,
            ...props
        },
        ref,
    ) => {
        // Get responsive grid classes based on Tailwind breakpoints
        const gridColsClass = DESKTOP_GRID_COLS[columnCount] || "lg:grid-cols-3";

        return (
            <div
                ref={ref}
                className={cn("w-full grid grid-cols-1 md:grid-cols-2", gridColsClass, className)}
                style={{
                    gap: `${gap}px`,
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        );
    },
);
Masonry.displayName = "Masonry";

interface MasonryItemProps extends HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
}

const MasonryItem = forwardRef<HTMLDivElement, MasonryItemProps>(({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
        <Comp ref={ref} className={cn("mb-0", className)} {...props}>
            {children}
        </Comp>
    );
});
MasonryItem.displayName = "MasonryItem";

export { Masonry, MasonryItem, type MasonryProps };
