import Me from "@/public/images/me.webp";
import Image from "next/image";
import Link from "next/link";
import {
    BadgeCheckIcon,
    GitCommitVertical,
    GitPullRequest,
    CircleDot,
    Star,
    MapPin,
    Phone,
    Mail,
    Terminal,
    Code2,
    Cpu,
} from "lucide-react";
import { Button } from "@/components/ui";
import { getGithubStats } from "@/actions";
import { cn } from "@/lib/utils";

// ─── Column wrapper ─────────────────────────────────────────────────────────

function HeroColumn({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div
            className={cn(
                "relative flex flex-col gap-4 border border-border/60 bg-card/60 p-5 backdrop-blur-xs",
                className,
            )}
        >
            {children}
        </div>
    );
}

// ─── Corner bracket decoration ───────────────────────────────────────────────

function CornerBrackets() {
    return (
        <>
            {/* top-left */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            {/* top-right */}
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            {/* bottom-left */}
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            {/* bottom-right */}
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
        </>
    );
}

// ─── Column label tag ────────────────────────────────────────────────────────

function ColumnTag({ label }: { label: string }) {
    return (
        <span className="absolute -top-px left-4 -translate-y-1/2 bg-background px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none">
            {label}
        </span>
    );
}

// ─── Stat item ───────────────────────────────────────────────────────────────

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="flex flex-col items-center gap-0.5 font-mono text-xs text-muted-foreground">
            {icon}
            <span className="font-semibold text-foreground">{value}</span>
            <span className="uppercase tracking-wider text-[10px]">{label}</span>
        </div>
    );
}

// ─── Main component ──────────────────────────────────────────────────────────

export const HeroSection = async ({ className }: { className?: string }) => {
    let githubStats: Awaited<ReturnType<typeof getGithubStats>> | null = null;
    try {
        githubStats = await getGithubStats();
    } catch {
        githubStats = null;
    }

    const stack = [
        { icon: <Terminal size={13} />, label: "Next.js · React · TypeScript" },
        { icon: <Code2 size={13} />, label: "Spring Boot · Python · Flask" },
        { icon: <Cpu size={13} />, label: "PostgreSQL · Supabase · AI/LLM" },
    ];

    return (
        <section className={cn("w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30", className)}>
            {/* ── Col 1 · Identity ─────────────────────────────── */}
            <HeroColumn className="items-start">
                <CornerBrackets />
                <ColumnTag label="// identity" />

                <div className="flex items-center gap-3 pt-2">
                    <Image
                        priority
                        src={Me}
                        quality={80}
                        width={64}
                        height={64}
                        placeholder="blur"
                        alt="Froilan Aquino"
                        className="rounded-none border border-border object-cover"
                    />
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                            <h1 className="font-mono font-bold tracking-tight text-base uppercase">Froilan Aquino</h1>
                            <BadgeCheckIcon size={14} color="#0087ED" />
                        </div>
                        <p className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPin size={11} />
                            Caloocan City · MNL · PH
                        </p>
                    </div>
                </div>

                <div className="w-full border-t border-border/40 pt-3 font-mono text-xs text-muted-foreground space-y-1">
                    <p>
                        <span className="text-primary">role</span>
                        <span className="text-muted-foreground/50 mx-1">=</span>
                        <span className="text-foreground">
                            &quot;{process.env.CURRENT_TITLE ?? "Software Engineer"}&quot;
                        </span>
                    </p>
                    <p>
                        <span className="text-primary">org</span>
                        <span className="text-muted-foreground/50 mx-1">=</span>
                        <span className="text-foreground">&quot;{process.env.CURRENT_COMPANY ?? "—"}&quot;</span>
                    </p>
                    <p>
                        <span className="text-primary">location</span>
                        <span className="text-muted-foreground/50 mx-1">=</span>
                        <span className="text-foreground">
                            &quot;{process.env.CURRENT_WORK_LOCATION ?? "Philippines"}&quot;
                        </span>
                    </p>
                </div>

                <div className="mt-auto pt-3 flex flex-row gap-2 w-full">
                    <Button className="flex-1 rounded-none font-mono text-xs" size="sm" asChild>
                        <Link href={process.env.SCHEDULE_A_CALL_URL as string} target="_blank">
                            <Phone size={12} className="hidden sm:block" />
                            Schedule a call
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-none font-mono text-xs" size="sm" asChild>
                        <Link href={process.env.SEND_EMAIL_URL as string} target="_blank" rel="noopener noreferrer">
                            <Mail size={12} className="hidden sm:block" />
                            Send email
                        </Link>
                    </Button>
                </div>
            </HeroColumn>

            {/* ── Col 2 · Stack ────────────────────────────────── */}
            <HeroColumn>
                <CornerBrackets />
                <ColumnTag label="// stack" />

                <div className="pt-2 space-y-3">
                    {stack.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 font-mono text-xs text-muted-foreground border border-border/40 px-3 py-2 bg-muted/20"
                        >
                            <span className="text-primary shrink-0">{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-auto border-t border-border/40 pt-3 font-mono text-[11px] text-muted-foreground space-y-1">
                    <p className="flex gap-2">
                        <span className="text-muted-foreground/50 select-none">▸</span>
                        B.S. Information Technology · 2025
                    </p>
                    <p className="flex gap-2">
                        <span className="text-muted-foreground/50 select-none">▸</span>
                        Best in Capstone &amp; Practicum awardee
                    </p>
                    <p className="flex gap-2">
                        <span className="text-muted-foreground/50 select-none">▸</span>
                        AI-augmented engineering workflows
                    </p>
                </div>
            </HeroColumn>

            {/* ── Col 3 · GitHub metrics ───────────────────────── */}
            <HeroColumn>
                <CornerBrackets />
                <ColumnTag label="// metrics" />

                {githubStats ? (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <StatItem icon={<Star size={14} />} label="stars" value={githubStats.stars} />
                        <StatItem
                            icon={<GitPullRequest size={14} />}
                            label="pull requests"
                            value={githubStats.pullRequests}
                        />
                        <StatItem icon={<CircleDot size={14} />} label="issues" value={githubStats.issues} />
                        <StatItem icon={<GitCommitVertical size={14} />} label="commits" value={githubStats.commits} />
                    </div>
                ) : (
                    <p className="font-mono text-xs text-muted-foreground pt-2">— github stats unavailable —</p>
                )}

                <div className="mt-auto border-t border-border/40 pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    <p>
                        Frontend-first fullstack engineer. Currently building AI-powered search infrastructure and
                        client-facing developer tooling.
                    </p>
                </div>
            </HeroColumn>
        </section>
    );
};
