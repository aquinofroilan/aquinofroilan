"use server";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

const fetchImagesWithPrefix = async (prefix: string) => {
    if (!prefix?.trim()) {
        throw new Error("fetchImagesWithPrefix: 'prefix' is required.");
    }
    const bucket = process.env.R2_BUCKET_NAME;
    if (!bucket) {
        throw new Error("R2_BUCKET_NAME environment variable is not defined.");
    }

    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
    });

    const response = await r2.send(command);

    const files = (response.Contents ?? []).map((obj) => obj.Key).filter((key): key is string => Boolean(key));

    // Use R2 public URL if available
    // This should be the R2 public bucket URL (e.g., https://pub-xxxxx.r2.dev or custom domain)
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (publicUrl) {
        // Use public URLs for images that work with Next.js Image Optimization
        // Format: https://pub-xxxxx.r2.dev/path/to/image.png

        return files.map((key) => ({
            key,
            url: `${publicUrl}/${key}`,
        }));
    }

    // Fallback to signed URLs
    // Note: Signed URLs from private R2 endpoints won't work with Vercel Image Optimization
    // because Vercel's optimizer cannot access private storage endpoints
    const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");

    return await Promise.all(
        files.map(async (key) => {
            return {
                key,
                url: await getSignedUrl(r2, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 3600 }),
            };
        }),
    );
};

export { fetchImagesWithPrefix };
