import Me from "@/public/images/me.webp";
import Image from "next/image";
import { BadgeCheckIcon, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
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
            className={className}
        >
            <Card className="w-full h-full">
                <CardContent className="flex flex-row gap-5 p-6">
                    <div className="flex-shrink-0 md:block flex justify-center items-center">
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

                    <div className="flex flex-col justify-center flex-1 min-w-0">
                        <div className="flex flex-row gap-2 items-center">
                            <h1 className="font-bold text-md lg:text-lg">Froilan Aquino</h1>
                            <BadgeCheckIcon size={15} color="#0087ED" />
                        </div>
                        <p className="text-[11px] md:text-base  flex items-center gap-2">
                            <MapPin size={15} />
                            <span className="truncate">Caloocan City, MNL, PH</span>
                        </p>
                        <p className="text-[11px] lg:text-base">
                            {process.env.PAGE_TITLE ? String(process.env.PAGE_TITLE).slice(10) : "Software Engineer"}
                        </p>

                        <div className="flex flex-row gap-2 mt-3 justify-start items-start">
                            <Button
                                className="text-white rounded-md flex flex-row gap-2"
                                asChild
                                variant={"default"}
                                size={"sm"}
                            >
                                <Link href={process.env.SCHEDULE_A_CALL_URL as string} target="_blank">
                                    <Phone className="hidden md:block" size={16} />
                                    <span>Schedule a call</span>
                                </Link>
                            </Button>
                            <Button className="rounded-md flex flex-row gap-2" asChild variant={"outline"} size={"sm"}>
                                <Link href={process.env.SEND_EMAIL_URL as string} target="_blank" rel="noopener noreferrer">
                                    <Mail className="hidden md:block" size={16} />
                                    <span>Send email</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
