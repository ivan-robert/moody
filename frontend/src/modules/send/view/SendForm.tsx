import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "@nextui-org/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { z } from "zod";

import { useSendMessage } from "./useSendMessage";

const formValuesSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formValuesSchema>;

const SendForm: React.FC = () => {
  const { mutate, isPending } = useSendMessage();
  const { control, handleSubmit, formState, watch } = useForm<FormValues>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(formValuesSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(formState.errors);
    mutate(data.message);
  };

  return (
    <form
      className="w-full max-w-2xl mx-auto space-y-4 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="message"
        render={({ field }) => (
          <Textarea
            {...field}
            className="min-h-[200px]"
            label="Message"
            placeholder="Type your message here..."
          />
        )}
      />

      <div className="h-4" />

      <motion.div
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
        whileHover={{
          scale: 1.02,
          y: -5,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className="w-full group relative overflow-hidden shadow-lg hover:shadow-primary/50"
          color={formState.errors.message ? "danger" : "primary"}
          isDisabled={watch("message") === ""}
          isLoading={isPending}
          type="submit"
        >
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
            Send{" "}
            <PiPaperPlaneTilt className="ml-2 text-xl text-white animate-bounce" />
          </span>
        </Button>
      </motion.div>
      {formState.errors.message && (
        <p className="text-danger text-sm mt-2">
          {formState.errors.message.message}
        </p>
      )}
    </form>
  );
};

export default memo(SendForm);
