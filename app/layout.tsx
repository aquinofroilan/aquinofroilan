import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/provider/theme-provider";
import { type ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/organisms";
import { TooltipProvider } from "@/components/ui";
import { Metadata } from "next";

const inter = Inter({
    weight: ["400", "500", "600", "700", "800"],
    style: "normal",
    subsets: ["latin"],
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
    title: "Froilan | Software Engineer",
    description: "Personal Website of Froilan, Software Engineer based in Caloocan, Philippines.",
    "google-site-verification": "cea09eQxw2xZKhdxfMUKhILNuAzqAeQnrIWLUC027IA",
    applicationName: "Froilan",
    authors: [{ name: "Froilan Aquino", url: "https://froilan.vercel.app" }],
    abstract: "Personal Website of Froilan, Software Engineer based in the Caloocan Philippines.",
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
    "og:title": "Froilan | Software Engineer",
    "og:description": "Personal Website of Froilan, Software Engineer based in the Caloocan Philippines.",
    "og:type": "website",
    "og:url": "https://froilan.vercel.app",
    "og:site_name": "Froilan Portfolio",
    "twitter:card": "summary_large_image",
    "twitter:title": "Froilan | Software Engineer",
    "twitter:description": "Personal Website of Froilan, Software Engineer based in Caloocan, Philippines.",
    canonical: "https://froilan.vercel.app",
    metadataBase: new URL("https://froilan.vercel.app"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body
                className={`${inter.className} w-full flex items-center flex-col min-h-screen bg-background text-foreground antialiased transition-colors duration-200`}
            >
                <TooltipProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                    <Analytics />
                    <SpeedInsights />
                    <Footer />
                </TooltipProvider>
            </body>
        </html>
    );
}
