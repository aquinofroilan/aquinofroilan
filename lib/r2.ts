import { S3Client } from "@aws-sdk/client-s3";

const r2 = new S3Client({
    region: "auto",
    credentials: {
        accessKeyId: process.env.R2_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
    },
    endpoint: process.env.R2_ENDPOINT_URL,
    forcePathStyle: true,
});

console.log("R2 Client Configured:", {
    endpoint: process.env.R2_ENDPOINT_URL,
    bucket: process.env.R2_BUCKET_NAME,
});

export { r2 };
