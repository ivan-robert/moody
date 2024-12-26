import { useQuery } from "@tanstack/react-query";

import { DayMessage } from "../types";

import { API_URL } from "@/modules/shared/constants";

const fetchTodayMessage = async () => {
  const response = await fetch(`${API_URL}/messages/messages/today/`, {
    headers: {
      "Content-Type": "application/json",
      username: localStorage.getItem("username") || "",
    },
  });

  if (response.status === 404) {
    return null;
  }

  return await response.json();
};

export const useTodaySentMessage = () => {
  return useQuery<DayMessage | null>({
    queryKey: ["today-sent-message"],
    queryFn: fetchTodayMessage,
  });
};
