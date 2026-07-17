<script lang="ts">
    import { Rocket } from 'lucide-svelte';
    import * as Card from '$lib/components/ui/card';

    let { class: className = '' } = $props<{ class?: string }>();
</script>

<div class={className}>
    <Card.Root class="w-full h-full">
        <Card.Header>
            <Card.Title class="flex items-center gap-2">
                <Rocket size={15} />
                <span class="text-lg">Beyond Coding</span>
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-col gap-5">
                <p class="text-sm text-justify">
                    Beyond the IDE, I see myself as a problem solver and a lifelong learner. I believe that true
                    engineering excellence requires not just technical skill, but a holistic mindset that
                    embraces constant evolution.
                </p>
                <p class="text-sm text-justify">
                    To deepen my craft, I turn to foundational literature. I study classics like
                    <i>C Programming: A Modern Approach</i>, <i>Design Patterns</i>, and
                    <i>Java: The Complete Reference</i> to ground my modern development work in timeless
                    software engineering principles.
                </p>
                <p class="text-sm text-justify">
                    My growth isn't limited to technology. I actively cultivate productivity and emotional
                    intelligence through books like <i>Atomic Habits</i> and <i>Surrounded by Idiots</i>,
                    ensuring I bring both technical acuity and personal effectiveness to every team I join.
                </p>
            </div>
        </Card.Content>
    </Card.Root>
</div>
