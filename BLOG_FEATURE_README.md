# Blog Feature Documentation

## Overview

This feature adds a fully functional blog system to the website with:
- Automatic blog generation using Gemini LLM
- Turso Cloud database for storage
- Markdown rendering with code syntax highlighting
- Like and share functionality
- Recent blogs displayed on the homepage

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```bash
# Turso Database Configuration
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key

# CRON Secret for securing CRON endpoints
CRON_SECRET=your_random_secret_string
```

### 2. Turso Database Setup

1. Create a Turso account at https://turso.tech/
2. Create a new database
3. Get your database URL and auth token
4. The database schema will be created automatically on first use

### 3. Gemini API Setup

1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add the key to your environment variables

### 4. CRON Configuration

The CRON job is configured in `vercel.json` to run twice per week:
- Monday at 10:00 AM UTC
- Thursday at 10:00 AM UTC

The CRON endpoint is: `/api/cron/generate-blog`

To manually trigger blog generation, make a GET request to:
```
https://your-domain.com/api/cron/generate-blog
```
with the Authorization header:
```
Authorization: Bearer your_cron_secret
```

## Features

### Blog Listing Page (`/blog`)
- Displays all blog posts sorted by date (newest first)
- Shows post title, excerpt, date, and likes count
- Links to individual blog posts

### Individual Blog Page (`/blog/[uuid]`)
- Displays full blog post content with markdown rendering
- Syntax highlighting for code blocks
- Like button functionality
- Share button to copy blog URL to clipboard
- Back navigation to blog list

### Recent Blogs Card (Homepage)
- Shows 4 most recent blog posts
- Displays title, excerpt, date, and likes
- Links to view all blogs

## API Routes

### POST `/api/blog/like`
Increments the like count for a blog post.

Request body:
```json
{
  "id": "blog-post-uuid"
}
```

Response:
```json
{
  "success": true,
  "likes": 42
}
```

### GET `/api/cron/generate-blog`
Generates a new blog post using Gemini LLM and saves it to the database.

Requires Authorization header with CRON secret.

Response:
```json
{
  "success": true,
  "message": "Blog post generated successfully",
  "post": {
    "id": "generated-uuid",
    "title": "Blog Post Title"
  }
}
```

## Database Schema

```sql
CREATE TABLE blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    likes INTEGER DEFAULT 0
)
```

## Dependencies Added

- `@libsql/client` - Turso database client
- `@google/generative-ai` - Gemini LLM integration
- `react-markdown` - Markdown rendering
- `rehype-highlight` - Code syntax highlighting
- `remark-gfm` - GitHub Flavored Markdown support
- `uuid` - UUID generation
- `@types/uuid` - TypeScript types for uuid

## File Structure

```
app/
  api/
    blog/
      like/
        route.ts           # Like increment API
    cron/
      generate-blog/
        route.ts           # CRON job for blog generation
  blog/
    [slug]/
      page.tsx             # Individual blog page (server)
      blog-post-client.tsx # Client component for blog post
    page.tsx               # Blog listing page
actions/
  blog.ts                  # Server actions for blog operations
components/
  organisms/
    recent-blogs-card.tsx  # Recent blogs component for homepage
lib/
  turso.ts                 # Turso database connection
  gemini.ts                # Gemini LLM integration
vercel.json                # CRON configuration
```

## Testing

To test the feature locally:

1. Set up environment variables
2. Run the development server: `npm run dev`
3. Navigate to `/blog` to see the blog listing (will be empty initially)
4. Manually trigger blog generation using the CRON endpoint
5. Refresh the blog page to see the generated post
6. Click on a post to view it
7. Test the like and share functionality
8. Check the homepage to see recent blogs

## Notes

- Blog posts are generated with random topics from a predefined list
- The Gemini LLM generates 500-800 word articles with code examples
- Markdown content is sanitized and rendered safely
- Likes are stored per post and not normalized (as requested)
- Share functionality copies the full URL to clipboard
