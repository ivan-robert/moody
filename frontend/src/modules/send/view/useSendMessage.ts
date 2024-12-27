import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/modules/shared/constants";
import { queryClient } from "@/modules/shared/query-client";

const sendMessage = async (message: string) => {
  const response = await fetch(`${API_URL}/messages/`, {
    body: JSON.stringify({ body: message }),
    headers: {
      "Content-Type": "application/json",
      username: localStorage.getItem("username") || "",
    },
    method: "POST",
  });

  return await response.json();
};

export const useSendMessage = () => {
  return useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (message: string) => {
      return await sendMessage(message);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["today-sent-message"] });
    },
  });
};
