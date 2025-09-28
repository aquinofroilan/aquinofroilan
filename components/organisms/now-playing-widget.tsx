"use client";
import { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";
import { BentoGridItem, Progress } from "@/components/ui";
import { getNowPlaying } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { Spotify } from "@/components/atoms";

export const NowPlayingWidget = ({ className }: { className?: string }) => {
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
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const lastUpdateTimeRef = useRef<number | null>(null);
    const apiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchNowPlaying = async () => {
        try {
            const data = await getNowPlaying();
            if (data !== null) {
                setNowPlaying(data);
                if (data && data.isPlaying) {
                    setLocalTimePlayed(data.timePlayed);
                    lastUpdateTimeRef.current = Date.now();
                }
            }
        } catch {
            return;
        }
    };

    const scheduleNextApiCall = (timeUntilSongEnds: number | null) => {
        if (apiTimeoutRef.current) {
            clearTimeout(apiTimeoutRef.current);
        }

        if (timeUntilSongEnds !== null && timeUntilSongEnds < 30000 && timeUntilSongEnds > 0) {
            const refreshTime = timeUntilSongEnds + 1000;
            apiTimeoutRef.current = setTimeout(fetchNowPlaying, refreshTime);
        } else {
            apiTimeoutRef.current = setTimeout(fetchNowPlaying, 30000);
        }
    };

    useEffect(() => {
        fetchNowPlaying().then();
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            if (apiTimeoutRef.current) {
                clearTimeout(apiTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        if (nowPlaying && nowPlaying.isPlaying) {
            const timeUntilSongEnds = nowPlaying.timeTotal - nowPlaying.timePlayed;

            scheduleNextApiCall(timeUntilSongEnds);

            progressIntervalRef.current = setInterval(() => {
                setLocalTimePlayed((prev) => {
                    if (!nowPlaying || !nowPlaying.isPlaying) return prev;

                    const currentTime = Date.now();
                    const elapsedSinceUpdate = lastUpdateTimeRef.current ? currentTime - lastUpdateTimeRef.current : 0;

                    const newTimePlayed = nowPlaying.timePlayed + elapsedSinceUpdate;

                    const remainingTime = nowPlaying.timeTotal - newTimePlayed;
                    if (remainingTime <= 5000 && remainingTime > 0) {
                        scheduleNextApiCall(remainingTime);
                    }

                    if (newTimePlayed >= nowPlaying.timeTotal) {
                        return nowPlaying.timeTotal;
                    }

                    return newTimePlayed;
                });
            }, 1000);
        } else {
            scheduleNextApiCall(null);
        }

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (nowPlaying && nowPlaying.isPlaying) {
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.5,
            }}
            className={cn(`${!nowPlaying || !nowPlaying.isPlaying ? "hidden" : ""} ${className}`)}
        >
            <BentoGridItem
                className="w-full h-full"
                icon={<Spotify />}
                title={<h1 className="text-lg">Now Playing</h1>}
                description={
                    <div className="flex flex-row w-full justify-start items-center gap-2">
                        {nowPlaying != null && albumImageUrl ? (
                            <Link target="_blank" href={songUrl ? songUrl : ""} rel="noopener noreferrer">
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
                        <div className="flex flex-col gap-1 w-full">
                            <h1 className="text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                {
                                    <Link
                                        target="_blank"
                                        className="cursor-pointer hover:underline underline-offset-2"
                                        rel="noopener noreferrer"
                                        href={songUrl ? songUrl : ""}
                                    >
                                        {title}
                                    </Link>
                                }
                            </h1>
                            <h1 className="text-sm font-regular">
                                {
                                    <Link
                                        className="cursor-pointer hover:underline underline-offset-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={artistUrl ? artistUrl : ""}
                                    >
                                        {artist}
                                    </Link>
                                }
                            </h1>
                            <div className="flex flex-col w-full gap-2">
                                <Progress aria-label="song progress" value={progress} />
                                <div className="w-full flex flex-row justify-between">
                                    <p className="text-xs text-muted-foreground">
                                        {minutesPlayed}:{secondsPlayed}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {minutesTotal}:{secondsTotal}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </motion.div>
    );
};
