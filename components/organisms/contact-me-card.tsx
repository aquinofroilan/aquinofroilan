import { Card, CardHeader, CardTitle, CardContent, Tooltip, TooltipContent, TooltipTrigger, Separator } from "@/components/ui";
import { CredlyIcon, Github, HackerRank, Instagram, LeetCode, LinkedIn } from "@/components/atoms";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";

export const ContactMe = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Send size={15} />
                        <span className="text-lg">Contact Me</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link
                                            className="w-full justify-center flex items-center py-2 px-2 rounded-md hover:bg-muted transition-colors"
                                            aria-label="Github link of the website owner"
                                            target="_blank"
                                            href="https://github.com/aquinofroilan"
                                        >
                                            <Github className="w-5 h-5" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>GitHub</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link
                                            className="w-full justify-center flex items-center py-2 px-2 rounded-md hover:bg-muted transition-colors"
                                            aria-label="Instagram Profile of the website owner"
                                            target="_blank"
                                            href="https://www.instagram.com/aquinofroilan_"
                                        >
                                            <Instagram className="w-5 h-5" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Instagram</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link
                                            className="w-full justify-center flex items-center py-2 px-2 rounded-md hover:bg-muted transition-colors"
                                            aria-label="LinkedIn link of the website owner"
                                            target="_blank"
                                            href="https://linkedin.com/in/aquinofroilan"
                                        >
                                            <LinkedIn className="w-5 h-5" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>LinkedIn</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link
                                            className="w-full justify-center flex items-center py-2 px-2 rounded-md hover:bg-muted transition-colors"
                                            aria-label="Credly link of the website owner"
                                            target="_blank"
                                            href="https://www.credly.com/users/froilan"
                                        >
                                            <CredlyIcon className="w-5 h-5" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Credly</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link
                                            className="w-full justify-center flex items-center py-2 px-2 rounded-md hover:bg-muted transition-colors"
                                            aria-label="HackerRank link of the website owner"
                                            target="_blank"
                                            href="https://www.hackerrank.com/profile/froilanaquino"
                                        >
                                            <HackerRank className="w-5 h-5" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>HackerRank</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link
                                            className="w-full justify-center flex items-center py-2 px-2 rounded-md hover:bg-muted transition-colors"
                                            aria-label="LeetCode link of the website owner"
                                            target="_blank"
                                            href="https://leetcode.com/u/froilan_/"
                                        >
                                            <LeetCode className="w-5 h-5" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>LeetCode</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <h1>Let&apos;s talk:</h1>
                            <Link
                                href="https://calendly.com/froilan/consultation"
                                className="group w-full justify-between flex items-center py-2 px-2 rounded-md mt-2 hover:bg-muted transition-colors"
                            >
                                Schedule a call
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                        <div>
                            <h1>My Resume/CV:</h1>
                            <Link
                                href={process.env.RESUME_CV_LINK as string}
                                className="group w-full justify-between flex items-center py-2 px-2 rounded-md mt-2 hover:bg-muted transition-colors"
                            >
                                View my CV
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
