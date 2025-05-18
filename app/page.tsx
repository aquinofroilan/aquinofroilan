import React from "react";
import { CertificationsListsPreview } from "@/data/certification-list-preview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from "@/components/ui";
import Link from "next/link";
import Me from "@/public/images/me.webp";
import { FaAndroid, FaNodeJs, FaReact } from "react-icons/fa";
import Image from "next/image";
import { Send } from "lucide-react";
import NowPlayingWidget from "@/components/widget/now-playing-widget";

export default function Home() {
    return (
        <>
            <div className="w-full flex justify-center flex-col items-center">
                <div className="w-11/12 max-w-7xl gap-y-10 flex pt-5 flex-col items-center justify-center">
                    <div className="flex flex-col lg:flex-row-reverse gap-5 w-full md:w-11/12">
                        <div className="w-full flex justify-center relative items-center">
                            <FaAndroid size={125} className="top-0 left-[15%] absolute fill-[#3DDB86]" />
                            <FaNodeJs size={125} className="absolute bottom-0 z-20 right-[5%] fill-[#24B45D]" />
                            <FaReact
                                size={125}
                                className="absolute duration-40000 animate-spin z-30 top-[50%] left-0 fill-[#62ADFC]"
                            />
                            <Image
                                priority={true}
                                src={Me}
                                quality={50}
                                width={400}
                                height={400}
                                alt="Picture of the Developer"
                            />
                        </div>
                        <div className="w-full flex flex-col justify-center relative gap-10 items-left">
                            <div className="w-3/4 flex gap-3 justify-center flex-col items-left">
                                <Badge variant={"secondary"} className="w-fit font-semibold text-md">
                                    🐧 Learning Figma
                                </Badge>
                                <h1 className="font-bold text-xl md:text-3xl">Hi! I am Froilan Aquino</h1>
                                <p className="text-xs md:text-base">Software Developer Based In Caloocan Philippines</p>
                            </div>
                            <Button asChild className="w-fit">
                                <Link
                                    target="_blank"
                                    className="flex items-center gap-2"
                                    href={"mailto:froilan.j.aquino@gmail.com"}
                                >
                                    <Send size={20} />
                                    Send me an email
                                </Link>
                            </Button>
                            <NowPlayingWidget className="w-full" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col pb-3 items-center">
                        <h1 className="text-left self-start font-bold text-3xl lg:font-extrabold md:text-2xl lg:text-3xl xl:text-5xl">
                            Certifications & Badges
                        </h1>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-3 md:gap-10 lg:gap-20">
                        {CertificationsListsPreview.map((cert) => {
                            return (
                                <Card key={cert.title}>
                                    <CardHeader>
                                        <CardTitle>{cert.title}</CardTitle>
                                        <CardDescription>{cert.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col justify-center items-center">
                                        <Image src={cert.image} alt={cert.description} width={150} height={150} />
                                        <Button asChild className="w-full mt-3" variant="default">
                                            <Link href={cert.link}>View</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
