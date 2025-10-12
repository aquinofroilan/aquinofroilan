# Troubleshooting Guide

## R2 Image Loading Issues

### Error: `OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED` (502 Bad Gateway)

**Symptoms:**
- Images fail to load on the deployed site
- Browser console shows 502 Bad Gateway errors
- Network tab shows `x-vercel-error: OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED`
- Images work locally but fail in production

**Root Cause:**
Next.js Image Optimization on Vercel cannot fetch images from private Cloudflare R2 storage endpoints, even with signed URLs. When Next.js tries to optimize an image, it needs to fetch it from the source URL, but the private R2 endpoint (`*.r2.cloudflarestorage.com`) requires authentication that Vercel's optimizer cannot provide.

**Why Signed URLs Don't Work:**
1. Signed URLs are generated server-side with AWS signature authentication
2. Next.js Image Optimization acts as a proxy/optimizer
3. When Vercel's optimizer tries to fetch the signed URL, it may:
   - Add additional headers that invalidate the signature
   - Make the request from a different IP/origin than expected
   - Cache and reuse the URL after the signature expires
4. The R2 storage endpoint rejects the request as unauthorized

**Solution:**
Use R2's public URL feature instead of signed URLs for images that need to work with Next.js Image Optimization.

### Step-by-Step Fix

#### 1. Enable Public Access on R2 Bucket

**Option A: Use R2 Public URL (pub-*.r2.dev)**
1. Log in to Cloudflare Dashboard
2. Navigate to R2 → Select your bucket
3. Go to Settings → Public Access
4. Click "Allow Access"
5. Copy the provided public URL (format: `https://pub-xxxxxxxxxxxxx.r2.dev`)

**Option B: Connect Custom Domain**
1. In R2 bucket settings, click "Connect Domain"
2. Enter your custom domain (e.g., `cdn.yourdomain.com`)
3. Add the required DNS records in Cloudflare DNS
4. Wait for DNS propagation
5. Use your custom domain as the public URL

#### 2. Configure Environment Variable

**Local Development:**
1. Copy `.env.local.example` to `.env.local`
2. Add your R2_PUBLIC_URL:
   ```env
   R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxx.r2.dev
   # or
   R2_PUBLIC_URL=https://cdn.yourdomain.com
   ```

**Vercel Production:**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add new variable:
   - Name: `R2_PUBLIC_URL`
   - Value: `https://pub-xxxxxxxxxxxxx.r2.dev` (or your custom domain)
   - Environment: Production (and Preview if needed)
4. Click "Save"

#### 3. Redeploy

After adding the environment variable to Vercel:
1. Go to Deployments tab
2. Click the three dots on the latest deployment
3. Select "Redeploy"
4. Or push a new commit to trigger automatic deployment

### Verification

To verify the fix is working:

1. **Check the Image URLs:**
   - View page source on deployed site
   - Find an image tag
   - Check if the `src` points to your public R2 URL
   - Should look like: `https://pub-xxxxx.r2.dev/bucket-name/image.png`

2. **Test Image Loading:**
   - Open the deployed site
   - Open browser DevTools → Network tab
   - Reload the page
   - Look for image requests
   - They should return 200 OK status
   - `x-vercel-cache` header should show HIT or MISS (not error)

3. **Check Next.js Image Optimization:**
   - Image URLs in the browser should be proxied through `/_next/image`
   - Format: `/_next/image?url=https://pub-xxx.r2.dev/...&w=1920&q=75`
   - This confirms Next.js is successfully optimizing the images

### Common Issues

#### Issue: "R2_PUBLIC_URL not working"

**Solution:**
- Verify the URL doesn't include the bucket name at the end
- Correct: `https://pub-xxxxx.r2.dev`
- Incorrect: `https://pub-xxxxx.r2.dev/my-bucket`
- The code automatically adds the bucket name and file path

#### Issue: "Images still not loading after adding R2_PUBLIC_URL"

**Checklist:**
1. ✅ Verified R2 bucket has public access enabled
2. ✅ Added R2_PUBLIC_URL to Vercel environment variables
3. ✅ Redeployed the application after adding the variable
4. ✅ Cleared browser cache
5. ✅ Checked that the domain in `next.config.js` allows your R2 domain

#### Issue: "Some images load, others don't"

**Possible Causes:**
- Check if image file names have special characters
- Verify all images are in the R2 bucket
- Check browser console for specific error messages
- Ensure images aren't too large (Next.js has size limits)

#### Issue: "Images load slowly"

**Optimization Tips:**
- Use Next.js Image component's `priority` prop for above-the-fold images
- Set appropriate `sizes` prop for responsive images
- Consider using lower quality settings for thumbnails
- Enable Vercel's image caching

### Security Considerations

**Public URLs Mean Public Access:**
- Anyone with the URL can access your images
- Consider if this is acceptable for your use case
- Public access is standard for website assets (logos, project screenshots, etc.)

**If You Need Private Images:**
- Option 1: Use the `unoptimized` prop on Next.js Image component
  ```tsx
  <Image src={signedUrl} unoptimized alt="..." />
  ```
- Option 2: Implement an API route that proxies image requests with authentication
- Option 3: Use client-side rendering for private images

### Alternative Solutions

If public access is not an option:

1. **Disable Image Optimization:**
   ```tsx
   <Image src={signedUrl} unoptimized alt="..." />
   ```

2. **Use Image Loader:**
   Configure a custom loader in `next.config.js`

3. **API Route Proxy:**
   Create an API route that authenticates and proxies image requests

4. **Different Storage Solution:**
   Consider using a service with built-in CDN (e.g., Cloudinary, Imgix)

### Need More Help?

If you're still experiencing issues:
1. Check the [R2_SETUP.md](./R2_SETUP.md) guide
2. Review the [Next.js Image Optimization docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
3. Check [Cloudflare R2 documentation](https://developers.cloudflare.com/r2/)
4. Review Vercel deployment logs for errors
