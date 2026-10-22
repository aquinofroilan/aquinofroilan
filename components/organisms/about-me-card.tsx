import { cn } from "@/lib/utils"
import { BlueprintSectionHeader } from "@/components/ui/blueprint-section-header"
import { ContactRound } from "lucide-react"

export const AboutCard = ( { className }: { className?: string } ) =>
{
    return (
        <div className={ cn( "relative border border-border/60 bg-card/60 p-5 backdrop-blur-xs", className ) }>
            {/* corner brackets */ }
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />

            <BlueprintSectionHeader
                index="01"
                title="About Me"
                tag="professional bio"
                icon={ <ContactRound size={ 14 } /> }
            />

            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                    I am an <span className="font-semibold text-foreground">AI Developer</span> at{ " " }
                    <span className="font-semibold text-foreground">Salesperson Inc.</span> passionate about crafting
                    scalable, production-grade applications. My core is the JavaScript/TypeScript ecosystem (React,
                    Next.js), but my work now spans the full stack: I build multi-tenant SaaS products on Vercel with
                    shared authentication (Clerk), backed by Python services (Flask, FastAPI) and PostgreSQL databases
                    such as Neon and Supabase. I also have experience with Java (Spring Boot).
                </p>
                <p>
                    A growing part of my work is at the intersection of AI and data. I build AI chatbots and
                    data-grounded assistants, and I design the pipelines behind them: automations in n8n and Google
                    APIs, plus read-only syncs from ERP and CRM systems (Odoo, Epicor, HubSpot) into Postgres. I care
                    about the unglamorous reliability details, such as incremental imports instead of full reloads,
                    structured inputs instead of LLM-generated guesses, and deterministic lookups where hallucination is
                    a risk.
                </p>
                <p>
                    My approach to engineering is self-directed; I use AI-augmented workflows and continuous learning to
                    solve complex problems and accelerate development.
                </p>
                <p>
                    Currently expanding my horizons into{ " " }
                    <span className="font-semibold text-foreground">C and Rust</span> to deepen my understanding of
                    low-level operations, memory management, and advanced DSA.
                </p>
            </div>
        </div>
    )
}
