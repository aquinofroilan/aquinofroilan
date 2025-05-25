import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BentoGridItem } from "@/components/ui";
import { CertificationsListsPreview } from "@/data/certification-list-preview";

function Certifications() {
    return (
        <main className="py-10 w-11/12 max-w-5xl gap-2 flex flex-col md:grid md:grid-cols-2">
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
                    {CertificationsListsPreview.map((c) => {
                        return (
                            <Link href={c.link} target="_blank" key={c.link}>
                                <BentoGridItem
                                    title={<h1 className="text-lg">{c.title}</h1>}
                                    description={<h1 className="text-xs md:text-base">{c.description}</h1>}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default Certifications;
