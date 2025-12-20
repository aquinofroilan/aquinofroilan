import Me from "@/public/images/me.webp";
import Image from "next/image";
import { BadgeCheckIcon, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardContent, CardFooter } from "@/components/ui";
import { cn } from "@/lib/utils";

export const ProfileCard = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardContent className="flex flex-row items-center gap-5 p-6">
                    <div className="flex-shrink-0 md:block flex justify-center items-center">
                        <Image
                            priority={true}
                            src={Me}
                            quality={75}
                            width={75}
                            height={75}
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
                        <p className="text-[11px] md:text-sm flex items-center gap-2">
                            <MapPin size={15} />
                            <span className="truncate">Caloocan City, MNL, PH</span>
                        </p>
                        <p className="text-[11px] md:text-sm">
                            {process.env.PAGE_TITLE ? String(process.env.PAGE_TITLE).slice(10) : "Software Engineer"}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <div className="flex flex-row gap-2 w-full">
                        <Button
                            className="text-white rounded-md flex flex-row gap-2 flex-1"
                            asChild
                            variant={"default"}
                            size={"sm"}
                        >
                            <Link href={process.env.SCHEDULE_A_CALL_URL as string} target="_blank">
                                <Phone className="hidden md:block" size={16} />
                                <span>Schedule a call</span>
                            </Link>
                        </Button>
                        <Button
                            className="rounded-md flex flex-row gap-2 flex-1"
                            asChild
                            variant={"outline"}
                            size={"sm"}
                        >
                            <Link href={process.env.SEND_EMAIL_URL as string} target="_blank" rel="noopener noreferrer">
                                <Mail className="hidden md:block" size={16} />
                                <span>Send email</span>
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};
