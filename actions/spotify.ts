"use server";
import { getAccessToken } from "@/actions";

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

export const getNowPlaying = async () => {
    const client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

    if (!client_id || !client_secret || !refresh_token) {
        console.error("Missing Spotify credentials in environment variables");
        return null;
    }
    const { access_token } = await getAccessToken(client_id!, client_secret!, refresh_token!);

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (response.status > 400) {
        throw new Error("Unable to Fetch Song");
    } else if (response.status === 204) {
        throw new Error("Currently Not Playing");
    }

    const song = await response.json();
    if (!song.item) {
        throw new Error("Currently Not Playing");
    }
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
