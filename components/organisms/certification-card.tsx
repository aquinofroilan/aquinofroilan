import { BadgeCheckIcon, ArrowRightCircle } from "lucide-react";
import { BentoGridItem } from "@/components/ui";
import { CertificationsListsPreview } from "@/data/certification-list-preview";
import Link from "next/link";

const CertificationCard = ({ className }: { className?: string }) => {
    return (
        <BentoGridItem
            className={className}
            icon={<BadgeCheckIcon size={15} />}
            title={
                <div className="flex gap-2 items-center justify-between w-full">
                    <h1>Certifications and Badges</h1>
                    <Link
                        href={"/certifications"}
                        className="text-xs md:text-base text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200 flex items-center gap-2"
                    >
                        View All
                        <ArrowRightCircle size={15} />
                    </Link>
                </div>
            }
            description={
                <div className="w-full flex flex-col gap-3">
                    {CertificationsListsPreview.slice(0, 4).map((cert) => {
                        return (
                            <Link
                                href={cert.link}
                                target="_blank"
                                rel="noreferrer"
                                key={cert.link}
                                className="flex gap-2 items-center bg-neutral-100 p-5 rounded-md hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition duration-200"
                            >
                                <div>
                                    <h1 className="text-xs md:text-base">{cert.title}</h1>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            }
        />
    );
};

export default CertificationCard;
