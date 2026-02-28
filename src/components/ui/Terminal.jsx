import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COMMANDS = [
  { prompt: "$ docker build -t portfolio .", output: "Successfully built a3f2d1e", delay: 1200 },
  { prompt: "$ kubectl apply -f deploy.yml", output: "deployment.apps/portfolio created", delay: 1000 },
  { prompt: "$ terraform plan", output: "Plan: 3 to add, 0 to change, 0 to destroy.", delay: 1400 },
  { prompt: "$ aws ecs update-service --cluster prod", output: "Service updated successfully ✓", delay: 1100 },
  { prompt: "$ git push origin main", output: "Deploying to production... Done! 🚀", delay: 900 },
];

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [currentCmd, setCurrentCmd] = useState(0);
  const [typing, setTyping] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | output | pause

  useEffect(() => {
    if (currentCmd >= COMMANDS.length) {
      // Restart after a pause
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentCmd(0);
        setTyping("");
        setPhase("typing");
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const cmd = COMMANDS[currentCmd];

    if (phase === "typing") {
      if (typing.length < cmd.prompt.length) {
        const timeout = setTimeout(() => {
          setTyping(cmd.prompt.slice(0, typing.length + 1));
        }, 40 + Math.random() * 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setPhase("output"), 300);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === "output") {
      setLines((prev) => [
        ...prev,
        { type: "cmd", text: cmd.prompt },
        { type: "output", text: cmd.output },
      ]);
      setTyping("");
      setPhase("pause");
    }

    if (phase === "pause") {
      const timeout = setTimeout(() => {
        setCurrentCmd((c) => c + 1);
        setPhase("typing");
      }, cmd.delay);
      return () => clearTimeout(timeout);
    }
  }, [currentCmd, typing, phase]);

  return (
    <motion.div
      className="w-full max-w-lg mx-auto mt-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-gray-500 font-mono">
          devops-terminal
        </span>
      </div>

      {/* Terminal body */}
      <div className="bg-gray-950/90 p-4 h-48 overflow-hidden font-mono text-xs leading-relaxed">
        {/* Previous lines */}
        {lines.slice(-8).map((line, i) => (
          <div
            key={i}
            className={
              line.type === "cmd"
                ? "text-green-400"
                : "text-gray-400 ml-2"
            }
          >
            {line.text}
          </div>
        ))}

        {/* Current typing line */}
        {currentCmd < COMMANDS.length && phase === "typing" && (
          <div className="text-green-400">
            {typing}
            <motion.span
              className="inline-block w-2 h-4 bg-green-400 ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
