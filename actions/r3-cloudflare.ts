import { S3 } from "aws-sdk";

export const s3 = new S3({
    region: "auto",
    accessKeyId: process.env.R2_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_KEY,
    signatureVersion: "v4",
    endpoint: process.env.R2_ENDPOINT_URL,
    s3ForcePathStyle: true,
});
