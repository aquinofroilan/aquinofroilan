# Credly API Integration

This document describes the Credly API integration for dynamically fetching certification badges.

## Overview

The application now supports native Credly API integration to automatically fetch and display your certification badges from Credly. This replaces the need to manually maintain the certifications list.

## Features

- **Automatic Badge Fetching**: Fetches badges from Credly's public API
- **Caching**: Uses Next.js caching to reduce API calls (1-hour revalidation)
- **Fallback Support**: Falls back to static certification list if API is unavailable
- **Type Safety**: Fully typed with TypeScript interfaces
- **Server-Side Rendering**: Fetches data on the server for optimal performance

## Setup

### 1. Find Your Credly Username

Your Credly username is part of your public profile URL:
```
https://www.credly.com/users/{YOUR_USERNAME}/badges
```

For example, if your URL is `https://www.credly.com/users/john-doe/badges`, your username is `john-doe`.

### 2. Add Environment Variable

Add your Credly username to your `.env.local` file:

```env
CREDLY_USERNAME=your_credly_username
```

### 3. Restart Development Server

After adding the environment variable, restart your development server:

```bash
npm run dev
```

## How It Works

### Server Actions

The integration is implemented in [`actions/credly.ts`](../actions/credly.ts) with the following functions:

- **`getCredlyBadges(username)`**: Fetches raw badge data from Credly API
- **`formatCredlyBadge(badge)`**: Formats badge data for display
- **`getCredlyCertifications(username)`**: Returns formatted certifications ready for display

### Components

- **Certification Card** ([`components/organisms/certification-card.tsx`](../components/organisms/certification-card.tsx)): Displays the first 4 certifications on the home page
- **Certifications Page** ([`app/certifications/page.tsx`](../app/certifications/page.tsx)): Displays all certifications

Both components automatically fetch from Credly if the `CREDLY_USERNAME` environment variable is set.

### API Details

The integration uses Credly's public API endpoint:
```
https://www.credly.com/users/{username}/badges.json?per_page=100&sort=-issued_at
```

**Response includes:**
- Badge title and description
- Issuer information
- Badge image URL
- Issue and expiration dates
- Public badge URL

### Caching Strategy

- **Next.js Cache**: Uses `unstable_cache` with 1-hour revalidation
- **Request Cache**: Uses `fetch` with `next: { revalidate: 3600 }`
- **Cache Tags**: Tagged as `credly-badges` for manual revalidation if needed

## Data Structure

### CredlyBadge Interface

```typescript
interface CredlyBadge {
    id: string;
    title: string;
    description: string;
    image_url: string;
    badge_template: {
        name: string;
        description: string;
        id: string;
    };
    issued_at: string;
    expires_at: string | null;
    public_url: string;
    issuer: {
        name: string;
        entities: Array<{
            entity: {
                name: string;
            };
        }>;
    };
}
```

### Formatted Certification

The formatted output matches the existing certification list structure:

```typescript
{
    title: string;        // Badge name
    description: string;  // Issuer name
    link: string;         // Public badge URL
    imageUrl?: string;    // Badge image URL
    issuedAt?: string;    // Issue date
    expiresAt?: string | null;  // Expiration date
}
```

## Fallback Behavior

If the Credly API is unavailable or no username is configured, the application falls back to the static certification list in [`data/certification-list-preview.ts`](../data/certification-list-preview.ts).

## Testing

To test the integration:

1. Set `CREDLY_USERNAME` in `.env.local`
2. Run the development server
3. Visit the home page and certifications page
4. Verify badges are displayed correctly

To test fallback behavior:

1. Remove or comment out `CREDLY_USERNAME`
2. Restart the server
3. Verify static certifications are displayed

## Troubleshooting

### No badges appearing

1. Verify your Credly username is correct
2. Check that your Credly profile is public
3. Check browser console for errors
4. Verify environment variable is set correctly

### Stale data

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### API rate limiting

The Credly public API has rate limits. The integration uses caching to minimize requests. If you encounter rate limiting:

1. Increase cache duration in `actions/credly.ts`
2. Use the static certification list as fallback

## Future Enhancements

Potential improvements:

- Display badge images
- Show issue and expiration dates
- Filter by badge type or issuer
- Sort by most recent
- Add badge verification status
- Implement pagination for large badge collections
