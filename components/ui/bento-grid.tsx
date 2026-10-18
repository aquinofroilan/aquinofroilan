import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const BentoGrid = ({ className, children }: { className?: string; children?: ReactNode }) => {
    return (
        <div className={cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3", className)}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | ReactNode;
    description?: string | ReactNode;
    header?: ReactNode;
    icon?: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-md dark:border-white/[0.2] dark:bg-black dark:shadow-none",
                className,
            )}
        >
            {header}
            <div>
                <div className="mt-2 mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-200 flex flex-row gap-2 items-center">
                    {icon}
                    {title}
                </div>
                <div className="text-xs font-normal text-neutral-800 dark:text-neutral-300">{description}</div>
            </div>
        </div>
    );
};
