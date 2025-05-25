"use client";
import type { ReactNode } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const AnimationTemplate = ({ children }: { children: ReactNode }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
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

export default AnimationTemplate;
