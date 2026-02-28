import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// SVG Robot that follows scroll with different expressions
function RobotSVG({ expression = "happy", waveHand = false }) {
  const eyeVariants = {
    happy: { d: "M8 4 Q10 0 12 4", fill: "none", stroke: "#3b82f6" },
    excited: { rx: 2.5, ry: 3 },
    thinking: { d: "M8 3 L12 3", fill: "none", stroke: "#3b82f6" },
  };

  return (
    <svg
      width="64"
      height="72"
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antenna */}
      <motion.circle
        cx="32"
        cy="4"
        r="3"
        fill="#3b82f6"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <line x1="32" y1="7" x2="32" y2="16" stroke="#3b82f6" strokeWidth="2" />

      {/* Head */}
      <rect
        x="12"
        y="16"
        width="40"
        height="28"
        rx="8"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {/* Eyes */}
      {expression === "happy" ? (
        <>
          <path d="M22 28 Q24 24 26 28" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M38 28 Q40 24 42 28" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : expression === "thinking" ? (
        <>
          <line x1="21" y1="28" x2="27" y2="28" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="40" cy="28" rx="3" ry="3" fill="#3b82f6" />
        </>
      ) : (
        <>
          <motion.ellipse
            cx="24"
            cy="28"
            rx="3"
            ry="3"
            fill="#3b82f6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.ellipse
            cx="40"
            cy="28"
            rx="3"
            ry="3"
            fill="#3b82f6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
          />
        </>
      )}

      {/* Mouth */}
      <path
        d={expression === "excited" ? "M26 36 Q32 42 38 36" : expression === "thinking" ? "M28 37 L36 37" : "M26 36 Q32 40 38 36"}
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Body */}
      <rect
        x="18"
        y="46"
        width="28"
        height="16"
        rx="4"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {/* Chest light */}
      <motion.circle
        cx="32"
        cy="54"
        r="3"
        fill="#10b981"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Left arm */}
      <motion.line
        x1="18"
        y1="50"
        x2="8"
        y2={waveHand ? "42" : "56"}
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        animate={waveHand ? { x2: [8, 6, 8], y2: [42, 38, 42] } : {}}
        transition={waveHand ? { duration: 0.5, repeat: Infinity } : {}}
      />

      {/* Right arm */}
      <motion.line
        x1="46"
        y1="50"
        x2="56"
        y2={waveHand ? "42" : "56"}
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        animate={waveHand ? { x2: [56, 58, 56], y2: [42, 38, 42] } : {}}
        transition={waveHand ? { duration: 0.5, repeat: Infinity, delay: 0.25 } : {}}
      />

      {/* Feet */}
      <rect x="20" y="62" width="8" height="4" rx="2" fill="#3b82f6" />
      <rect x="36" y="62" width="8" height="4" rx="2" fill="#3b82f6" />
    </svg>
  );
}

// Section IDs in order to detect which section is visible
const sectionMessages = [
  { id: "hero", text: "Hey! Welcome! 👋", expression: "excited", wave: true },
  { id: "experience", text: "Check out my work history!", expression: "excited", wave: false },
  { id: "pipeline", text: "My CI/CD approach! ⚙️", expression: "happy", wave: false },
  { id: "skills", text: "Tools I work with daily!", expression: "excited", wave: false },
  { id: "projects", text: "Cool projects, right?", expression: "happy", wave: false },
  { id: "certs", text: "AWS certified! 🏆", expression: "excited", wave: true },
  { id: "contact", text: "Let's connect!", expression: "excited", wave: true },
];

export default function ScrollBot() {
  const { scrollYProgress } = useScroll();
  const [currentMsg, setCurrentMsg] = useState(sectionMessages[0]);

  // Move bot vertically with scroll
  const botY = useTransform(scrollYProgress, [0, 1], [120, -60]);

  // Use Intersection Observer to detect which section is visible
  useEffect(() => {
    const observers = [];
    sectionMessages.forEach((msg) => {
      const el = document.getElementById(msg.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentMsg(msg);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed left-6 z-40 flex flex-col items-center gap-2"
      style={{ top: "50%" }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, type: "spring" }}
    >
      <motion.div style={{ y: botY }}>
        {/* Speech bubble */}
        <motion.div
          className="relative bg-gray-900/90 border border-white/10 backdrop-blur-sm rounded-lg px-3 py-2 mb-2 max-w-[140px]"
          key={currentMsg.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-300 text-center leading-tight">
            {currentMsg.text}
          </p>
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900/90 border-r border-b border-white/10 rotate-45" />
        </motion.div>

        {/* Robot */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, -2, 0, 2, 0],
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <RobotSVG
            expression={currentMsg.expression}
            waveHand={currentMsg.wave}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
