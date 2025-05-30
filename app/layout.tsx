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
    title: "Froilan | Web Developer",
    description: "Personal Website of Froilan, Web Developer based in Caloocan, Philippines.",
    "google-site-verification": "cea09eQxw2xZKhdxfMUKhILNuAzqAeQnrIWLUC027IA",
    applicationName: "Froilan",
    authors: [{ name: "Froilan Aquino", url: "https://froilan.vercel.app" }],
    abstract: "Personal Website of Froilan, Web Developer and Web Developer based in the Caloocan Philippines.",
    publisher: "Froilan Aquino",
    generator: "Next.js",
    keywords: [
        "Froilan",
        "Froilan Aquino",
        "Web Developer",
        "Software Engineer",
        "Caloocan",
        "Philippines",
        "Portfolio",
        "Personal Website",
    ],
    robots: "index, follow",
    "og:title": "Froilan | Web Developer",
    "og:description": "Personal Website of Froilan, Web Developer and Web Developer based in the Caloocan Philippines.",
    "og:type": "website",
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
