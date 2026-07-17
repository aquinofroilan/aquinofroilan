import { getGithubStats } from '$lib/server/actions/github';
import { getCredlyCertifications } from '$lib/server/actions/credly';
import { getRecentBlogPosts } from '$lib/server/actions/blog';
import { getRecentBooks } from '$lib/server/actions/books';
import { env } from '$env/dynamic/private';

export const load = async () => {
    const [githubStats, credlyCerts, posts, books] = await Promise.all([
        getGithubStats().catch(() => null),
        getCredlyCertifications().catch(() => []),
        getRecentBlogPosts(4).catch(() => []),
        getRecentBooks(4).catch(() => [])
    ]);

    return {
        githubStats,
        credlyCerts,
        posts,
        books,
        env: {
            CURRENT_TITLE: env.CURRENT_TITLE,
            CURRENT_COMPANY: env.CURRENT_COMPANY,
            CURRENT_WORK_LOCATION: env.CURRENT_WORK_LOCATION,
            SCHEDULE_A_CALL_URL: env.SCHEDULE_A_CALL_URL,
            SEND_EMAIL_URL: env.SEND_EMAIL_URL,
            RESUME_CV_LINK: env.RESUME_CV_LINK,
        }
    };
};
