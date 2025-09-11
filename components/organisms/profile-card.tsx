import Me from "@/public/images/me.webp";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";

export const ProfileCard = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.1,
            }}
            className={cn("w-full flex flex-row gap-5", className)}
        >
            <div className="xs:w-1/3 md:block flex justify-center items-center">
                <Image
                    priority={true}
                    src={Me}
                    quality={75}
                    width={125}
                    height={125}
                    placeholder="blur"
                    alt="Picture of the Developer"
                    className="rounded-lg"
                />
            </div>

            <div>
                <h1 className="font-bold text-lg">Froilan Aquino</h1>
                <h1 className="text-xs md:text-base">
                    {process.env.PAGE_TITLE ? String(process.env.PAGE_TITLE).slice(10) : "Software Engineer"}
                </h1>
                <h1 className="text-xs md:text-base flex items-center gap-2">
                    <MapPin size={15} />
                    Caloocan City, MNL, PH
                </h1>

                <div className="flex flex-col md:flex-row gap-2 mt-3 justify-start items-start">
                    <Button
                        className="text-white rounded-md flex flex-row gap-2"
                        asChild
                        variant={"default"}
                        size={"sm"}
                    >
                        <Link href="https://calendly.com/froilan/15min" target="_blank">
                            <Phone size={16} />
                            Schedule a call
                        </Link>
                    </Button>
                    <Button className="rounded-md flex flex-row gap-2" asChild variant={"outline"} size={"sm"}>
                        <Link
                            href="mailto:aquino.froilan.dev@outlook.com?subject=Contact%20from%20Website"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Mail size={16} />
                            Send email
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
