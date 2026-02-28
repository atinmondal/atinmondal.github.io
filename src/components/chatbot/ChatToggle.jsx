import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { FiX } from "react-icons/fi";

export default function ChatToggle({ isOpen, onClick }) {
  return (
    <motion.button
      className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
        isOpen
          ? "bg-gray-800 border border-white/10"
          : "bg-primary animate-pulse-glow"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Close chat" : "Open chat assistant"}
    >
      <motion.div
        key={isOpen ? "close" : "open"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <FiX size={22} className="text-gray-300" />
        ) : (
          <HiSparkles size={22} className="text-white" />
        )}
      </motion.div>
    </motion.button>
  );
}
