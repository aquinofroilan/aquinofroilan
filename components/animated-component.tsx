"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export const fadeUpVariant = {
    initial: { opacity: 0, y: 100 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        y: -100,
        transition: {
            duration: 0.5,
        },
    },
};
const FadeUpAnimation = ({ children }: { children: ReactNode }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                variants={fadeUpVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full min-h-screen bg-background text-foreground antialiased transition-colors duration-200 dark:bg-background-dark dark:text-foreground-dark flex flex-col items-center justify-between"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default FadeUpAnimation;
