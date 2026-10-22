import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://froilan.vercel.app";
    const currentDate = new Date();

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 1,
        },
    ];
}
