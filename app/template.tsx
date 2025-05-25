"use client";

import { ReactNode } from "react";
import * as motion from "motion/react-client";

export default function Template({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}
