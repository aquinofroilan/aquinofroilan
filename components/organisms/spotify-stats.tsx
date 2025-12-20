"use client";
import { useState, useEffect, useRef } from "react";
import { Music, Clock, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Progress, Separator } from "@/components/ui";
import { getNowPlaying, getRecentlyPlayed, getTopTracks } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { Spotify } from "@/components/atoms";
import Loading from "@/app/loading";

type RecentlyPlayedTrack = {
    albumImageUrl: string;
    artist: string;
    songUrl: string;
    title: string;
    artistUrl: string;
    playedAt: string;
    albumName: string;
    duration: number;
};

type TopTrack = {
    albumImageUrl: string;
    artist: string;
    songUrl: string;
    title: string;
    artistUrl: string;
    albumName: string;
    duration: number;
    popularity: number;
};

type TabType = "recent" | "top";

export const SpotifyCard = ({ className }: { className?: string }) => {
    const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayedTrack[] | null>(null);
    const [topTracks, setTopTracks] = useState<TopTrack[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>("recent");
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
        progress = Math.min(100, Math.max(0, (localTimePlayed / nowPlaying.timeTotal) * 100));
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const [recentData, topData] = await Promise.all([getRecentlyPlayed(6), getTopTracks(6, "long_term")]);
            setRecentlyPlayed(recentData);
            setTopTracks(topData);
        } catch (error) {
            console.error("Error fetching Spotify data:", error);
            setRecentlyPlayed(null);
            setTopTracks(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const formatPlayedAt = (playedAt: string) => {
        const date = new Date(playedAt);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: 0.3,
                }}
                className={cn("", className)}
            >
                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Spotify className="w-4 h-4" />
                            <span className="text-lg">Spotify Stats</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-32">
                            <Loading />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    if ((!recentlyPlayed || recentlyPlayed.length === 0) && (!topTracks || topTracks.length === 0)) {
        return null;
    }

    const currentTracks = activeTab === "recent" ? recentlyPlayed : topTracks;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.3,
            }}
            className={cn("", className)}
        >
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Spotify className="w-4 h-4" />
                            <span className="text-lg">Spotify Stats</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab("recent")}
                                className={cn(
                                    "px-3 py-1 text-xs rounded-md transition-colors",
                                    activeTab === "recent"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                                )}
                            >
                                <Clock className="w-3 h-3 inline mr-1" />
                                Recent
                            </button>
                            <button
                                onClick={() => setActiveTab("top")}
                                className={cn(
                                    "px-3 py-1 text-xs rounded-md transition-colors",
                                    activeTab === "top"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                                )}
                            >
                                <TrendingUp className="w-3 h-3 inline mr-1" />
                                Top
                            </button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col w-full gap-4">
                        <div
                            className={cn(
                                "flex items-center w-full gap-4",
                                !nowPlaying || !nowPlaying.isPlaying ? "hidden" : "",
                            )}
                        >
                            {nowPlaying != null && albumImageUrl ? (
                                <Link target="_blank" href={songUrl ? songUrl : ""} rel="noopener noreferrer">
                                    <Image
                                        src={albumImageUrl}
                                        alt={title && artist ? `Album art for ${title} by ${artist}` : "Album art"}
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
                                    <Progress aria-label="song progress" value={progress ?? 0} />
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
                        <Separator className={cn(nowPlaying ? "block" : "hidden")} />
                        <div className="flex flex-col gap-3 w-full">
                            {currentTracks && currentTracks.length > 0 ? (
                                currentTracks.map((track, index) => (
                                    <div
                                        key={`${track.songUrl}-${index}`}
                                        className="flex flex-row w-full items-center gap-3 pb-3"
                                    >
                                        <h1>#{index + 1}</h1>
                                        {track.albumImageUrl ? (
                                            <Link
                                                target="_blank"
                                                href={track.songUrl}
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0"
                                            >
                                                <Image
                                                    src={track.albumImageUrl}
                                                    alt={`Album art for ${track.title} by ${track.artist}`}
                                                    width={60}
                                                    height={60}
                                                    className="rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                                                />
                                            </Link>
                                        ) : (
                                            <div className="w-[60px] h-[60px] flex items-center justify-center bg-muted rounded-sm flex-shrink-0">
                                                <Music className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                                            <Link
                                                target="_blank"
                                                className="text-sm font-semibold overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline underline-offset-2"
                                                rel="noopener noreferrer"
                                                href={track.songUrl}
                                            >
                                                {track.title}
                                            </Link>
                                            <Link
                                                className="text-xs font-regular text-muted-foreground cursor-pointer hover:underline underline-offset-2 overflow-hidden whitespace-nowrap text-ellipsis"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={track.artistUrl}
                                            >
                                                {track.artist}
                                            </Link>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                {activeTab === "recent" && "playedAt" in track ? (
                                                    <>
                                                        <Clock className="w-3 h-3" />
                                                        <span>{formatPlayedAt(track.playedAt)}</span>
                                                    </>
                                                ) : activeTab === "top" && "popularity" in track ? (
                                                    <>
                                                        <TrendingUp className="w-3 h-3" />
                                                        <span>Popularity: {track.popularity}</span>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-32">
                                    <p className="text-sm text-muted-foreground">No tracks available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
