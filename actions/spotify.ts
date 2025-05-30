"use server";
import { getAccessToken } from "@/actions";

export const getNowPlaying = async () => {
    const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        console.error("Missing Spotify credentials in environment variables");
        return null;
    }
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
