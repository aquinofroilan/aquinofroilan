import { CredlyBadge } from "@/actions/credly";

export const CertificationsListsPreview: CredlyBadge[] = [
    {
        id: "google-digital-marketing",
        issued_at_date: new Date("2025-09-01"),
        expires_at_date: null,
        verification_url: "https://skillshop.exceedlms.com/student/award/G4oGYxCuYiCyodDQ4AUETFp7",
        issuer: {
            summary: "",
            entities: [{ entity: { name: "Google Digital Academy Skillshop" } }],
        },
        badge_template: {
            name: "Fundamentals of Digital Marketing",
            skills: [],
        },
        skills: [],
    },
    {
        id: "google-educator-l1",
        issued_at_date: new Date("2026-01-03"),
        expires_at_date: new Date("2029-01-03"),
        verification_url: "https://edu.google.accredible.com/2aa3af0b-2f75-4605-976c-cce6ed655cc6",
        issuer: {
            summary: "",
            entities: [{ entity: { name: "Google For Education" } }],
        },
        badge_template: {
            name: "Google Certified Educator Level 1",
            skills: [],
        },
        skills: [],
    },
];
