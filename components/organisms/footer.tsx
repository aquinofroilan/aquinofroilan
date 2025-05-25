import { ThemeToggler } from "@/components/atoms";
import { Separator } from "@/components/ui";
import * as motion from "motion/react-client";

export const Footer = () => {
    return (
        <>
            <footer className="pt-3 flex flex-col items-center justify-between w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1,
                    }}
                    className="w-full"
                >
                    <Separator className="w-full max-w-5xl" />
                    <div className="flex flex-row items-center justify-between w-full py-5">
                        <p className="text-xs md:text-sm ml-3">
                            © {new Date().getFullYear()} Froilan Aquino. All rights reserved.
                        </p>
                        <ThemeToggler />
                    </div>
                </motion.div>
            </footer>
        </>
    );
};
