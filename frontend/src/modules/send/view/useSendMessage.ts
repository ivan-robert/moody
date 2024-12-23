import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/modules/shared/constants";

const sendMessage = async (message: string) => {
  const response = await fetch(`${API_URL}/messages/messages/`, {
    body: JSON.stringify({ body: message }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  console.log("Response", await response.json());

  return await response.json();
};

export const useSendMessage = () => {
  return useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (message: string) => {
      console.log("Sending message", message);

      return await sendMessage(message);
    },
  });
};
