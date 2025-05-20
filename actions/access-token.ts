import querystring from "querystring";

export const getAccessToken = async (client_id: string, client_secret: string, refresh_token: string) => {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

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
