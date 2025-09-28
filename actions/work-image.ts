"use server";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

const fetchImagesWithPrefix = async (prefix: string) => {
    const bucket = process.env.R2_BUCKET_NAME;

    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
    });

    const response = await r2.send(command);

    const files = response.Contents?.map((obj) => obj.Key) ?? [];

    const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
    const signedUrls = await Promise.all(
        files.map(async (key) => {
            return {
                key,
                url: await getSignedUrl(r2, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 3600 }),
            };
        }),
    );
    console.log("Signed URLs:", signedUrls);
    return signedUrls;
};

export { fetchImagesWithPrefix };
