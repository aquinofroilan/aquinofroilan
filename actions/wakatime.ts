"use server";
import axios from "axios";

export const FetchWakaTimeStats = async () => {
  try {
    const response = await axios.get(
      "https://wakatime.com/api/v1/users/froilanimnida/stats?including_today=true",
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
