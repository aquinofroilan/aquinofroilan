"use server";
import { cache } from "react";

export const FetchWakaTimeStats = cache(async () => {
    try {
        const response = await fetch("https://wakatime.com/api/v1/users/froilan/stats?including_today=true");
        const data = await response.json();
        if (response.status !== 200) throw new Error("Unable to fetch WakaTime stats");
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
});
