import { fetchImagesWithPrefix } from "@/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { Github } from "@/components/atoms";

const SynectixDetails = async () => {
    const snapshotLinks = await fetchImagesWithPrefix("synectix-");
    console.log(snapshotLinks);
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
                            <Link href={"https://github.com/aquinofroilan/synectix"}>
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
                        Synectix is a comprehensive Enterprise Resource Planning (ERP) system tailored for hobbyist
                        businesses and small-to-medium enterprises. Its backend, built with modern Java technologies,
                        delivers robust solutions for inventory management, warehouse operations, user management, and
                        business analytics.
                    </p>
                </section>
                <Separator className="my-4" />
                <section>
                    <h6 className="text-lg font-semibold">Technologies Used</h6>
                    <ul className="list-disc ml-5 mt-2 text-neutral-700 dark:text-neutral-300">
                        <li>Java</li>
                        <li>Spring Boot</li>
                        <li>PostgreSQL</li>
                        <li>Angular</li>
                        <li>TypeScript</li>
                    </ul>
                </section>
                <Separator className="my-4" />
                <section>
                    <h6 className="text-lg font-semibold">Snapshots</h6>
                    <div className="flex flex-col items-center lg:grid grid-cols-2 gap-4">
                        {snapshotLinks.map((image) => (
                            <div key={image.key} className="my-2">
                                <Image
                                    src={image.url}
                                    alt={image.key as string}
                                    width={500}
                                    height={300}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SynectixDetails;
