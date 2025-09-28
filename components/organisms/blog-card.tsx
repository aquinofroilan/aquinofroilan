import Link from 'next/link';
import { type BlogPost } from '@/data/blog-posts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import * as motion from "motion/react-client";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.1,
            }}
            className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200"
        >
            <div className="space-y-4">
                {/* Header */}
                <div>
                    <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-muted-foreground mt-2 line-clamp-2">
                        {post.description}
                    </p>
                </div>
                
                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readingTime}</span>
                    </div>
                </div>
                
                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                    {post.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                            +{post.tags.length - 3} more
                        </span>
                    )}
                </div>
                
                {/* Read more link */}
                <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium group/link transition-colors"
                >
                    <span>Read more</span>
                    <ArrowRight 
                        size={14} 
                        className="group-hover/link:translate-x-1 transition-transform" 
                    />
                </Link>
            </div>
        </motion.article>
    );
};