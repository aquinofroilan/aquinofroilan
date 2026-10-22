"use client";

import { useActionState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { CredlyIcon, Github, HackerRank, Instagram, LeetCode, LinkedIn } from "@/components/atoms";
import { ArrowRight, Loader2, Mail, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { submitContactForm, type ContactFormState } from "@/actions/contact";

// ─── Socials ──────────────────────────────────────────────────────────────────

const SOCIALS = [
    { href: "https://github.com/aquinofroilan", label: "GitHub", icon: <Github className="w-4 h-4" /> },
    { href: "https://www.instagram.com/aquinofroilan_", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
    { href: "https://linkedin.com/in/aquinofroilan", label: "LinkedIn", icon: <LinkedIn className="w-4 h-4" /> },
    { href: "https://www.credly.com/users/froilan", label: "Credly", icon: <CredlyIcon className="w-4 h-4" /> },
    { href: "https://www.hackerrank.com/profile/froilanaquino", label: "HackerRank", icon: <HackerRank className="w-4 h-4" /> },
    { href: "https://leetcode.com/u/froilan_/", label: "LeetCode", icon: <LeetCode className="w-4 h-4" /> },
];

// ─── Field label ──────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none mb-1 block">
            {children}
        </span>
    );
}

// ─── Text input ───────────────────────────────────────────────────────────────

function TextInput({
    name,
    placeholder,
    required,
    type = "text",
}: {
    name: string;
    placeholder: string;
    required?: boolean;
    type?: string;
}) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className={cn(
                "w-full border border-border/40 bg-background px-3 py-2",
                "font-mono text-xs text-foreground placeholder:text-muted-foreground/40",
                "focus:outline-none focus:border-primary/60 focus:bg-primary/5",
                "transition-colors duration-150",
            )}
        />
    );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

const initialState: ContactFormState = { status: "idle" };

function ContactForm() {
    const [state, action, pending] = useActionState(submitContactForm, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === "success") {
            formRef.current?.reset();
        }
    }, [state.status]);

    return (
        <form ref={formRef} action={action} className="flex flex-col gap-3">
            {/* Row: name + company */}
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <FieldLabel>Name *</FieldLabel>
                    <TextInput name="name" placeholder="Froilan" required />
                </div>
                <div>
                    <FieldLabel>Company</FieldLabel>
                    <TextInput name="company" placeholder="Acme Inc." />
                </div>
            </div>

            {/* Email */}
            <div>
                <FieldLabel>Email Address *</FieldLabel>
                <TextInput name="email" type="email" placeholder="you@example.com" required />
            </div>

            {/* Message */}
            <div>
                <FieldLabel>Message *</FieldLabel>
                <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="I'd like to talk about..."
                    className={cn(
                        "w-full border border-border/40 bg-background px-3 py-2 resize-none",
                        "font-mono text-xs text-foreground placeholder:text-muted-foreground/40",
                        "focus:outline-none focus:border-primary/60 focus:bg-primary/5",
                        "transition-colors duration-150",
                    )}
                />
            </div>

            {/* Status */}
            {state.status !== "idle" && (
                <p
                    className={cn(
                        "font-mono text-[11px] border px-3 py-2",
                        state.status === "success"
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-destructive/40 bg-destructive/10 text-destructive",
                    )}
                >
                    {state.status === "success" ? "✓ " : "✕ "}
                    {state.message}
                </p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={pending || state.status === "success"}
                className={cn(
                    "flex items-center justify-center gap-2 border px-4 py-2",
                    "font-mono text-xs uppercase tracking-wider transition-all duration-150",
                    "border-primary/60 bg-primary/10 text-primary hover:bg-primary/20",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                )}
            >
                {pending ? (
                    <><Loader2 size={12} className="animate-spin" /> Sending…</>
                ) : (
                    <><Send size={12} /> Send Message</>
                )}
            </button>
        </form>
    );
}

// ─── Main card ────────────────────────────────────────────────────────────────

export const ContactMe = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader
                index="07"
                title="Get In Touch"
                tag="contact desk"
                icon={<Send size={14} />}
            />

            {/* 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">

                {/* ── Left pane: Direct channels ───────────────── */}
                <div className="flex flex-col gap-5 bg-card/60 pr-0 md:pr-5 pb-5 md:pb-0">

                    {/* Location */}
                    <div className="flex flex-col gap-1">
                        <FieldLabel>Location</FieldLabel>
                        <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                            <MapPin size={12} className="text-primary shrink-0" />
                            Caloocan City, Metro Manila, PH
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <FieldLabel>Direct Email</FieldLabel>
                        <Link
                            href="mailto:aquino.froilan.dev@outlook.com?subject=Contact%20from%20Website"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-xs text-primary hover:underline underline-offset-2 transition-colors"
                        >
                            <Mail size={12} className="shrink-0" />
                            aquino.froilan.dev@outlook.com
                        </Link>
                    </div>

                    {/* Social channels */}
                    <div className="flex flex-col gap-2">
                        <FieldLabel>Social Channels</FieldLabel>
                        <div className="grid grid-cols-6 gap-1">
                            {SOCIALS.map((s) => (
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

                    {/* Quick CTAs */}
                    <div className="flex flex-col gap-1 mt-auto">
                        <FieldLabel>Quick Links</FieldLabel>
                        <Link
                            href="https://calendly.com/froilan/consultation"
                            className="group flex items-center justify-between border border-border/30 px-3 py-2 hover:border-primary/40 hover:bg-muted/20 transition-all"
                        >
                            <span className="font-mono text-xs text-foreground">Schedule a call</span>
                            <ArrowRight size={12} className="text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </Link>
                        {process.env.RESUME_CV_LINK && (
                            <Link
                                href={process.env.RESUME_CV_LINK}
                                className="group flex items-center justify-between border border-border/30 px-3 py-2 hover:border-primary/40 hover:bg-muted/20 transition-all"
                            >
                                <span className="font-mono text-xs text-foreground">View my CV</span>
                                <ArrowRight size={12} className="text-muted-foreground transition-transform group-hover:translate-x-1" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* ── Right pane: Contact form ──────────────────── */}
                <div className="bg-card/60 pl-0 md:pl-5 pt-5 md:pt-0">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};
