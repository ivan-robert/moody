import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { BiSolidHome } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFound: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
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
        <FaRegSadTear className="text-primary" />
      </motion.div>

      <motion.h2
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        404 - Page Not Found
      </motion.h2>

      <motion.p
        animate={{ opacity: 1 }}
        className="text-default-600 mb-8"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        {"The page you're looking for doesn't exist."}
      </motion.p>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className="font-semibold"
          color="primary"
          size="lg"
          startContent={<BiSolidHome className="text-xl" />}
          variant="shadow"
          onPress={() => navigate("/")}
        >
          Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default memo(NotFound);