import "./globals.css";
import { Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/provider/theme-provider";
import { type ReactNode } from "react";
import Footer from "@/components/organisms/footer";
import { Separator } from "@/components/ui";

const font = Quicksand({
    weight: ["400", "500", "600", "700"],
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
        <html lang="en" className="scroll-smooth">
            <body
                className={`${font.className} w-full min-h-screen bg-background text-foreground antialiased transition-colors duration-200 dark:bg-background-dark dark:text-foreground-dark flex flex-col items-center justify-between`}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <Separator className="w-11/12 max-w-5xl" />
                    <Footer />
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
