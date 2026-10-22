"use client";

import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { CredlyIcon, Github, HackerRank, Instagram, LeetCode, LinkedIn } from "@/components/atoms";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";

const socials = [
    {
        href: "https://github.com/aquinofroilan",
        label: "GitHub",
        icon: <Github className="w-5 h-5" />,
    },
    {
        href: "https://www.instagram.com/aquinofroilan_",
        label: "Instagram",
        icon: <Instagram className="w-5 h-5" />,
    },
    {
        href: "https://linkedin.com/in/aquinofroilan",
        label: "LinkedIn",
        icon: <LinkedIn className="w-5 h-5" />,
    },
    {
        href: "https://www.credly.com/users/froilan",
        label: "Credly",
        icon: <CredlyIcon className="w-5 h-5" />,
    },
    {
        href: "https://www.hackerrank.com/profile/froilanaquino",
        label: "HackerRank",
        icon: <HackerRank className="w-5 h-5" />,
    },
    {
        href: "https://leetcode.com/u/froilan_/",
        label: "LeetCode",
        icon: <LeetCode className="w-5 h-5" />,
    },
];

export const ContactMe = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader index="07" title="Contact Me" tag="reach out" icon={<Send size={14} />} />

            <div className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none">
                        email
                    </span>
                    <Link
                        href="mailto:aquino.froilan.dev@outlook.com?subject=Contact%20from%20Website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-primary hover:underline underline-offset-2 transition-colors"
                    >
                        aquino.froilan.dev@outlook.com
                    </Link>
                </div>

                {/* Social links */}
                <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none">
                        social links
                    </span>
                    <div className="grid grid-cols-6 gap-1">
                        {socials.map((s) => (
                            <Tooltip key={s.label}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="flex items-center justify-center p-2 border border-border/30 hover:border-primary/40 hover:bg-muted/20 transition-all"
                                    >
                                        {s.icon}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span className="font-mono text-xs">{s.label}</span>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </div>

                {/* CTA links */}
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none">
                        let&apos;s talk
                    </span>
                    <Link
                        href="https://calendly.com/froilan/consultation"
                        className="group flex items-center justify-between border border-border/30 px-3 py-2 hover:border-primary/40 hover:bg-muted/20 transition-all"
                        aria-label="Schedule a consultation call via Calendly"
                    >
                        <span className="font-mono text-xs text-foreground">Schedule a call</span>
                        <ArrowRight
                            size={13}
                            className="text-muted-foreground transition-transform group-hover:translate-x-1"
                        />
                    </Link>

                    {process.env.RESUME_CV_LINK && (
                        <Link
                            href={process.env.RESUME_CV_LINK}
                            className="group flex items-center justify-between border border-border/30 px-3 py-2 hover:border-primary/40 hover:bg-muted/20 transition-all"
                            aria-label="View resume or CV document"
                        >
                            <span className="font-mono text-xs text-foreground">View my CV</span>
                            <ArrowRight
                                size={13}
                                className="text-muted-foreground transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
