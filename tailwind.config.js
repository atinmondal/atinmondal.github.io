/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d17",
        primary: {
          DEFAULT: "#3b82f6",
          light: "rgba(59, 130, 246, 0.1)",
          border: "rgba(59, 130, 246, 0.2)",
          glow: "rgba(59, 130, 246, 0.3)",
        },
        accent: "#10b981",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
