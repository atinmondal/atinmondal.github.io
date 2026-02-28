import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <motion.div
      className={`relative bg-gray-900/70 border border-white/10 backdrop-blur-xl rounded-xl p-6 overflow-hidden ${className}`}
      whileHover={
        hover
          ? {
              y: -8,
              borderColor: "rgba(59, 130, 246, 0.4)",
              transition: { duration: 0.3 },
            }
          : undefined
      }
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}
