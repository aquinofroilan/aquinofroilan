import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavigationBar/NavBar";
import NavBarSmall from "@/components/NavigationBar/NavBarSmall";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/provider/ThemeProvider";

const font = Inter({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});
export const metadata = {
  title: "Froilan | Web Developer",
  description:
    "Personal Website of Froilan, Web Developer and Web Developer based in the Caloocan Philippines.",
  "google-site-verification": "cea09eQxw2xZKhdxfMUKhILNuAzqAeQnrIWLUC027IA",
  robots: "index, follow",
  "og:title": "Froilan | Web Developer",
  "og:description":
    "Personal Website of Froilan, Web Developer and Web Developer based in the Caloocan Philippines.",
  "og:type": "website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${font.className}
        gap-5
        md:gap-8
        lg:gap-14
        pt-4
		pb-10
		min-h-screen
        md:pt-8
        lg:pt-11
        xl:pt-14
        w-full
        justify-start
        flex
        flex-col
        items-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <NavBarSmall />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
