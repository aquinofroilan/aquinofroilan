# R2 Bucket Configuration for Image Serving

## Problem
When using Cloudflare R2 with Next.js Image Optimization on Vercel, signed URLs from private R2 storage endpoints (`*.r2.cloudflarestorage.com`) cannot be fetched by Vercel's image optimizer, resulting in a `502 Bad Gateway` error with `OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED`.

## Solution
To serve images from R2 through Next.js Image Optimization on Vercel, you need to use R2's public access feature.

### Step 1: Enable Public Access on R2 Bucket

1. Go to Cloudflare Dashboard → R2 → Your Bucket
2. Go to Settings → Public Access
3. Enable "Allow Access" or connect a custom domain
4. You'll get a public URL like: `https://pub-xxxxxxxxxxxxx.r2.dev`

### Step 2: Configure Environment Variable

Add the following environment variable to both your local `.env.local` and Vercel project settings:

```env
R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxx.r2.dev
```

**Important**: Do NOT include the bucket name in the URL. The code automatically constructs the full path.

### Step 3: Update Next.js Image Configuration (Already Done)

The `next.config.js` has been updated to allow images from `**.r2.dev` domains.

### Step 4: Deploy

After adding the `R2_PUBLIC_URL` environment variable to Vercel:
1. Redeploy your application
2. Images will now load correctly through Next.js Image Optimization

## Alternative: Use Custom Domain

Instead of using `pub-*.r2.dev`, you can connect a custom domain to your R2 bucket:

1. In R2 bucket settings, click "Connect Domain"
2. Follow the instructions to add DNS records
3. Use your custom domain as `R2_PUBLIC_URL`: `https://cdn.yourdomain.com`

## How It Works

- **With `R2_PUBLIC_URL`**: The code generates public URLs that Vercel can fetch
- **Without `R2_PUBLIC_URL`**: The code falls back to signed URLs (which won't work with Vercel Image Optimization)

## Security Considerations

- Public R2 URLs mean your images are accessible to anyone with the URL
- If you need private images, you'll need to:
  - Disable Next.js Image Optimization for those images (use `unoptimized` prop)
  - Or implement a different image serving strategy (e.g., API route proxy)
