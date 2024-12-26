import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const FormSuccess: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        className="text-6xl mb-6"
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8],
        }}
      >
        😊
      </motion.div>

      <motion.h2
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        Message Sent Successfully!
      </motion.h2>

      <motion.p
        animate={{ opacity: 1 }}
        className="text-default-600 mb-8"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        Thank you for sharing your mood with us today.
      </motion.p>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="h-4" />
        <Button
          className="font-semibold"
          color="primary"
          size="lg"
          variant="shadow"
          onPress={() => navigate("/")}
        >
          Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default memo(FormSuccess);
