import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/navigation-bar/navbar";
import NavBarSmall from "@/components/navigation-bar/navbar-small";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/provider/theme-provider";
import { type ReactNode } from "react";

const font = Inter({
    weight: ["400", "500", "600", "700", "800", "900"],
    style: "normal",
    subsets: ["latin"],
});
export const metadata = {
    title: "Froilan | Web Developer",
    description: "Personal Website of Froilan, Web Developer and Web Developer based in the Caloocan Philippines.",
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
    openGraph: {
        title: "Froilan | Web Developer",
        description: "Personal Website of Froilan, Web Developer and Web Developer based in the Caloocan Philippines.",
        url: "https://froilan.dev",
        siteName: "Froilan | Web Developer",
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "Froilan | Web Developer",
            },
        ],
    },
    robots: "index, follow",
    "og:title": "Froilan | Web Developer",
    "og:description": "Personal Website of Froilan, Web Developer and Web Developer based in the Caloocan Philippines.",
    "og:type": "website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${font.className} gap-5 md:gap-8 lg:gap-14 pt-4 pb-10 min-h-screen md:pt-8 lg:pt-11 xl:pt-14 w-full justify-start flex flex-col items-center`}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <NavBar />
                    <NavBarSmall />
                    {children}
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
