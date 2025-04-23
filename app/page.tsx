import React from "react";
import { certificationsListsPreview } from "@/app/data/CertificationsListsPreview";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmbedCard from "@/components/embed_card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Me from "@/public/images/me.webp";
import { FaAndroid, FaNodeJs, FaReact } from "react-icons/fa";
import Image from "next/image";
import NowPlayingWidget from "@/components/widget/NowPlayingWidget";

export default function Home() {
  return (
    <>
      <div className="w-full flex justify-center flex-col items-center">
        <div className="w-11/12 max-w-7xl gap-y-10 flex pt-5 flex-col items-center justify-center">
          <div className="flex flex-col lg:flex-row-reverse gap-5 w-full md:w-11/12">
            <div className="w-full flex justify-center relative items-center">
              <FaAndroid
                size={125}
                className="top-0 left-[15%] absolute fill-[#3DDB86]"
              />
              <FaNodeJs
                size={125}
                className="absolute bottom-0 z-20 right-[5%] fill-[#24B45D]"
              />
              <FaReact
                size={125}
                className="absolute duration-20000 animate-spin z-30 top-[50%] left-0 fill-[#62ADFC]"
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
                <Badge
                  variant={"secondary"}
                  className="w-fit font-semibold text-md"
                >
                  🐧 Filling in learning gaps
                </Badge>
                <h1 className="font-bold text-xl md:text-3xl">
                  Hi! I am Froilan Aquino
                </h1>
                <p className="text-xs md:text-base">
                  Software Developer Based In Caloocan Philippines
                </p>
              </div>
              <Button asChild className="w-fit">
                <Link
                  target="_blank"
                  className="flex items-center gap-2"
                  href={"https://discord.gg/6Tfcg6Ta8N"}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Discord</title>
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                  Join My Discord
                </Link>
              </Button>
              <NowPlayingWidget className="w-full max-w-xl" />
            </div>
          </div>
          <div className="w-full flex flex-col pb-3 items-center">
            <h1 className="text-left self-start font-bold text-3xl lg:font-extrabold md:text-2xl lg:text-3xl xl:text-5xl">
              Certifications & Badges
            </h1>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-3 md:gap-10 lg:gap-20">
            {certificationsListsPreview.map((cert, index) => {
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center items-center">
                    <EmbedCard badge_id={cert.badge_id} />
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
