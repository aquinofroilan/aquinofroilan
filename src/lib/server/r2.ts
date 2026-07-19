import { S3Client } from '@aws-sdk/client-s3';
import { R2_KEY_ID, R2_SECRET_KEY, R2_ENDPOINT_URL } from '$env/static/private';

if (!R2_KEY_ID || !R2_SECRET_KEY || !R2_ENDPOINT_URL) {
	console.warn('Missing R2 configuration. Storage features will be unavailable.');
}

const r2 = new S3Client({
	region: 'auto',
	credentials: {
		accessKeyId: R2_KEY_ID || 'dummy',
		secretAccessKey: R2_SECRET_KEY || 'dummy'
	},
	endpoint: R2_ENDPOINT_URL || 'https://dummy.r2.cloudflarestorage.com',
	forcePathStyle: true
});

export { r2 };
