"use client";

import * as motion from "motion/react-client";
import { ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export const FadeIn = ({ children, delay = 0, className }: FadeInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
