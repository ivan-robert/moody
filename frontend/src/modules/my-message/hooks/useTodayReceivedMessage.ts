import { useQuery } from "@tanstack/react-query";

import { DayMessage } from "@/modules/send/types";
import { API_URL } from "@/modules/shared/constants";

const fetchTodayMessage = async () => {
  const today = new Date();

  const queryParams = new URLSearchParams({
    created_at: today.toISOString().split("T")[0],
    destination: localStorage.getItem("username") || "",
  });

  const response = await fetch(`${API_URL}/messages/?${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
      username: localStorage.getItem("username") || "",
    },
  });

  if (response.status === 404) {
    return null;
  }

  const content: DayMessage[] = await response.json();

  if (!content.length) {
    return null;
  }

  return content[0];
};

export const useTodayReceivedMessage = () => {
  return useQuery<DayMessage | null>({
    queryKey: ["today-received-message"],
    queryFn: fetchTodayMessage,
  });
};
