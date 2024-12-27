import { useQuery } from "@tanstack/react-query";

import { DayMessage } from "../types";

import { API_URL } from "@/modules/shared/constants";

const fetchTodayMessage = async () => {
  const today = new Date();

  // Create the query parameters
  const queryParams = new URLSearchParams({
    created_at: today.toISOString().split("T")[0],
    user: localStorage.getItem("username") || "",
  });

  const response = await fetch(`${API_URL}/messages/?${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
      username: localStorage.getItem("username") || "",
    },
  });

  const messages: DayMessage[] = await response.json();

  if (!messages.length) {
    return null;
  }

  return messages[0];
};

export const useTodaySentMessage = () => {
  return useQuery<DayMessage | null>({
    queryKey: ["today-sent-message"],
    queryFn: fetchTodayMessage,
  });
};
