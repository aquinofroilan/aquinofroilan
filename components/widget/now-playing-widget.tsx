"use client";
import { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Progress, Button } from "@/components/ui";
import { getNowPlaying } from "@/actions";
import Image from "next/image";
import Link from "next/link";

const SpotifyIcon = ({ className }: { className: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path fill="#1ed760" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z" />
        <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
    </svg>
);

const NowPlayingWidget = ({ className }: { className?: string }) => {
    const [nowPlaying, setNowPlaying] = useState<{
        isPlaying: boolean;
        timePlayed: number;
        timeTotal: number;
        albumImageUrl: string;
        title: string;
        artist: string;
        songUrl: string;
        artistUrl: string;
    } | null>(null);
    const [localTimePlayed, setLocalTimePlayed] = useState<number>(0);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastUpdateTimeRef = useRef<number | null>(null);

    // Function to fetch data and reset local state
    const fetchNowPlaying = async () => {
        const data = await getNowPlaying();
        if (data !== null) {
            setNowPlaying(data);
            if (data && typeof data !== "string" && data.isPlaying) {
                setLocalTimePlayed(data.timePlayed);
                lastUpdateTimeRef.current = Date.now();
            }
        }
    };

    useEffect(() => {
        fetchNowPlaying();

        const apiInterval = setInterval(() => {
            fetchNowPlaying();
        }, 30000);

        return () => {
            clearInterval(apiInterval);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);

    // Setup progress bar simulation
    useEffect(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        if (nowPlaying && typeof nowPlaying !== "string" && nowPlaying.isPlaying) {
            progressIntervalRef.current = setInterval(() => {
                setLocalTimePlayed((prev) => {
                    if (!nowPlaying || typeof nowPlaying === "string" || !nowPlaying.isPlaying) return prev;

                    const currentTime = Date.now();
                    const elapsedSinceUpdate = lastUpdateTimeRef.current ? currentTime - lastUpdateTimeRef.current : 0;

                    const newTimePlayed = nowPlaying.timePlayed + elapsedSinceUpdate;
                    if (newTimePlayed >= nowPlaying.timeTotal) {
                        return nowPlaying.timePlayed;
                    }

                    return newTimePlayed;
                });
            }, 1000);
        }

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [nowPlaying]);

    let secondsPlayed,
        songUrl,
        minutesPlayed,
        secondsTotal,
        minutesTotal,
        albumImageUrl,
        title,
        artist,
        artistUrl,
        progress;
    if (typeof nowPlaying === "string") {
        if (nowPlaying === "Currently Not Playing") {
            title = "User is";
            artist = "currently Offline";
        } else {
            title = "Failed to";
            artist = "fetch song";
        }
    } else if (nowPlaying && nowPlaying.isPlaying) {
        secondsPlayed = Math.floor(localTimePlayed / 1000);
        minutesPlayed = Math.floor(secondsPlayed / 60);
        secondsPlayed = (secondsPlayed % 60).toString().padStart(2, "0");

        secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
        minutesTotal = Math.floor(secondsTotal / 60);
        secondsTotal = (secondsTotal % 60).toString().padStart(2, "0");

        albumImageUrl = nowPlaying.albumImageUrl;
        title = nowPlaying.title;
        artist = nowPlaying.artist;
        songUrl = nowPlaying.songUrl;
        artistUrl = nowPlaying.artistUrl;
        progress = (localTimePlayed / nowPlaying.timeTotal) * 100;
    }
    return (
        <Card className={`${!nowPlaying || !nowPlaying.isPlaying ? "hidden" : ""} ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Froilan&apos;s Now Playing</CardTitle>
                <SpotifyIcon className="w-10 h-10" />
            </CardHeader>
            <CardContent className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-start items-center gap-2">
                    {nowPlaying != null && albumImageUrl ? (
                        <Link target="_blank" href={songUrl ? songUrl : ""}>
                            <Image
                                src={albumImageUrl}
                                alt="Album Image"
                                width={80}
                                height={80}
                                className="rounded-sm cursor-pointer"
                            />
                        </Link>
                    ) : (
                        <Music />
                    )}
                    <div className="flex flex-col gap-1 w-3/4 max-w-[75%]">
                        <h1 className="text-base font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                            {
                                <Link
                                    target="_blank"
                                    className="cursor-pointer hover:underline"
                                    href={songUrl ? songUrl : ""}
                                >
                                    {title}
                                </Link>
                            }
                        </h1>
                        <h1 className="text-sm font-regular">
                            {
                                <Link
                                    className="cursor-pointer hover:underline"
                                    target="_blank"
                                    href={artistUrl ? artistUrl : ""}
                                >
                                    {artist}
                                </Link>
                            }
                        </h1>
                        <div className="flex flex-col w-full gap-2">
                            <Progress aria-label="song progress" className="w-full" value={progress} />
                            <div className="w-full flex flex-row justify-between">
                                <p className="text-xs  text-muted-foreground">
                                    {minutesPlayed}:{secondsPlayed}
                                </p>
                                <p className="text-xs  text-muted-foreground">
                                    {minutesTotal}:{secondsTotal}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <CardFooter className="p-0 flex justify-start mt-3">
                    <Button asChild className="flex flex-row gap-4" variant="outline">
                        <Link target="_blank" className="flex items-center gap-2" href={songUrl ? songUrl : ""}>
                            <SpotifyIcon className="w-6 h-6" />
                            Play on Spotify
                        </Link>
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
};

export default NowPlayingWidget;
