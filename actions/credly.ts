"use server";
import { unstable_cache } from "next/cache";
const CREDLY_USERNAME = process.env.CREDLY_USERNAME || "";

export interface CredlyBadge {
    id: string;
    name: string;
    expires_at_date: Date | null;
    issued_at_date: Date;
    description: string;
    image: unknown;
    image_url: string;
    url: string;
    issuer: { summary: string; entities: { entity: { name: string } }[] };
    badge_template: { name: string; skills: { name: string }[] };
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
async function fetchCredlyBadges(): Promise<CredlyBadge[]> {
    try {
        const response = await fetch(
            `https://www.credly.com/users/${CREDLY_USERNAME}/badges.json?per_page=100&sort=-issued_at`,
            {
                headers: {
                    Accept: "application/json",
                    "User-Agent": "Portfolio-Website",
                },
                next: { revalidate: 3600 },
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
    async () => {
        return await fetchCredlyBadges();
    },
    ["credly-badges"],
    {
        revalidate: 3600,
        tags: ["credly-badges"],
    },
);

/**
 * Get formatted certification list from Credly
 */
export async function getCredlyCertifications() {
    const badges = await getCredlyBadges();
    return badges.map((b) => ({
        title: b.badge_template.name,
        link: `https://www.credly.com/badges/${b.id}/public_url`,
        issuer: `Issued by: ${b.issuer.entities.map((e) => e.entity.name).join(", ")}`,
        issuedAt: b.issued_at_date,
        expiresAt: b.expires_at_date,
        skills: b.badge_template.skills.map((s) => s.name),
    }));
}
