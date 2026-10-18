"use server";
import { graphql } from "@octokit/graphql";

const githubTokens = (process.env.GITHUB_TOKEN ?? "")
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);

interface UserStatsResponse {
    viewer: { login: string };
    user: {
        createdAt: string;
        pullRequests: { totalCount: number };
        issues: { totalCount: number };
        repositories: {
            nodes: { stargazerCount: number }[];
        };
    };
}

interface CommitResponse {
    user: {
        contributionsCollection: { totalCommitContributions: number };
    };
}

const getAccountStats = async (token: string) => {
    const client = graphql.defaults({
        headers: { authorization: `token ${token}` },
    });

    const { viewer, user } = await client<UserStatsResponse>(`
        query {
            viewer { login }
            user(login: "${process.env.GITHUB_USERNAME}") {
                createdAt
                pullRequests { totalCount }
                issues { totalCount }
                repositories(first: 100) {
                    nodes { stargazerCount }
                }
            }
        }
    `);

    // Only count commits for the viewer's own account
    const login = viewer.login;
    const createdAt = new Date(user.createdAt);
    const now = new Date();
    let totalCommits = 0;

    for (let year = createdAt.getFullYear(); year <= now.getFullYear(); year++) {
        const from = new Date(
            Math.max(createdAt.getTime(), new Date(`${year}-01-01T00:00:00Z`).getTime()),
        ).toISOString();
        const to = new Date(Math.min(now.getTime(), new Date(`${year}-12-31T23:59:59Z`).getTime())).toISOString();

        const data = await client<CommitResponse>(`
            query {
                user(login: "${login}") {
                    contributionsCollection(from: "${from}", to: "${to}") {
                        totalCommitContributions
                    }
                }
            }
        `);
        totalCommits += data.user.contributionsCollection.totalCommitContributions;
    }

    const stars = user.repositories.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0);

    return {
        login,
        pullRequests: user.pullRequests.totalCount,
        issues: user.issues.totalCount,
        commits: totalCommits,
        stars,
    };
};

export const getGithubStats = async () => {
    if (githubTokens.length === 0) {
        throw new Error("Missing GITHUB_TOKEN");
    }

    const results = await Promise.all(githubTokens.map(getAccountStats));
    const seen = new Set<string>();

    let pullRequests = 0;
    let issues = 0;
    let commits = 0;
    let stars = 0;

    for (const result of results) {
        if (seen.has(result.login)) continue;
        seen.add(result.login);

        pullRequests += result.pullRequests;
        issues += result.issues;
        commits += result.commits;
        stars += result.stars;
    }

    return { pullRequests, issues, commits, stars };
};
