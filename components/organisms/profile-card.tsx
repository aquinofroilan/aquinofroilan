import Me from "@/public/images/me.webp";
import Image from "next/image";
import { BadgeCheckIcon, GitCommitVertical, GitPullRequest, Mail, MapPin, MessageSquare, Phone, Star } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardContent, CardFooter } from "@/components/ui";
import { SpotifyNowPlaying } from "@/components/molecules";
import { getGithubStats } from "@/actions";

export const ProfileCard = async ({ className }: { className?: string }) => {
    let githubStats;
    try {
        githubStats = await getGithubStats();
    } catch {
        githubStats = null;
    }

    return (
        <div className={className}>
            <Card className="w-full h-full">
                <CardContent className="flex flex-row items-center gap-5 p-6">
                    <div className="shrink-0 md:block flex justify-center items-center">
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
                            {process.env.CURRENT_TITLE || "Software Engineer"} - {process.env.CURRENT_COMPANY || ""} -{" "}
                            {process.env.CURRENT_WORK_LOCATION || "Philippines"}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                    {githubStats && (
                        <div className="w-full grid grid-cols-4 text-xs text-muted-foreground">
                            <div className="flex flex-col items-center gap-0.5">
                                <Star size={14} />
                                <span className="font-medium text-foreground">{githubStats.stars}</span>
                                <span>stars</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                                <GitPullRequest size={14} />
                                <span className="font-medium text-foreground">{githubStats.pullRequests}</span>
                                <span>PRs</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                                <MessageSquare size={14} />
                                <span className="font-medium text-foreground">{githubStats.issues}</span>
                                <span>issues</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                                <GitCommitVertical size={14} />
                                <span className="font-medium text-foreground">{githubStats.commits}</span>
                                <span>commits</span>
                            </div>
                        </div>
                    )}
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
                    <SpotifyNowPlaying />
                </CardFooter>
            </Card>
        </div>
    );
};
