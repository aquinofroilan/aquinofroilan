import querystring from "querystring";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export const getAccessToken = async (
  client_id: string,
  client_secret: string,
  refresh_token: string,
) => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
  try {
    const { access_token } = await getAccessToken(
      client_id!,
      client_secret!,
      refresh_token!,
    );

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
    const artist = song.item.artists
      .map((artist: { name: string }) => artist.name)
      .join(", ");
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
  } catch (error) {
    return null;
  }
};
