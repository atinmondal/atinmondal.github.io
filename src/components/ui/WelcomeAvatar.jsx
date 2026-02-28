import { motion } from "framer-motion";

export default function WelcomeAvatar() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
    >
      {/* Glow behind avatar */}
      <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full scale-110" />

      <motion.svg
        width="220"
        height="300"
        viewBox="0 0 220 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Hair */}
        <ellipse cx="110" cy="52" rx="42" ry="44" fill="#1a1a2e" />
        <path
          d="M68 52 Q68 20 110 12 Q152 20 152 52"
          fill="#111127"
          stroke="#1a1a2e"
          strokeWidth="2"
        />

        {/* Face */}
        <ellipse cx="110" cy="62" rx="36" ry="38" fill="#c68642" />

        {/* Eyes */}
        <motion.g
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
        >
          <ellipse cx="96" cy="58" rx="4" ry="4.5" fill="#1a1a2e" />
          <ellipse cx="124" cy="58" rx="4" ry="4.5" fill="#1a1a2e" />
          {/* Eye shine */}
          <circle cx="97.5" cy="56.5" r="1.5" fill="white" opacity="0.8" />
          <circle cx="125.5" cy="56.5" r="1.5" fill="white" opacity="0.8" />
        </motion.g>

        {/* Eyebrows */}
        <path
          d="M88 49 Q96 44 104 49"
          stroke="#1a1a2e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M116 49 Q124 44 132 49"
          stroke="#1a1a2e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Nose */}
        <path
          d="M108 62 Q110 70 112 62"
          stroke="#a0622e"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Smile */}
        <path
          d="M96 76 Q110 88 124 76"
          stroke="#8B4513"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Tilak / Bindi (small decorative mark on forehead) */}
        <circle cx="110" cy="42" r="3" fill="#e53e3e" />

        {/* Neck */}
        <rect x="100" y="96" width="20" height="14" rx="4" fill="#c68642" />

        {/* Kurta body */}
        <path
          d="M60 110 Q60 106 70 104 L100 100 L120 100 L150 104 Q160 106 160 110 L165 240 Q165 248 155 248 L65 248 Q55 248 55 240 Z"
          fill="#1e40af"
          stroke="#2563eb"
          strokeWidth="1"
        />

        {/* Kurta center line / button placket */}
        <line
          x1="110"
          y1="104"
          x2="110"
          y2="248"
          stroke="#2563eb"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Kurta buttons */}
        <circle cx="110" cy="125" r="2" fill="#60a5fa" opacity="0.7" />
        <circle cx="110" cy="145" r="2" fill="#60a5fa" opacity="0.7" />
        <circle cx="110" cy="165" r="2" fill="#60a5fa" opacity="0.7" />

        {/* Kurta collar / neckline */}
        <path
          d="M94 104 L110 118 L126 104"
          stroke="#2563eb"
          strokeWidth="2"
          fill="#1e3a8a"
        />

        {/* Kurta pattern - subtle embroidery lines */}
        <path
          d="M70 140 Q90 136 110 140 Q130 144 150 140"
          stroke="#3b82f6"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M70 160 Q90 156 110 160 Q130 164 150 160"
          stroke="#3b82f6"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />

        {/* Dupatta / scarf over left shoulder */}
        <path
          d="M55 110 Q48 130 50 180 Q52 220 58 248"
          stroke="#f59e0b"
          strokeWidth="14"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
        <path
          d="M55 110 Q48 130 50 180 Q52 220 58 248"
          stroke="#fbbf24"
          strokeWidth="8"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* Left arm (namaste - folded) */}
        <path
          d="M60 115 Q40 140 55 165 Q70 175 90 168"
          fill="#1e40af"
          stroke="#2563eb"
          strokeWidth="1"
        />
        {/* Left hand */}
        <path
          d="M88 165 Q92 160 95 165 L95 180"
          fill="#c68642"
        />

        {/* Right arm (namaste - folded) */}
        <path
          d="M160 115 Q180 140 165 165 Q150 175 130 168"
          fill="#1e40af"
          stroke="#2563eb"
          strokeWidth="1"
        />
        {/* Right hand */}
        <path
          d="M132 165 Q128 160 125 165 L125 180"
          fill="#c68642"
        />

        {/* Namaste hands (joined in front) */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Joined palms */}
          <path
            d="M95 155 Q100 145 110 142 Q120 145 125 155 L125 175 Q120 182 110 184 Q100 182 95 175 Z"
            fill="#c68642"
            stroke="#a0622e"
            strokeWidth="1"
          />
          {/* Finger lines */}
          <line x1="105" y1="148" x2="105" y2="162" stroke="#a0622e" strokeWidth="0.7" opacity="0.5" />
          <line x1="110" y1="146" x2="110" y2="160" stroke="#a0622e" strokeWidth="0.7" opacity="0.5" />
          <line x1="115" y1="148" x2="115" y2="162" stroke="#a0622e" strokeWidth="0.7" opacity="0.5" />
          {/* Thumb hints */}
          <path d="M98 158 Q96 162 98 166" stroke="#a0622e" strokeWidth="0.7" fill="none" opacity="0.5" />
          <path d="M122 158 Q124 162 122 166" stroke="#a0622e" strokeWidth="0.7" fill="none" opacity="0.5" />
        </motion.g>

        {/* Pajama / dhoti bottom */}
        <path
          d="M65 248 L60 290 Q60 296 68 296 L105 296 Q108 296 108 290 L110 260 L112 290 Q112 296 115 296 L152 296 Q160 296 160 290 L155 248 Z"
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="1"
        />

        {/* Shoes */}
        <ellipse cx="85" cy="296" rx="22" ry="6" fill="#92400e" />
        <ellipse cx="135" cy="296" rx="22" ry="6" fill="#92400e" />
      </motion.svg>

      {/* Speech bubble */}
      <motion.div
        className="absolute -top-2 -right-4 bg-gray-900/90 border border-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 max-w-[160px]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        <p className="text-sm text-gray-200 font-medium text-center">
          Namaste!
        </p>
        <p className="text-xs text-gray-400 text-center">Welcome to my portfolio</p>
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-gray-900/90 border-r border-b border-white/10 rotate-45" />
      </motion.div>
    </motion.div>
  );
}
