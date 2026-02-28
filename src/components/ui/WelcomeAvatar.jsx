import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";

export default function WelcomeAvatar() {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 blur-3xl bg-primary/15 rounded-full scale-125 pointer-events-none" />

      {/* Speech bubble */}
      <motion.div
        className="relative bg-gray-900/90 border border-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 mb-4 z-10"
        initial={{ opacity: 0, scale: 0, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        <p className="text-base font-semibold text-white text-center">
          🙏 Namaste!
        </p>
        <p className="text-xs text-gray-400 text-center mt-0.5">
          Welcome to my portfolio
        </p>
        {/* Bubble tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900/90 border-r border-b border-white/10 rotate-45" />
      </motion.div>

      {/* Photo container with decorative ring */}
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer decorative ring */}
        <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />

        {/* Gradient ring */}
        <div className="profile-border rounded-full p-[3px]">
          <div className="bg-bg rounded-full p-[3px]">
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Floating tech badges around photo */}
        <motion.div
          className="absolute -top-1 -right-3 bg-gray-900/90 border border-white/10 rounded-lg px-2 py-1"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <span className="text-xs font-mono text-primary">AWS</span>
        </motion.div>

        <motion.div
          className="absolute top-1/4 -left-5 bg-gray-900/90 border border-white/10 rounded-lg px-2 py-1"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        >
          <span className="text-xs font-mono text-accent">K8s</span>
        </motion.div>

        <motion.div
          className="absolute -bottom-1 -right-2 bg-gray-900/90 border border-white/10 rounded-lg px-2 py-1"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
        >
          <span className="text-xs font-mono text-purple-400">DevOps</span>
        </motion.div>

        <motion.div
          className="absolute bottom-6 -left-6 bg-gray-900/90 border border-white/10 rounded-lg px-2 py-1"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 1.5 }}
        >
          <span className="text-xs font-mono text-yellow-400">CI/CD</span>
        </motion.div>

        {/* Status indicator */}
        <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-accent border-[3px] border-bg animate-pulse" />
      </motion.div>

      {/* Name tag */}
      <motion.div
        className="mt-4 bg-gray-900/80 border border-white/10 rounded-full px-4 py-1.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-xs font-mono text-gray-300">
          <span className="text-primary">@</span>atinmondal
        </span>
      </motion.div>
    </motion.div>
  );
}
