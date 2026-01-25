"use server";
import { unstable_cache } from "next/cache";
import { CertificationsListsPreview } from "@/data/certification-list-preview";
const CREDLY_USERNAME = process.env.CREDLY_USERNAME || "";

export interface CredlyBadge {
    id: string;
    expires_at_date: Date | null;
    issued_at_date: Date;
    issuer: { summary: string; entities: { entity: { name: string } }[] };
    badge_template: { name: string; skills: { name: string }[] };
    skills: unknown[];
    verification_url?: string;
}

export interface FormattedCertification {
    id: string;
    title: string;
    link: string;
    issuer: string;
    issuedAt: Date;
    expiresAt: Date | null;
    skills: string[];
    verificationUrl?: string;
}

// Generic certification source interface
export interface CertificationSource {
    id: string;
    title: string;
    issuer: string | { entities: { entity: { name: string } }[] };
    issuedAt: Date;
    expiresAt?: Date | null;
    skills?: string[] | { name: string }[];
    verificationUrl?: string;
    link?: string;
}

// Type guard to check if data is from Credly API
function isCredlyBadge(data: any): data is CredlyBadge {
    return (
        data &&
        typeof data.id === "string" &&
        data.badge_template &&
        data.issuer &&
        data.issuer.entities &&
        Array.isArray(data.issuer.entities)
    );
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
 * Safely extract issuer name from different data structures
 */
function extractIssuerName(issuer: string | { entities: { entity: { name: string } }[] }): string {
    if (typeof issuer === "string") {
        return issuer.startsWith("Issued by:") ? issuer : `Issued by: ${issuer}`;
    }

    if (issuer && issuer.entities && Array.isArray(issuer.entities)) {
        const names = issuer.entities.map((e) => e.entity.name).join(", ");
        return `Issued by: ${names}`;
    }

    return "Issued by: Unknown";
}

/**
 * Safely extract skills from different data structures
 */
function extractSkills(skills?: string[] | { name: string }[]): string[] {
    if (!skills) return [];

    if (Array.isArray(skills)) {
        if (skills.length === 0) return [];

        if (typeof skills[0] === "string") {
            return skills as string[];
        }

        if (typeof skills[0] === "object" && skills[0] && "name" in skills[0]) {
            return (skills as { name: string }[]).map((s) => s.name);
        }
    }

    return [];
}

/**
 * Check if a certification should use Credly public URL format
 */
function shouldUseCredlyUrl(data: CredlyBadge): boolean {
    const issuerNames = data.issuer.entities.map((e) => e.entity.name.toLowerCase());
    const credlyIndicators = [
        "credly",
        "amazon web services",
        "aws",
        "microsoft",
        "cisco",
        "ibm",
        "vmware",
        "comptia",
        "pmi",
        "isaca",
    ];
    return issuerNames.some((name) => credlyIndicators.some((indicator) => name.includes(indicator)));
}

/**
 * Generic transformation function for any certification source
 */
function transformCertification(
    data: CredlyBadge | CertificationSource,
    isFromAPI: boolean = false,
): FormattedCertification {
    if (isCredlyBadge(data) && isFromAPI) {
        return {
            id: data.id,
            title: data.badge_template.name,
            link: `https://www.credly.com/badges/${data.id}/public_url`,
            issuer: extractIssuerName(data.issuer),
            issuedAt: data.issued_at_date,
            expiresAt: data.expires_at_date,
            skills: extractSkills(data.badge_template.skills),
            verificationUrl: data.verification_url,
        };
    }

    if (isCredlyBadge(data)) {
        let link: string;

        if (data.verification_url) {
            link = data.verification_url;
        } else if (shouldUseCredlyUrl(data)) {
            link = `https://www.credly.com/badges/${data.id}/public_url`;
        } else {
            link = `#${data.id}`;
        }

        return {
            id: data.id,
            title: data.badge_template.name,
            link: link,
            issuer: extractIssuerName(data.issuer),
            issuedAt: data.issued_at_date,
            expiresAt: data.expires_at_date,
            skills: extractSkills(data.badge_template.skills),
            verificationUrl: data.verification_url,
        };
    }

    return {
        id: data.id,
        title: data.title,
        link: data.link || data.verificationUrl || `#${data.id}`,
        issuer: extractIssuerName(data.issuer),
        issuedAt: data.issuedAt,
        expiresAt: data.expiresAt || null,
        skills: extractSkills(data.skills),
        verificationUrl: data.verificationUrl,
    };
}

/**
 * Get formatted certification list from Credly and static data
 */
export async function getCredlyCertifications(): Promise<FormattedCertification[]> {
    try {
        const credlyBadges = await getCredlyBadges();

        const formattedCredlyBadges = credlyBadges.map((badge) => transformCertification(badge, true));

        const formattedStaticCertifications = CertificationsListsPreview.map((cert) =>
            transformCertification(cert, false),
        );

        const allCertifications = [...formattedCredlyBadges, ...formattedStaticCertifications];

        return allCertifications.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
    } catch (error) {
        console.error("Error getting certifications:", error);

        try {
            return CertificationsListsPreview.map((cert) => transformCertification(cert, false));
        } catch (fallbackError) {
            console.error("Error transforming static certifications:", fallbackError);
            return [];
        }
    }
}
