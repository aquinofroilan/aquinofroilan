export interface PipelineNode {
    id: string;
    label: string;
    type: "trigger" | "process" | "ai" | "output";
}

export interface PipelineEdge {
    from: string;
    to: string;
}

export interface Workflow {
    id: string;
    title: string;
    tag: string;
    description: string;
    nodes: PipelineNode[];
    edges: PipelineEdge[];
}

export const WORKFLOWS: Workflow[] = [
    {
        id: "ai-search",
        title: "AI Search Pipeline",
        tag: "production · salesperson inc.",
        description:
            "Orchestrates user queries through semantic retrieval, re-ranking, and LLM synthesis to deliver accurate product search results.",
        nodes: [
            { id: "query", label: "User Query", type: "trigger" },
            { id: "embed", label: "Embed & Index", type: "process" },
            { id: "retrieve", label: "Vector Retrieve", type: "process" },
            { id: "rerank", label: "Re-Rank", type: "ai" },
            { id: "llm", label: "LLM Synthesis", type: "ai" },
            { id: "result", label: "Search Result", type: "output" },
        ],
        edges: [
            { from: "query", to: "embed" },
            { from: "embed", to: "retrieve" },
            { from: "retrieve", to: "rerank" },
            { from: "rerank", to: "llm" },
            { from: "llm", to: "result" },
        ],
    },
    {
        id: "dev-workflow",
        title: "AI-Augmented Dev Loop",
        tag: "personal workflow",
        description:
            "Personal engineering loop leveraging AI tooling for spec generation, code review, and automated test scaffolding.",
        nodes: [
            { id: "spec", label: "Spec / Issue", type: "trigger" },
            { id: "plan", label: "AI Planning", type: "ai" },
            { id: "code", label: "Implementation", type: "process" },
            { id: "review", label: "AI Code Review", type: "ai" },
            { id: "test", label: "Test Scaffold", type: "process" },
            { id: "deploy", label: "CI / Deploy", type: "output" },
        ],
        edges: [
            { from: "spec", to: "plan" },
            { from: "plan", to: "code" },
            { from: "code", to: "review" },
            { from: "review", to: "test" },
            { from: "test", to: "deploy" },
        ],
    },
    {
        id: "data-pipeline",
        title: "ETL Data Pipeline",
        tag: "backend · postgresql",
        description:
            "Extracts raw data from external APIs, transforms and validates records, then loads cleaned datasets into PostgreSQL for analytics.",
        nodes: [
            { id: "source", label: "API Source", type: "trigger" },
            { id: "extract", label: "Extract", type: "process" },
            { id: "validate", label: "Validate", type: "process" },
            { id: "transform", label: "Transform", type: "ai" },
            { id: "load", label: "Load to DB", type: "process" },
            { id: "report", label: "Analytics", type: "output" },
        ],
        edges: [
            { from: "source", to: "extract" },
            { from: "extract", to: "validate" },
            { from: "validate", to: "transform" },
            { from: "transform", to: "load" },
            { from: "load", to: "report" },
        ],
    },
];
