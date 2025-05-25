"use client";
import * as motion from "motion/react-client";
import { ReactNode } from "react";

export const fadeUpVariant = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};

export const fadeDownVariant = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};

// Page transition component that wraps page content
export const PageTransition = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Layout animation wrapper (no AnimatePresence here as it's handled at route level)
const FadeUpAnimation = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-screen bg-background text-foreground antialiased transition-colors duration-200 flex flex-col items-center justify-between">
            {children}
        </div>
    );
};

export default FadeUpAnimation;
