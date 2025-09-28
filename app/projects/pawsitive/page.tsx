import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { Github } from "@/components/atoms";
import ImageGallery from "@/components/organisms/image-gallery";
import { fetchImagesWithPrefix } from "@/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: process.env.PAGE_TITLE
        ? process.env.PAGE_TITLE + " | Project | Pawsitive"
        : "Froilan | Software Engineer | Project | Pawsitive",
    description: "A showcase of Froilan's technical skills and tools.",
    keywords: ["Froilan's Projects", "Froilan's Skills", "Froilan's Technologies"],
};

const PawsitiveDetails = async () => {
    const snapshotLinks = await fetchImagesWithPrefix("pawsitive-");

    return (
        <main className="py-10 w-11/12 max-w-7xl gap-2 flex flex-col md:grid md:grid-cols-2">
            <Link
                href={"/projects"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>
            <div className="grid place-content-center col-span-2 w-full h-full">
                <section className="flex flex-row justify-between items-center gap-4 mb-5">
                    <h1 className="text-2xl text-center font-bold">Synectix</h1>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={"https://github.com/aquinofroilan/pawsitive"} target="_blank">
                                <Github />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-sm">View Source Code</p>
                        </TooltipContent>
                    </Tooltip>
                </section>
                <section>
                    <h6 className="text-lg font-semibold">Overview</h6>
                    <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                        Pet health management app that helps pet owners keep track of their pets&apos; health records,
                        appointments, and medications. Built with React Next.Js, Vercel, Tailwind CSS, and PostgreSQL.
                    </p>
                </section>
                <Separator className="my-4" />
                <section>
                    <h6 className="text-lg font-semibold">Technologies Used</h6>
                    <ul className="list-disc ml-5 mt-2 text-neutral-700 dark:text-neutral-300">
                        <li>React Next.Js</li>
                        <li>Vercel</li>
                        <li>Tailwind CSS</li>
                        <li>PostgreSQL</li>
                        <li>Prisma</li>
                        <li>TypeScript</li>
                    </ul>
                </section>
                <Separator className="my-4" />
                <section>
                    <h6 className="text-lg font-semibold">Snapshots</h6>
                    <ImageGallery images={snapshotLinks} />
                </section>
            </div>
        </main>
    );
};

export default PawsitiveDetails;
