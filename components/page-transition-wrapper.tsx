"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface PageTransitionWrapperProps {
    children: ReactNode;
}

export const PageTransitionWrapper = ({ children }: PageTransitionWrapperProps) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
