export interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    tags: string[];
    author: string;
    readingTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "hello-world",
        title: "Hello World: Welcome to My Blog",
        description: "This is my first blog post where I introduce myself and share what you can expect from this blog.",
        publishedAt: "2024-01-15",
        tags: ["introduction", "personal", "web-development"],
        author: "Froilan Aquino",
        readingTime: "3 min read",
        content: `# Hello World: Welcome to My Blog

Welcome to my personal blog! I'm **Froilan Aquino**, a software engineer based in Caloocan City, Philippines, and I'm excited to share my journey, insights, and experiences with you.

## What You Can Expect

This blog will be a space where I share:

- **Technical tutorials** and deep dives into web development
- **Project showcases** and lessons learned
- **Industry insights** and emerging technology trends
- **Personal growth** stories and career reflections

## My Technical Journey

As a passionate web developer, I work primarily with:

\`\`\`javascript
// My favorite stack
const techStack = {
  frontend: ['React', 'Next.js', 'TypeScript'],
  backend: ['Node.js', 'Python', 'Java'],
  database: ['PostgreSQL', 'MongoDB', 'SQLite'],
  tools: ['Git', 'Docker', 'Vercel']
};

console.log('Always learning something new!');
\`\`\`

## Why I Started This Blog

> "The best way to learn is to teach others"

I believe in the power of sharing knowledge and building community. This blog is my way of:

1. **Documenting my learning** - Writing helps solidify concepts
2. **Helping others** - Sharing solutions to problems I've encountered  
3. **Building connections** - Meeting like-minded developers and learners
4. **Improving communication** - Getting better at explaining technical concepts

## Stay Connected

Feel free to reach out to me through:

- [LinkedIn](https://linkedin.com/in/aquinofroilan)
- [Email](mailto:aquino.froilan.dev@outlook.com)
- [Schedule a call](https://calendly.com/froilan/consultation)

Thank you for joining me on this journey. I'm looking forward to sharing more content with you soon!

---

*This blog is built with Next.js, TypeScript, and Tailwind CSS. You can find the source code on my [GitHub](https://github.com/aquinofroilan).*`
    },
    {
        id: "react-best-practices",
        title: "React Best Practices for Modern Development",
        description: "Essential React patterns and practices that every developer should know in 2024.",
        publishedAt: "2024-01-20",
        tags: ["react", "best-practices", "javascript", "frontend"],
        author: "Froilan Aquino",
        readingTime: "8 min read",
        content: `# React Best Practices for Modern Development

React continues to evolve, and with it, the best practices for building maintainable and performant applications. Here are some essential practices I've learned through experience and continuous learning.

## 1. Component Design Principles

### Keep Components Small and Focused

\`\`\`tsx
// ❌ Bad: Too many responsibilities
const UserProfile = () => {
  // Handles user data, notifications, settings, etc.
  // 200+ lines of code
};

// ✅ Good: Single responsibility
const UserAvatar = ({ user }) => (
  <img src={user.avatar} alt={user.name} />
);

const UserInfo = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);
\`\`\`

## 2. State Management

### Use the Right Tool for the Job

- **useState** for local component state
- **useReducer** for complex state logic
- **Context** for theme, auth, or widely shared state
- **External libraries** (Zustand, Redux) for global app state

\`\`\`tsx
// ✅ Good: Local state for simple data
const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
};
\`\`\`

## 3. Performance Optimization

### Memoization Strategies

\`\`\`tsx
// ✅ Memoize expensive calculations
const ExpensiveComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  return <div>Total: {expensiveValue}</div>;
};

// ✅ Memoize event handlers
const TodoItem = ({ todo, onToggle }) => {
  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  return (
    <div onClick={handleToggle}>
      {todo.text}
    </div>
  );
};
\`\`\`

## 4. Error Boundaries

Always implement error boundaries to catch and handle errors gracefully:

\`\`\`tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
\`\`\`

## 5. Testing Best Practices

### Focus on User Behavior

\`\`\`tsx
// ✅ Test what users do, not implementation details
test('should add item to cart when button is clicked', () => {
  render(<ProductCard product={mockProduct} />);
  
  const addButton = screen.getByRole('button', { name: /add to cart/i });
  fireEvent.click(addButton);
  
  expect(screen.getByText('Added to cart')).toBeInTheDocument();
});
\`\`\`

## Key Takeaways

1. **Favor composition over inheritance**
2. **Keep components pure when possible**
3. **Use TypeScript for better developer experience**
4. **Implement proper error handling**
5. **Test user workflows, not implementation**
6. **Profile performance before optimizing**

## Resources for Continued Learning

- [React Documentation](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Testing Library](https://testing-library.com/)

---

What React practices have you found most valuable? I'd love to hear your thoughts and experiences!`
    },
    {
        id: "nextjs-performance-tips",
        title: "Next.js Performance Optimization Tips",
        description: "Learn how to make your Next.js applications faster with these performance optimization techniques.",
        publishedAt: "2024-01-25",
        tags: ["nextjs", "performance", "optimization", "web-development"],
        author: "Froilan Aquino", 
        readingTime: "6 min read",
        content: `# Next.js Performance Optimization Tips

Next.js provides many built-in optimizations, but there are additional techniques you can use to make your applications even faster. Here are some practical tips I've learned.

## 1. Image Optimization

Next.js's Image component is incredibly powerful:

\`\`\`tsx
import Image from 'next/image';

// ✅ Use Next.js Image component
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Better loading experience
/>
\`\`\`

## 2. Dynamic Imports and Code Splitting

### Lazy Load Components

\`\`\`tsx
import dynamic from 'next/dynamic';

// ✅ Dynamic import for heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false // Client-side only if needed
});

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <HeavyChart />
  </div>
);
\`\`\`

### Route-based Code Splitting

Next.js automatically splits code by routes, but you can optimize further:

\`\`\`tsx
// pages/admin/index.tsx
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('../../components/AdminPanel'), {
  ssr: false
});

export default function AdminPage() {
  return <AdminPanel />;
}
\`\`\`

## 3. Font Optimization

### Using next/font

\`\`\`tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Better loading experience
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## 4. API Route Optimization

### Edge Runtime for Simple APIs

\`\`\`tsx
// pages/api/hello.ts
export const config = {
  runtime: 'edge',
}

export default function handler(req: Request) {
  return new Response(
    JSON.stringify({ message: 'Hello from the edge!' }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  )
}
\`\`\`

### Caching API Responses

\`\`\`tsx
// app/api/posts/route.ts
export async function GET() {
  const posts = await fetchPosts();
  
  return Response.json(posts, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
\`\`\`

## 5. Bundle Analysis

Regularly analyze your bundle to identify optimization opportunities:

\`\`\`bash
npm install --save-dev @next/bundle-analyzer

# In next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});

# Run analysis
ANALYZE=true npm run build
\`\`\`

## 6. Database and Data Fetching

### Server Components for Data Fetching

\`\`\`tsx
// app/posts/page.tsx
async function Posts() {
  // This runs on the server
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR with 1 hour cache
  });

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

## Performance Monitoring

### Core Web Vitals

Monitor these key metrics:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

Use Vercel Analytics or Google PageSpeed Insights to track these metrics.

## Quick Checklist

- [ ] Use Next.js Image component for all images
- [ ] Implement dynamic imports for heavy components
- [ ] Optimize fonts with next/font
- [ ] Enable gzip/brotli compression
- [ ] Use appropriate caching strategies
- [ ] Monitor Core Web Vitals
- [ ] Analyze bundle size regularly
- [ ] Optimize database queries
- [ ] Use Server Components where appropriate

## Conclusion

Performance optimization is an ongoing process. Start with the biggest impact changes (images, code splitting) and then dive deeper into specific optimizations for your use case.

What performance techniques have worked best for your Next.js applications?`
    }
];

export const getBlogPost = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.id === slug);
};

export const getAllBlogPosts = (): BlogPost[] => {
    return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};