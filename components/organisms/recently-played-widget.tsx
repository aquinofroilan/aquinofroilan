"use client";
import { useState, useEffect } from "react";
import { Music, Clock } from "lucide-react";
import { BentoGridItem } from "@/components/ui";
import { getRecentlyPlayed } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { Spotify } from "@/components/atoms";

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

export const RecentlyPlayedWidget = ({ className }: { className?: string }) => {
    const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayedTrack[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchRecentlyPlayed = async () => {
        try {
            setLoading(true);
            const data = await getRecentlyPlayed(5);
            setRecentlyPlayed(data);
        } catch (error) {
            console.error("Error fetching recently played tracks:", error);
            setRecentlyPlayed(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecentlyPlayed();
        const interval = setInterval(fetchRecentlyPlayed, 5 * 60 * 1000);
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
                <BentoGridItem
                    className="w-full h-full"
                    icon={<Spotify className="w-4 h-4" />}
                    title={<h1 className="text-lg">Recently Played</h1>}
                    description={
                        <div className="flex items-center justify-center h-32">
                            <p className="text-sm text-muted-foreground">Loading...</p>
                        </div>
                    }
                />
            </motion.div>
        );
    }

    if (!recentlyPlayed || recentlyPlayed.length === 0) {
        return null;
    }

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
            <BentoGridItem
                className="w-full h-full"
                icon={<Spotify className="w-4 h-4" />}
                title={<h1 className="text-lg">Recently Played</h1>}
                description={
                    <div className="flex flex-col gap-3 w-full">
                        {recentlyPlayed.slice(0, 3).map((track, index) => (
                            <div
                                key={`${track.songUrl}-${index}`}
                                className="flex flex-row w-full items-center gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0"
                            >
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
                                        <Clock className="w-3 h-3" />
                                        <span>{formatPlayedAt(track.playedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />
        </motion.div>
    );
};
