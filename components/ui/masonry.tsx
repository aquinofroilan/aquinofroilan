"use client";
import {
    Children,
    forwardRef,
    isValidElement,
    useMemo,
    useState,
    useEffect,
    type HTMLAttributes,
    type ReactNode,
} from "react";
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
}

/**
 * Masonry layout component with true Pinterest-style column distribution
 * Responsive breakpoints:
 * - Mobile (<768px): 1 column
 * - Tablet (≥768px, <1024px): 2 columns
 * - Desktop (≥1024px): configurable columns (default: 3)
 * 
 * Uses flexbox columns to allow items of varying heights to pack efficiently.
 * Initializes with mobile-first approach to prevent hydration mismatches.
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
            ...props
        },
        ref,
    ) => {
        // Initialize with 1 column (mobile-first) to prevent hydration mismatch
        const [currentColumnCount, setCurrentColumnCount] = useState(1);

        useEffect(() => {
            const updateColumns = () => {
                const width = window.innerWidth;
                if (width < 768) {
                    setCurrentColumnCount(1);
                } else if (width < 1024) {
                    setCurrentColumnCount(2);
                } else {
                    setCurrentColumnCount(columnCount);
                }
            };

            updateColumns();
            window.addEventListener("resize", updateColumns);
            return () => window.removeEventListener("resize", updateColumns);
        }, [columnCount]);

        // Distribute children into columns (round-robin distribution)
        const columns = useMemo(() => {
            const cols: ReactNode[][] = Array.from({ length: currentColumnCount }, () => []);

            Children.forEach(children, (child, index) => {
                if (isValidElement(child)) {
                    cols[index % currentColumnCount].push(child);
                }
            });
            return cols;
        }, [children, currentColumnCount]);

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
