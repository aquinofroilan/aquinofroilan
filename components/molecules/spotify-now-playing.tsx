"use client";

import { useEffect, useRef, useState } from "react";
import { getNowPlaying } from "@/actions";
import { Spotify } from "@/components/atoms";
import { Skeleton } from "@/components/ui";
import Link from "next/link";

export const SpotifyNowPlaying = () => {
    const [loading, setLoading] = useState(true);
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
            if (data === null) {
                setNowPlaying(null);
                setLocalTimePlayed(0);
                lastUpdateTimeRef.current = null;
            }
        } catch {
            return;
        } finally {
            setLoading(false);
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

    if (loading) {
        return (
            <div className="flex flex-row items-center gap-1 text-xs text-muted-foreground mt-4 justify-start w-full">
                <Spotify className="w-4 h-4" />
                <Skeleton className="h-4 w-20" />
                <span>·</span>
                <Skeleton className="h-4 w-20" />
                <span>·</span>
                <Skeleton className="h-4 w-10" />
            </div>
        );
    }

    if (!nowPlaying || !nowPlaying.isPlaying) return null;

    const secondsPlayed = Math.floor(localTimePlayed / 1000);
    const minutesPlayed = Math.floor(secondsPlayed / 60);
    const formattedSecondsPlayed = (secondsPlayed % 60).toString().padStart(2, "0");

    const remainingTimeMs = Math.max(0, nowPlaying.timeTotal - localTimePlayed);
    const secondsRemaining = Math.floor(remainingTimeMs / 1000);
    const minutesRemaining = Math.floor(secondsRemaining / 60);
    const formattedSecondsRemaining = (secondsRemaining % 60).toString().padStart(2, "0");

    return (
        <div className="flex flex-row items-center gap-1 text-xs text-muted-foreground mt-4 justify-start w-full">
            <Spotify className="w-4 h-4" />
            <span>-</span>
            <Link
                href={nowPlaying.songUrl}
                target="_blank"
                className="hover:underline font-medium text-foreground truncate max-w-[150px]"
            >
                {nowPlaying.title}
            </Link>
            <span>·</span>
            <Link href={nowPlaying.artistUrl} target="_blank" className="hover:underline truncate max-w-[150px]">
                {nowPlaying.artist}
            </Link>
            <span>·</span>
            <span className="whitespace-nowrap">
                {minutesPlayed}:{formattedSecondsPlayed}-{minutesRemaining}:{formattedSecondsRemaining}
            </span>
        </div>
    );
};
