import { getGithubStats } from '$lib/server/actions/github';
import { getCredlyCertifications } from '$lib/server/actions/credly';
import {
	CURRENT_TITLE,
	CURRENT_COMPANY,
	CURRENT_WORK_LOCATION,
	SCHEDULE_A_CALL_URL,
	SEND_EMAIL_URL,
	RESUME_CV_LINK
} from '$env/static/private';

export const load = async () => {
	const [githubStats, credlyCerts] = await Promise.all([
		getGithubStats().catch(() => null),
		getCredlyCertifications().catch(() => [])
	]);

	return {
		githubStats,
		credlyCerts,
		env: {
			CURRENT_TITLE,
			CURRENT_COMPANY,
			CURRENT_WORK_LOCATION,
			SCHEDULE_A_CALL_URL,
			SEND_EMAIL_URL,
			RESUME_CV_LINK
		}
	};
};
