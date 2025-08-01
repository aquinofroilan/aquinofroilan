import { BadgeCheckIcon, ArrowRightCircle } from "lucide-react";
import { BentoGridItem } from "@/components/ui";
import { CertificationsListsPreview } from "@/data/certification-list-preview";
import Link from "next/link";
import * as motion from "motion/react-client";

export const CertificationCard = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.3,
            }}
            className={className}
        >
            <BentoGridItem
                className="w-full h-full"
                icon={<BadgeCheckIcon size={15} />}
                title={
                    <div className="flex gap-2 items-center justify-between w-full">
                        <h1 className="text-lg">Certifications</h1>
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
                                    className="flex gap-2 items-center p-5 rounded-md border transition duration-200"
                                >
                                    <div>
                                        <h1 className="text-sm md:text-base">{cert.title}</h1>
                                        <p>{cert.description}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                }
            />
        </motion.div>
    );
};
