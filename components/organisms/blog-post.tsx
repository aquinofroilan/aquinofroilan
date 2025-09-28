import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { type BlogPost } from '@/data/blog-posts';
import { Calendar, Clock, User, Tag } from 'lucide-react';

interface BlogPostComponentProps {
    post: BlogPost;
}

export const BlogPostComponent = ({ post }: BlogPostComponentProps) => {
    return (
        <article className="w-full max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 text-foreground">
                    {post.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6">
                    {post.description}
                </p>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{post.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{post.readingTime}</span>
                    </div>
                </div>
                
                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={16} className="text-muted-foreground" />
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </header>
            
            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                        // Custom components for better styling
                        h1: ({ children }) => (
                            <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground border-b border-border pb-2">
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-xl font-semibold mt-5 mb-2 text-foreground">
                                {children}
                            </h3>
                        ),
                        p: ({ children }) => (
                            <p className="mb-4 leading-7 text-foreground">
                                {children}
                            </p>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                                {children}
                            </blockquote>
                        ),
                        code: ({ inline, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            
                            if (!inline && match) {
                                return (
                                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                );
                            }
                            
                            return (
                                <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ children }) => (
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                                {children}
                            </pre>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-4 space-y-1 text-foreground">
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground">
                                {children}
                            </ol>
                        ),
                        li: ({ children }) => (
                            <li className="leading-7">
                                {children}
                            </li>
                        ),
                        a: ({ children, href }) => (
                            <a
                                href={href}
                                className="text-primary hover:text-primary/80 underline transition-colors"
                                target={href?.startsWith('http') ? '_blank' : undefined}
                                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                {children}
                            </a>
                        ),
                        hr: () => (
                            <hr className="my-8 border-border" />
                        ),
                        strong: ({ children }) => (
                            <strong className="font-semibold text-foreground">
                                {children}
                            </strong>
                        ),
                        em: ({ children }) => (
                            <em className="italic">
                                {children}
                            </em>
                        ),
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
};