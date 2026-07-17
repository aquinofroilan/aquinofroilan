<script lang="ts">
    import { marked } from 'marked';
    import DOMPurify from 'isomorphic-dompurify';

    let { content = '', class: className = '' } = $props<{ content: string; class?: string }>();
    
    let htmlContent = $derived(DOMPurify.sanitize(marked.parse(content) as string));
</script>

<div class="prose prose-sm dark:prose-invert max-w-none {className}">
    {@html htmlContent}
</div>
