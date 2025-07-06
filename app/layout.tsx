import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/provider/theme-provider";
import { type ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/organisms";

const font = Nunito_Sans({
    weight: ["400", "500", "600", "700", "800"],
    style: "normal",
    subsets: ["latin"],
});
export const metadata = {
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
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${font.className} w-full flex items-center flex-col min-h-screen bg-background text-foreground antialiased transition-colors duration-200`}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
                <Footer />
            </body>
        </html>
    );
}
