"use server";
import { getAccessToken } from "@/actions";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1/me";

const getTokens = () => {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        throw new Error("Missing Spotify credentials in environment variables");
    }
    return { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN };
};

export const getNowPlaying = async () => {
    const NOW_PLAYING_ENDPOINT = `${SPOTIFY_API_BASE}/player/currently-playing`;
    const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = getTokens();
    const { access_token } = await getAccessToken(CLIENT_ID!, CLIENT_SECRET!, REFRESH_TOKEN!);

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (response.status > 400 || response.status === 204) return null;

    const song = await response.json();
    if (!song.item) return null;
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((artist: { name: string }) => artist.name).join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;
    const artistUrl = song.item.album.artists[0].external_urls.spotify;

    return {
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        timePlayed,
        timeTotal,
        artistUrl,
    };
};

export const getRecentlyPlayed = async (limit: number = 6) => {
    const RECENTLY_PLAYED_ENDPOINT = `${SPOTIFY_API_BASE}/player/recently-played?limit=${limit}`;
    const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = getTokens();

    const { access_token } = await getAccessToken(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN);

    try {
        const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            next: { revalidate: 60 },
        });

        if (response.status > 400) {
            console.error("Failed to fetch recently played tracks");
            return null;
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        return data.items.map(
            (item: {
                track: {
                    album: { images: { url: string }[]; name: string };
                    artists: { name: string; external_urls: { spotify: string } }[];
                    external_urls: { spotify: string };
                    name: string;
                    duration_ms: number;
                };
                played_at: string;
            }) => ({
                albumImageUrl: item.track.album.images[0]?.url,
                artist: item.track.artists.map((artist: { name: string }) => artist.name).join(", "),
                songUrl: item.track.external_urls.spotify,
                title: item.track.name,
                artistUrl: item.track.artists[0]?.external_urls.spotify,
                playedAt: item.played_at,
                albumName: item.track.album.name,
                duration: item.track.duration_ms,
            }),
        );
    } catch (error) {
        console.error("Error fetching recently played tracks:", error);
        return null;
    }
};

export const getTopTracks = async (
    limit: number = 6,
    timeRange: "short_term" | "medium_term" | "long_term" = "short_term",
) => {
    const TOP_TRACKS_ENDPOINT = `${SPOTIFY_API_BASE}/top/tracks?limit=${limit}&time_range=${timeRange}`;
    const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = getTokens();
    const { access_token } = await getAccessToken(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN);

    try {
        const response = await fetch(TOP_TRACKS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            next: { revalidate: 3600 },
        });

        if (response.status > 400) {
            console.error("Failed to fetch top tracks");
            return null;
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        return data.items.map(
            (track: {
                album: { images: { url: string }[]; name: string };
                artists: { name: string; external_urls: { spotify: string } }[];
                external_urls: { spotify: string };
                name: string;
                duration_ms: number;
                popularity: number;
            }) => ({
                albumImageUrl: track.album.images[0]?.url,
                artist: track.artists.map((artist: { name: string }) => artist.name).join(", "),
                songUrl: track.external_urls.spotify,
                title: track.name,
                artistUrl: track.artists[0]?.external_urls.spotify,
                albumName: track.album.name,
                duration: track.duration_ms,
                popularity: track.popularity,
            }),
        );
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        return null;
    }
};
