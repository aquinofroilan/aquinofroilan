"use server";
import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
});

interface GraphQLResponse {
    user: {
        pullRequests: { totalCount: number };
        issues: { totalCount: number };
        contributionsCollection: { totalCommitContributions: number };
        repositories: {
            nodes: { stargazerCount: number }[];
        };
    };
}

export const getGithubStats = async () => {
    const data: GraphQLResponse = await graphqlWithAuth(`
        query {
            user(login: "${process.env.GITHUB_USERNAME}") {
                pullRequests {
                    totalCount
                }
                issues {
                    totalCount
                }
                contributionsCollection {
                    totalCommitContributions
                }
                repositories(first: 100) {
                    nodes {
                        stargazerCount
                    }
                }
            }
        }
    `);

    // Aggregate star count across repos
    const totalStars = data.user.repositories.nodes.reduce(
        (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
        0,
    );

    const stats = {
        pullRequests: data.user.pullRequests.totalCount,
        issues: data.user.issues.totalCount,
        commitsPastYear: data.user.contributionsCollection.totalCommitContributions,
        stars: totalStars,
    };
    return stats;
};
