import { S3Client } from "@aws-sdk/client-s3";

const { R2_KEY_ID, R2_SECRET_KEY, R2_ENDPOINT_URL } = process.env;

if (!R2_KEY_ID || !R2_SECRET_KEY || !R2_ENDPOINT_URL) {
    throw new Error("Missing R2 configuration (R2_KEY_ID, R2_SECRET_KEY, R2_ENDPOINT_URL).");
}

const r2 = new S3Client({
    region: "auto",
    credentials: {
        accessKeyId: R2_KEY_ID,
        secretAccessKey: R2_SECRET_KEY,
    },
    endpoint: R2_ENDPOINT_URL,
    forcePathStyle: true,
});

export { r2 };
