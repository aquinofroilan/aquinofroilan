<script lang="ts">
    import { PartyPopper } from 'lucide-svelte';
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';

    let { class: className = '' } = $props<{ class?: string }>();

    function parseFlexibleDate(str: string): Date {
        const trimmed = str.trim();
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
            const [day, month, year] = trimmed.split("/");
            return new Date(`${year}-${month}-${day}`);
        }
        if (/^\d{2}\/\d{4}$/.test(trimmed)) return new Date(`${trimmed.split("/")[1]}-${trimmed.split("/")[0]}-01`);
        return new Date(trimmed);
    }

    function getDuration(year: string): string | null {
        const match = year.match(/^(.+?)\s*-\s*(.+)$/);
        if (!match) return null;

        const start = parseFlexibleDate(match[1]);
        const end = match[2].trim().toLowerCase() === "present" ? new Date() : parseFlexibleDate(match[2]);

        const diffMs = end.getTime() - start.getTime();
        if (diffMs < 0) return null;

        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365);
        const remaining = totalDays % 365;
        const months = Math.floor(remaining / 30);
        const days = remaining % 30;

        const parts = [];
        if (years > 0) parts.push(`${years}y`);
        if (months > 0) parts.push(`${months}mo`);
        if (days > 0) parts.push(`${days}d`);

        return parts.length > 0 ? parts.join(" ") : "< 1d";
    }

    const milestones = [
        {
            year: "29/09/2025 - Present",
            title: "Frontend Developer",
            description: "Hired as Frontend Developer at Journey Better Business Group Inc.",
            badge: "Full time",
        },
        {
            year: "05/2025",
            title: "Bachelor's Degree & Academic Excellence",
            description: "Graduated with a degree in Information Technology. Awarded Best in Capstone and Practicum.",
            badge: "Education",
        },
        {
            year: "22/01/2025 - 07/05/2025",
            title: "Web Development Internship",
            description: "Internship as web developer at Ishkaster Media",
            badge: "Internship",
        },
        {
            year: "11/2023",
            title: "IT Olympics 2023 | Quiz Bee Participant",
            description: "Quiz Bee University of Makati — Theme: \"The IT Innovators' Gauntlet: Forging Ahead the Future of Technology\"",
            badge: "Competition",
        },
        {
            year: "10/2020",
            title: "Humble Beginnings",
            description: "Wrote my first line of code",
            badge: "Beginning",
        },
    ];
</script>

<div class={className}>
    <Card.Root class="w-full h-full">
        <Card.Header>
            <Card.Title class="flex items-center gap-2">
                <PartyPopper size={15} />
                <span class="text-lg">My Journey</span>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="relative pl-8 mt-4">
                <div class="absolute left-0 top-1 bottom-8 w-0.5 bg-gradient-to-t to-primary/80 from-primary/20 rounded-full"></div>
                <div class="space-y-8">
                    {#each milestones as milestone}
                        {@const duration = getDuration(milestone.year)}
                        <div class="relative group">
                            <div class="absolute -left-2 top-1 w-3 h-3 rounded-full bg-transparent border-primary border-2 group-hover:bg-primary transition-colors"></div>
                            <div class="pb-2 pl-3">
                                <Badge variant="outline" class="text-xs py-0">
                                    {duration ? `${milestone.year} | ${duration}` : milestone.year}
                                </Badge>
                                <Badge variant="secondary" class="ml-2 text-xs py-0">
                                    {milestone.badge}
                                </Badge>
                            </div>
                            <div>
                                <h3 class="text-base font-medium">{milestone.title}</h3>
                                <p class="text-sm text-muted-foreground mt-1">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div>
