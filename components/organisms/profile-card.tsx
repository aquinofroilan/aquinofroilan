import Me from "@/public/images/me.webp";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const ProfileCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full flex flex-row gap-5", className)}>
            <Image
                priority={true}
                src={Me}
                quality={75}
                width={200}
                height={200}
                alt="Picture of the Developer"
                className="rounded-lg"
            />

            <div>
                <Badge variant={"secondary"}>🐧 Learning Figma</Badge>
                <h1 className="font-bold text-3xl">Froilan Aquino</h1>
                <h1 className="text-xs md:text-base">Web Developer</h1>
                <h1 className="text-xs md:text-base flex items-center gap-2">
                    <MapPin size={16} />
                    Caloocan City, Metro Manila, Philippines
                </h1>

                <div className="flex flex-row gap-2 mt-3">
                    <Button className="text-white px-4 py-2 rounded-md mt-2 w-fit flex flex-row gap-3 " asChild>
                        <Link href={"https://calendly.com/froilaniminida/15min"} target="_blank" rel="noreferrer">
                            <Phone size={16} />
                            Schedule a call
                        </Link>
                    </Button>
                    <Button
                        className="px-4 py-2 rounded-md mt-2 ml-2 w-fit flex flex-row gap-3"
                        asChild
                        variant={"outline"}
                        rel="noreferrer"
                    >
                        <Link href={"mailto:froilan.j.aquino@gmail.com"} target="_blank">
                            <Mail size={16} />
                            Send email
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
