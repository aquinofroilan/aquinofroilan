"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header";
import { Workflow as WorkflowIcon, Play, RotateCcw, ChevronRight } from "lucide-react";
import { WORKFLOWS, type Workflow, type PipelineNode } from "@/data/workflows-list";

// ─── Node type styles ─────────────────────────────────────────────────────────

const NODE_STYLES: Record<PipelineNode["type"], string> = {
    trigger:
        "border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    process:
        "border-border/60 bg-muted/20 text-foreground",
    ai: "border-primary/60 bg-primary/10 text-primary",
    output:
        "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const NODE_TYPE_LABEL: Record<PipelineNode["type"], string> = {
    trigger: "TRIGGER",
    process: "PROC",
    ai: "AI",
    output: "OUTPUT",
};

// ─── Single pipeline node ────────────────────────────────────────────────────

function PipelineNodeBox({
    node,
    isActive,
    isDone,
    isNext,
}: {
    node: PipelineNode;
    isActive: boolean;
    isDone: boolean;
    isNext: boolean;
}) {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center border px-2 py-2 min-w-[80px] transition-all duration-300 font-mono",
                NODE_STYLES[node.type],
                isActive && "ring-1 ring-primary scale-105 shadow-sm",
                isDone && "opacity-100",
                !isActive && !isDone && !isNext && "opacity-40",
                isNext && "opacity-70",
            )}
        >
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60 select-none mb-0.5">
                {NODE_TYPE_LABEL[node.type]}
            </span>
            <span className="text-[11px] font-semibold text-center leading-tight">{node.label}</span>
            {isDone && (
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[7px] text-primary-foreground font-bold">✓</span>
                </span>
            )}
        </div>
    );
}

// ─── Edge arrow ───────────────────────────────────────────────────────────────

function EdgeArrow({ active }: { active: boolean }) {
    return (
        <ChevronRight
            size={14}
            className={cn(
                "shrink-0 transition-colors duration-300",
                active ? "text-primary" : "text-border/60",
            )}
        />
    );
}

// ─── Pipeline simulator ───────────────────────────────────────────────────────

function PipelineSimulator({ workflow }: { workflow: Workflow }) {
    const [activeStep, setActiveStep] = useState<number>(-1);
    const [running, setRunning] = useState(false);
    const nodeCount = workflow.nodes.length;

    const reset = useCallback(() => {
        setActiveStep(-1);
        setRunning(false);
    }, []);

    const run = useCallback(() => {
        if (running) return;
        setActiveStep(0);
        setRunning(true);
    }, [running]);

    useEffect(() => {
        if (!running || activeStep < 0) return;
        if (activeStep >= nodeCount) {
            setRunning(false);
            return;
        }
        const timer = setTimeout(() => setActiveStep((s) => s + 1), 600);
        return () => clearTimeout(timer);
    }, [running, activeStep, nodeCount]);

    const isDone = (i: number) => activeStep > i;
    const isActive = (i: number) => activeStep === i;
    const isNext = (i: number) => activeStep === i - 1;
    const finished = activeStep >= nodeCount && !running;

    return (
        <div className="flex flex-col gap-3">
            {/* Pipeline row */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                {workflow.nodes.map((node, i) => (
                    <div key={node.id} className="flex items-center gap-1 shrink-0">
                        <PipelineNodeBox
                            node={node}
                            isActive={isActive(i)}
                            isDone={isDone(i)}
                            isNext={isNext(i)}
                        />
                        {i < workflow.nodes.length - 1 && (
                            <EdgeArrow active={isDone(i)} />
                        )}
                    </div>
                ))}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between border border-border/30 px-3 py-1.5 bg-muted/10">
                <span className="font-mono text-[10px] text-muted-foreground">
                    {activeStep < 0 && "▸ idle — press run to simulate"}
                    {running && activeStep < nodeCount && (
                        <>
                            <span className="text-primary animate-pulse">●</span>
                            {" "}running · step {activeStep + 1}/{nodeCount} · {workflow.nodes[activeStep]?.label}
                        </>
                    )}
                    {finished && (
                        <span className="text-emerald-500 dark:text-emerald-400">✓ pipeline complete</span>
                    )}
                </span>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={reset}
                        disabled={activeStep < 0}
                        className="p-1 border border-border/40 hover:border-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Reset pipeline"
                    >
                        <RotateCcw size={11} />
                    </button>
                    <button
                        onClick={run}
                        disabled={running}
                        className="flex items-center gap-1 px-2 py-1 border border-primary/60 bg-primary/10 hover:bg-primary/20 text-primary font-mono text-[10px] uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Run pipeline simulation"
                    >
                        <Play size={10} />
                        Run
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main card ────────────────────────────────────────────────────────────────

export function WorkflowsCard({ className }: { className?: string }) {
    const [selected, setSelected] = useState<Workflow>(WORKFLOWS[0]);

    return (
        <div className={cn("relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className)}>
            {/* corner brackets */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader
                index="08"
                title="Workflows"
                tag="pipeline simulator"
                icon={<WorkflowIcon size={14} />}
            />

            {/* Workflow selector tabs */}
            <div className="flex gap-1 mb-4 flex-wrap">
                {WORKFLOWS.map((wf) => (
                    <button
                        key={wf.id}
                        onClick={() => setSelected(wf)}
                        className={cn(
                            "font-mono text-[10px] uppercase tracking-wider px-2 py-1 border transition-all",
                            selected.id === wf.id
                                ? "border-primary/60 bg-primary/10 text-primary"
                                : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground",
                        )}
                    >
                        {wf.title}
                    </button>
                ))}
            </div>

            {/* Active workflow meta */}
            <div className="mb-4 flex flex-col gap-1">
                <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest select-none">
                    {selected.tag}
                </span>
                <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                    {selected.description}
                </p>
            </div>

            {/* Legend */}
            <div className="flex gap-3 mb-4 flex-wrap">
                {(["trigger", "ai", "process", "output"] as PipelineNode["type"][]).map((t) => (
                    <span key={t} className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                        <span className={cn("inline-block w-2 h-2 border", NODE_STYLES[t])} />
                        {NODE_TYPE_LABEL[t]}
                    </span>
                ))}
            </div>

            {/* Simulator — key forces remount on workflow change to reset state */}
            <PipelineSimulator key={selected.id} workflow={selected} />
        </div>
    );
}
