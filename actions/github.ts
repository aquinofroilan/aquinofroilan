"use server";
import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
});

interface GraphQLResponse {
    user: {
        createdAt: string;
        pullRequests: { totalCount: number };
        issues: { totalCount: number };
        contributionsCollection: { totalCommitContributions: number };
        repositories: {
            nodes: { stargazerCount: number }[];
        };
    };
}

export const getGithubStats = async () => {
    const { user: userInfo }: GraphQLResponse = await graphqlWithAuth(`
        query {
            user(login: "${process.env.GITHUB_USERNAME}") {
                createdAt
                pullRequests { totalCount }
                issues { totalCount }
                repositories(first: 100) {
                    nodes { stargazerCount }
                }
                contributionsCollection {
                    totalCommitContributions
                }
            }
        }
    `);

    const createdAt = new Date(userInfo.createdAt);
    const now = new Date();
    let totalCommits = 0;

    for (let year = createdAt.getFullYear(); year <= now.getFullYear(); year++) {
        const from = new Date(Math.max(createdAt.getTime(), new Date(`${year}-01-01T00:00:00Z`).getTime())).toISOString();
        const to = new Date(Math.min(now.getTime(), new Date(`${year}-12-31T23:59:59Z`).getTime())).toISOString();

        const { user }: GraphQLResponse = await graphqlWithAuth(`
            query {
                user(login: "${process.env.GITHUB_USERNAME}") {
                    createdAt
                    pullRequests { totalCount }
                    issues { totalCount }
                    repositories(first: 1) { nodes { stargazerCount } }
                    contributionsCollection(from: "${from}", to: "${to}") {
                        totalCommitContributions
                    }
                }
            }
        `);
        totalCommits += user.contributionsCollection.totalCommitContributions;
    }

    const totalStars = userInfo.repositories.nodes.reduce(
        (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
        0,
    );

    return {
        pullRequests: userInfo.pullRequests.totalCount,
        issues: userInfo.issues.totalCount,
        commits: totalCommits,
        stars: totalStars,
    };
};
