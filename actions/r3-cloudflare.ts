import { S3 } from "aws-sdk";

export const s3 = new S3({
    region: "auto",
    accessKeyId: process.env.R3_KEY_ID,
    secretAccessKey: process.env.R3_SECRET_KEY,
    signatureVersion: "v4",
    endpoint: process.env.R3_ENDPOINT_URL,
    s3ForcePathStyle: true,
});
