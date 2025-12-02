# Blog Feature Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BLOG FEATURE FLOW                         │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  CRON Job        │
│  (Vercel)        │
│  Mon & Thu 10AM  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  /api/cron/generate-blog             │
│  - Verify authorization              │
│  - Call Gemini LLM                   │
│  - Save to Turso DB                  │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  lib/gemini.ts                       │
│  - Random topic selection            │
│  - Generate blog content             │
│  - Return title & markdown           │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  actions/blog.ts                     │
│  - createBlogPost()                  │
│  - Generate UUID                     │
│  - Insert into database              │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  lib/turso.ts                        │
│  - Turso Cloud connection            │
│  - SQL: INSERT INTO blog_posts       │
└──────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                       USER FLOW                                   │
└──────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │  Homepage    │
    │  (/)         │
    └──────┬───────┘
           │
           ├──────────────────────────┐
           │                          │
           ▼                          ▼
    ┌────────────────┐        ┌─────────────────┐
    │ RecentBlogsCard│        │  Other Cards    │
    │ - 4 recent     │        │  - Profile      │
    │ - View All →   │        │  - Projects     │
    └────────┬───────┘        │  - Tech Stack   │
             │                └─────────────────┘
             ▼
    ┌────────────────────────┐
    │  /blog                 │
    │  - List all blogs      │
    │  - Title, excerpt      │
    │  - Date, likes         │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │  /blog/[uuid]          │
    │  - Full content        │
    │  - Markdown rendering  │
    │  - Code highlighting   │
    │  - Like button         │
    │  - Share button        │
    └────────┬───────────────┘
             │
             ├──────────────────┐
             │                  │
             ▼                  ▼
    ┌──────────────┐    ┌──────────────┐
    │ Like Action  │    │ Share Action │
    │ POST /api/   │    │ Copy URL     │
    │ blog/like    │    │ Clipboard    │
    └──────────────┘    └──────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   COMPONENT STRUCTURE                             │
└──────────────────────────────────────────────────────────────────┘

app/
├── page.tsx (Homepage)
│   └── RecentBlogsCard (Server Component)
│       └── Fetch 4 recent posts
│
├── blog/
│   ├── page.tsx (Blog List - Server)
│   │   └── getAllBlogPosts()
│   │
│   └── [slug]/
│       ├── page.tsx (Blog Detail - Server)
│       │   └── getBlogPostById(uuid)
│       │
│       └── blog-post-client.tsx (Client)
│           ├── Like functionality (useState)
│           ├── Share functionality (clipboard)
│           └── Markdown rendering (react-markdown)
│
└── api/
    ├── blog/like/route.ts
    │   └── incrementBlogLikes()
    │
    └── cron/generate-blog/route.ts
        ├── Verify authorization
        ├── generateBlogContent()
        └── createBlogPost()

┌──────────────────────────────────────────────────────────────────┐
│                      DATA FLOW                                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Turso Database  │
│  (libSQL)        │
│                  │
│  blog_posts:     │
│  - id (UUID)     │
│  - title         │
│  - content       │
│  - created_at    │
│  - likes         │
└────────┬─────────┘
         │
         ├──────────────────┬──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
   getAllBlogPosts()  getBlogPostById()  incrementBlogLikes()
         │                  │                  │
         ▼                  ▼                  ▼
   [Blog List]        [Blog Detail]      [Updated Likes]

┌──────────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                               │
└──────────────────────────────────────────────────────────────────┘

Frontend:
├── Next.js 16 (App Router)
├── React 19
├── TypeScript
├── Tailwind CSS 4.0
├── motion/react-client
├── react-markdown
├── rehype-highlight
└── remark-gfm

Backend:
├── Next.js Server Actions
├── Turso Cloud (@libsql/client)
├── Google Gemini AI
└── Vercel CRON

UI Components:
├── Radix UI
├── BentoGridItem
├── Custom styled components
└── Dark mode support

┌──────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                                │
└──────────────────────────────────────────────────────────────────┘

1. CRON Endpoint
   └── Authorization: Bearer {CRON_SECRET}

2. Database Queries
   └── Parameterized statements (SQL injection prevention)

3. Markdown Rendering
   └── react-markdown sanitization (XSS prevention)

4. Environment Variables
   └── Validated at startup with warnings

5. Error Handling
   └── No internal details exposed to users
```
