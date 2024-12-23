import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { API_URL } from "@/modules/shared/constants";
import { LoginRedirect } from "@/modules/shared/view/LoginRedirect";

type LoginForm = {
  username: string;
};

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      username: "",
    },
  });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (username: string) => {
      const response = await fetch(`${API_URL}/auth/users/create_user/`, {
        body: JSON.stringify({ username }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userObject = await response.json();

      localStorage.setItem("username", userObject.username);
      localStorage.setItem("password", userObject.password);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutate(data.username);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <LoginRedirect />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Welcome Back! ✨
          </h1>
        </motion.div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                classNames={{
                  label: "text-white",
                  input: "text-white",
                }}
                errorMessage={error?.message}
                isInvalid={!!error}
                labelPlacement="outside"
                placeholder="Enter your username"
                variant="bordered"
              />
            )}
            rules={{ required: "Username is required" }}
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="w-full bg-white text-blue-600 font-semibold hover:bg-white/90 transition-all"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </motion.div>
        </form>

        <p className="mt-6 text-sm text-white/80 text-center">
          Enter your username to continue
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
