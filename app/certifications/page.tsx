import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { getCredlyCertifications } from "@/actions";
import * as motion from "motion/react-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: process.env.PAGE_TITLE
        ? process.env.PAGE_TITLE + " | Certifications"
        : "Froilan | Software Engineer | Certifications",
    description: "A showcase of Froilan's certifications and achievements.",
    keywords: ["Froilan's Certifications", "Froilan's Achievements", "Froilan's Showcase"],
};

async function Certifications() {
    const credlyCerts = await getCredlyCertifications();
    return (
        <main className="py-10 w-11/12 max-w-7xl gap-2 flex flex-col md:grid md:grid-cols-2">
            <Link
                href={"/"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>
            <div className="col-span-2 w-full flex flex-col gap-5">
                <h1 className="text-2xl text-center font-bold">All Certifications</h1>
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {credlyCerts.map((c, index) => {
                        return (
                            <motion.div
                                key={c.link}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                    delay: index * 0.1,
                                }}
                                className="w-full h-full"
                            >
                                <Link href={c.link} target="_blank">
                                    <Card className="h-full hover:bg-muted/50 transition-colors">
                                        <CardHeader>
                                            <CardTitle className="text-sm">{c.title}</CardTitle>
                                            <CardDescription className="text-sm">{c.issuer}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default Certifications;
