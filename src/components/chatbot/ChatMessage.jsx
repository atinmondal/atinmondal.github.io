import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function ChatMessage({ role, content, isLoading }) {
  const isBot = role === "bot";

  return (
    <motion.div
      className={`flex gap-2 ${isBot ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-1">
          <HiSparkles className="text-primary" size={14} />
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? "bg-white/5 border border-white/10 rounded-xl rounded-bl-sm text-gray-300"
            : "bg-primary/20 border border-primary/20 rounded-xl rounded-br-sm text-gray-200"
        }`}
      >
        {isLoading ? (
          <div className="flex gap-1 py-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/60"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        ) : (
          content
        )}
      </div>

      {!isBot && (
        <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
          <FiUser className="text-gray-400" size={14} />
        </div>
      )}
    </motion.div>
  );
}
