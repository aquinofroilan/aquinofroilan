'use server';
import { R2_BUCKET_NAME, R2_PUBLIC_URL } from '$env/static/private';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { r2 } from '$lib/server/r2';

const fetchImagesWithPrefix = async (prefix: string) => {
	if (!prefix?.trim()) {
		throw new Error("fetchImagesWithPrefix: 'prefix' is required.");
	}
	const bucket = R2_BUCKET_NAME;
	if (!bucket) {
		throw new Error('R2_BUCKET_NAME environment variable is not defined.');
	}

	const command = new ListObjectsV2Command({
		Bucket: bucket,
		Prefix: prefix
	});

	const response = await r2.send(command);

	const files = (response.Contents ?? [])
		.map((obj: { Key?: string }) => obj.Key)
		.filter((key: string | undefined): key is string => Boolean(key));

	const publicUrl = R2_PUBLIC_URL;

	if (publicUrl) {
		return files.map((key: string) => ({
			key,
			url: `${publicUrl}/${key}`
		}));
	}

	const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

	return await Promise.all(
		files.map(async (key: string) => {
			return {
				key,
				url: await getSignedUrl(r2, new GetObjectCommand({ Bucket: bucket, Key: key }), {
					expiresIn: 3600
				})
			};
		})
	);
};

export { fetchImagesWithPrefix };
