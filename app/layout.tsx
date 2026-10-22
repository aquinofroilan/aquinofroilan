import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/provider/theme-provider";
import { type ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer, BlueprintNavbar } from "@/components/organisms";
import { TooltipProvider, SpiderCrawler } from "@/components/ui";
import { Metadata } from "next";

const inter = Inter({
    weight: ["400", "500", "600", "700", "800"],
    style: "normal",
    subsets: ["latin"],
    variable: "--font-sans",
});

const mono = JetBrains_Mono({
    weight: ["400", "500", "600", "700"],
    style: "normal",
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata & {
    "google-site-verification": string;
    "og:title": string;
    "og:description": string;
    "og:type": string;
    "og:url": string;
    "og:site_name": string;
    "twitter:card": string;
    "twitter:title": string;
    "twitter:description": string;
    canonical: string;
} = {
    description: `Personal Website of Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"} based in Caloocan, Philippines.${process.env.CURRENT_COMPANY ? ` Currently working at ${process.env.CURRENT_COMPANY}.` : ""}`,
    "google-site-verification": "cea09eQxw2xZKhdxfMUKhILNuAzqAeQnrIWLUC027IA",
    applicationName: "Froilan",
    authors: [{ name: "Froilan Aquino", url: "https://froilan.vercel.app" }],
    abstract: `Personal Website of Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"} based in the Caloocan Philippines.${process.env.CURRENT_COMPANY ? ` Currently working at ${process.env.CURRENT_COMPANY}.` : ""}`,
    publisher: "Froilan Aquino",
    generator: "Next.js",
    keywords: [
        "Froilan",
        "Froilan Aquino",
        "Software Engineer",
        "Software Engineer",
        "Caloocan",
        "Philippines",
        "Portfolio",
        "Personal Website",
    ],
    robots: "index, follow",
    "og:title": `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"}`,
    "og:description": `Personal Website of Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"} based in the Caloocan Philippines.${process.env.CURRENT_COMPANY ? ` Currently working at ${process.env.CURRENT_COMPANY}.` : ""}`,
    "og:type": "website",
    "og:url": "https://froilan.vercel.app",
    "og:site_name": "Froilan Portfolio",
    "twitter:card": "summary_large_image",
    "twitter:title": `Froilan | ${process.env.CURRENT_TITLE || "Software Engineer"}`,
    "twitter:description": `Personal Website of Froilan, ${process.env.CURRENT_TITLE || "Software Engineer"} based in Caloocan, Philippines.${process.env.CURRENT_COMPANY ? ` Currently working at ${process.env.CURRENT_COMPANY}.` : ""}`,
    canonical: "https://froilan.vercel.app",
    metadataBase: new URL("https://froilan.vercel.app"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={`${inter.variable} ${mono.variable}`}
            suppressHydrationWarning
        >
            <body
                className={`${inter.className} font-sans w-full flex items-center flex-col min-h-screen bg-background text-foreground antialiased transition-colors duration-200 bg-dot-grid`}
            >
                <TooltipProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <BlueprintNavbar />
                        {children}
                        <SpiderCrawler />
                    </ThemeProvider>
                    <Analytics />
                    <SpeedInsights />
                    <Footer />
                </TooltipProvider>
            </body>
        </html>
    );
}
