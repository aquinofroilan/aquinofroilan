"use server";

import { unstable_cache } from "next/cache";

export interface CredlyBadge {
    id: string;
    title: string;
    description: string;
    image_url: string;
    badge_template: {
        name: string;
        description: string;
        id: string;
    };
    issued_at: string;
    expires_at: string | null;
    public_url: string;
    issuer: {
        name: string;
        entities: Array<{
            entity: {
                name: string;
            };
        }>;
    };
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
                    "Accept": "application/json",
                    "User-Agent": "Portfolio-Website",
                },
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
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
    }
);

/**
 * Format Credly badge for display in certification list
 */
export function formatCredlyBadge(badge: CredlyBadge) {
    // Get the issuer name - prefer the entity name if available
    const issuerName =
        badge.issuer.entities?.[0]?.entity?.name || badge.issuer.name;

    return {
        title: badge.badge_template.name || badge.title,
        description: issuerName,
        link: badge.public_url,
        imageUrl: badge.image_url,
        issuedAt: badge.issued_at,
        expiresAt: badge.expires_at,
    };
}

/**
 * Get formatted certification list from Credly
 */
export async function getCredlyCertifications(username: string) {
    const badges = await getCredlyBadges(username);
    return badges.map(formatCredlyBadge);
}
