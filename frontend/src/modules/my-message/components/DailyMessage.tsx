import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

import { DayMessage } from "@/modules/send/types";

type Props = {
  message: DayMessage;
};

const MyMessage: React.FC<Props> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < message.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message.text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, message.text]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 md:p-12 text-center max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        className="text-6xl mb-8"
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        💌
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="w-full backdrop-blur-sm bg-default-100/90 p-8 md:p-10 rounded-2xl shadow-lg border border-default-200"
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        <motion.p
          animate={{ opacity: isComplete ? 1 : 0.7 }}
          className="font-medium text-xl md:text-2xl leading-relaxed text-default-800"
          transition={{ duration: 0.3 }}
        >
          {displayedText}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default memo(MyMessage);
