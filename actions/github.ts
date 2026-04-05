"use server";
import { graphql } from "@octokit/graphql";

const githubTokens = (process.env.GITHUB_TOKEN ?? "")
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);

const graphqlClients = githubTokens.map((token) =>
    graphql.defaults({
        headers: {
            authorization: `token ${token}`,
        },
    }),
);

let tokenCursor = 0;

const queryGithub = async <T>(query: string): Promise<T> => {
    if (graphqlClients.length === 0) {
        throw new Error("Missing GITHUB_TOKEN");
    }

    let lastError: unknown;

    for (let index = 0; index < graphqlClients.length; index++) {
        const clientIndex = (tokenCursor + index) % graphqlClients.length;

        try {
            const result = await graphqlClients[clientIndex](query);
            tokenCursor = (clientIndex + 1) % graphqlClients.length;
            return result as T;
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError ?? new Error("GitHub query failed");
};

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
    const { user: userInfo }: GraphQLResponse = await queryGithub<GraphQLResponse>(`
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

        const { user }: GraphQLResponse = await queryGithub<GraphQLResponse>(`
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
