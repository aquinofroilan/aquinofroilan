import { BentoGridItem } from "@/components/ui";
import { CredlyIcon, Github, HackerRank, Instagram, LinkedIn } from "@/components/atoms";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";

export const ContactMe = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 1,
            }}
            className={className}
        >
            <BentoGridItem
                className="w-full h-full"
                title={<h1 className="text-lg">Contact Me</h1>}
                icon={<Send size={15} />}
                description={
                    <div className="flex flex-col gap-5">
                        <div>
                            <h1>Email:</h1>
                            <div className="flex flex-col">
                                <Link
                                    className="underline underline-offset-1 font-bold"
                                    href="mailto:aquino.froilan.dev@outlook.com?subject=Contact%20from%20Website"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    aquino.froilan.dev@outlook.com
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h1>Social Links:</h1>
                            <div className="grid grid-cols-3 gap-2">
                                <Link
                                    className="border-1 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                    aria-label="Github link of the website owner"
                                    target="_blank"
                                    href="https://github.com/aquinofroilan"
                                >
                                    <Github />
                                </Link>
                                <Link
                                    className="border-1 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                    aria-label="Instagram Profile of the website owner"
                                    target="_blank"
                                    href="https://www.instagram.com/aquinofroilan_"
                                >
                                    <Instagram />
                                </Link>
                                <Link
                                    className="border-1 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                    aria-label="LinkedIn link of the website owner"
                                    target="_blank"
                                    href="https://linkedin.com/in/aquinofroilan"
                                >
                                    <LinkedIn />
                                </Link>
                                <Link
                                    className="border-1 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                    aria-label="Credly link of the website owner"
                                    target="_blank"
                                    href="https://www.credly.com/users/froilan"
                                >
                                    <CredlyIcon />
                                </Link>
                                <Link
                                    className="border-1 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                    aria-label="HackerRank link of the website owner"
                                    target="_blank"
                                    href="https://www.hackerrank.com/profile/froilanaquino"
                                >
                                    <HackerRank />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h1>Let&apos;s talk:</h1>
                            <Link
                                href="https://calendly.com/froilan/consultation"
                                className="border-1 w-full justify-between flex items-center py-2 px-2 rounded-md mt-2"
                            >
                                Schedule a call
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                        <div>
                            <h1>My Resume/CV:</h1>
                            <Link
                                href={
                                    "https://drive.google.com/file/d/1tBgDb_ft-XHI801KDlWLez21sBI48-AY/view?usp=sharing"
                                }
                                className="border-1 w-full justify-between flex items-center py-2 px-2 rounded-md mt-2"
                            >
                                View my CV
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                }
            />
        </motion.div>
    );
};
