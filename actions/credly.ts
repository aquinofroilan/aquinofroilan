"use server";

import { unstable_cache } from "next/cache";
const CREDLY_USERNAME = process.env.CREDLY_USERNAME || "";

export interface CredlyBadge {
    id: string;
    name: string;
    expires_at_date: Date | null;
    issued_at_date: Date;
    description: string;
    level: string | null;
    time_to_earn: string | null;
    cost: string | null;
    type_category: string;
    image: unknown;
    image_url: string;
    url: string;
    badge_template_earnable: boolean;
    issuer: { summary: string };
    related_badge_templates: unknown[];
    alignments: unknown[];
    badge_template_activities: unknown[];
    endorsements: unknown[];
    skills: unknown[];
}

interface CredlyApiResponse {
    data: CredlyBadge[];
    metadata: {
        count: number;
        total: number;
        page: number;
        pages: number;
    };
}

/**
 * Fetch badges from Credly API for a specific user
 * @param username - The Credly username or email
 * @returns Array of Credly badges
 */
async function fetchCredlyBadges(username: string): Promise<CredlyBadge[]> {
    try {
        // Credly API endpoint for fetching user badges
        const response = await fetch(
            `https://www.credly.com/users/${username}/badges.json?per_page=100&sort=-issued_at`,
            {
                headers: {
                    Accept: "application/json",
                    "User-Agent": "Portfolio-Website",
                },
                next: { revalidate: 3600 }, // Cache for 1 hour
            },
        );

        if (!response.ok) {
            console.error(`Failed to fetch Credly badges: ${response.status}`);
            return [];
        }

        const data: CredlyApiResponse = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching Credly badges:", error);
        return [];
    }
}

/**
 * Get Credly badges with caching
 * Cached for 1 hour to reduce API calls
 */
export const getCredlyBadges = unstable_cache(
    async (username: string) => {
        return await fetchCredlyBadges(username);
    },
    ["credly-badges"],
    {
        revalidate: 3600, // Revalidate every 1 hour
        tags: ["credly-badges"],
    },
);

/**
 * Get formatted certification list from Credly
 */
export async function getCredlyCertifications() {
    const badges = await getCredlyBadges(CREDLY_USERNAME);
    return badges.map((b) => ({
        title: b.name,
        link: `https://www.credly.com/badges/${b.id}/public_url`,
        issuer: b.issuer.summary,
        issuedAt: b.issued_at_date,
        expiresAt: b.expires_at_date,
    }));
}
