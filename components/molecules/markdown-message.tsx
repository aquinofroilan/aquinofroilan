import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownMessageProps {
    content: string;
    className?: string;
}

export const MarkdownMessage = ({ content, className }: MarkdownMessageProps) => {
    return (
        <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Headings
                    h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-bold mt-2 mb-1.5">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>,
                    // Paragraphs
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    // Lists
                    ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    // Code
                    code: ({ className, children, ...props }: any) => {
                        // Block code elements have className like 'language-*', inline code doesn't
                        const isInline = !className?.startsWith("language-");
                        return isInline ? (
                            <code className="bg-muted/60 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className="text-xs font-mono" {...props}>
                                {children}
                            </code>
                        );
                    },
                    pre: ({ children }) => (
                        <pre className="bg-muted/60 p-2 rounded text-xs font-mono overflow-x-auto mb-2">{children}</pre>
                    ),
                    // Emphasis
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    // Links
                    a: ({ href, children }) => {
                        // Validate href to prevent XSS via javascript: or data: schemes
                        // Also prevent protocol-relative URLs like //evil.com
                        const isValidHref =
                            href &&
                            (href.startsWith("http://") ||
                                href.startsWith("https://") ||
                                (href.startsWith("/") && !href.startsWith("//")));
                        if (!isValidHref) {
                            return <span>{children}</span>;
                        }

                        const isExternal = href.startsWith("http://") || href.startsWith("https://");
                        return (
                            <a
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="text-primary hover:underline"
                            >
                                {children}
                            </a>
                        );
                    },
                    // Blockquote
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-muted-foreground/30 pl-3 italic my-2">
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
