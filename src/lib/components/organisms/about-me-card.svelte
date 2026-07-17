<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { ContactRound } from 'lucide-svelte';
    
    let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
    <Card.Root class="w-full h-full">
        <Card.Header>
            <Card.Title class="flex items-center gap-2">
                <ContactRound size={15} />
                <span class="text-lg">About Me</span>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="w-full flex flex-col gap-3">
                <p class="text-sm text-justify">
                    I am a <b>Frontend Developer</b> at <b>Journey Better Business Group Inc.</b>, passionate
                    about crafting scalable and sophisticated applications. While I have a strong command of the
                    JavaScript/TypeScript ecosystem (React, Next.js), my expertise extends to backend
                    development with Java (Spring Boot) and Python (Flask), utilizing robust database solutions
                    like PostgreSQL and Supabase.
                </p>
                <p class="text-sm text-justify">
                    I hold a <b>Bachelor's degree in Information Technology (2025)</b>. My approach to
                    engineering is deeply self-directed; I leverage AI-augmented workflows and continuous
                    learning resources to solve complex problems and accelerate development, ensuring I stay at
                    the forefront of industry trends.
                </p>
                <p class="text-sm text-justify">
                    I believe great software requires great usability. My growing proficiency in
                    <b>UI/UX design</b>
                    and tools like Figma allows me to bridge the gap between technical functionality and
                    intuitive user experiences.
                </p>
                <p class="text-sm text-justify">
                    Currently, I am expanding my technical horizons by diving into system-level programming with
                    <b> C</b> and <b>Go</b>. This pursuit aims to deepen my understanding of low-level
                    operations, memory management, and advanced Data Structures and Algorithms, enabling me to
                    write more efficient and optimized code.
                </p>
            </div>
        </Card.Content>
    </Card.Root>
</div>
