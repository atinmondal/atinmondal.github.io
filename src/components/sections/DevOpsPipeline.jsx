import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper";
import SectionTitle from "../ui/SectionTitle";
import {
  FiGitCommit,
  FiBox,
  FiCheckCircle,
  FiUploadCloud,
  FiActivity,
} from "react-icons/fi";

const stages = [
  {
    icon: FiGitCommit,
    label: "Code",
    desc: "Push to Git",
    color: "#8b5cf6",
  },
  {
    icon: FiBox,
    label: "Build",
    desc: "Docker & CI",
    color: "#3b82f6",
  },
  {
    icon: FiCheckCircle,
    label: "Test",
    desc: "Automated QA",
    color: "#10b981",
  },
  {
    icon: FiUploadCloud,
    label: "Deploy",
    desc: "K8s & ECS",
    color: "#f59e0b",
  },
  {
    icon: FiActivity,
    label: "Monitor",
    desc: "AIOps & Alerts",
    color: "#ef4444",
  },
];

export default function DevOpsPipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="pipeline">
      <SectionTitle>CI/CD Pipeline</SectionTitle>

      <p className="text-gray-400 text-sm mb-12 max-w-2xl">
        Building end-to-end automated pipelines — from code commit to production
        deployment with monitoring. Here's how I approach the DevOps lifecycle.
      </p>

      <div ref={ref} className="relative">
        {/* Pipeline connector line (desktop) */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 opacity-20" />

        {/* Animated pipeline flow */}
        {isInView && (
          <motion.div
            className="hidden md:block absolute top-[47px] left-[10%] h-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        )}

        {/* Stages */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ delay: 0.3 + i * 0.3, duration: 0.5 }}
            >
              {/* Icon circle */}
              <motion.div
                className="relative w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `${stage.color}15`,
                  border: `2px solid ${stage.color}40`,
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: `0 0 30px ${stage.color}40`,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Pulse ring */}
                {isInView && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${stage.color}` }}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.3,
                      duration: 1,
                      repeat: 2,
                    }}
                  />
                )}
                <stage.icon size={28} style={{ color: stage.color }} />
              </motion.div>

              {/* Stage number */}
              <span
                className="text-xs font-mono mb-1"
                style={{ color: stage.color }}
              >
                0{i + 1}
              </span>

              {/* Label */}
              <h4 className="text-white font-semibold text-sm mb-1">
                {stage.label}
              </h4>

              {/* Description */}
              <p className="text-gray-500 text-xs">{stage.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Infinity loop symbol */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <motion.svg
              width="32"
              height="16"
              viewBox="0 0 32 16"
              fill="none"
              animate={{ rotate: [0, 0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <path
                d="M8 8C8 4.5 5.5 2 2 2C2 2 0 2 0 4.5C0 7 2 8 4 8C6 8 8 8 10 8C12 8 16 8 18 8C20 8 24 8 26 8C28 8 30 8 30 5.5C30 3 28 2 26 2C22.5 2 22 4.5 22 8C22 11.5 24.5 14 28 14C28 14 30 14 30 11.5C30 9 28 8 26 8C24 8 22 8 20 8C18 8 14 8 12 8C10 8 6 8 4 8C2 8 0 8 0 10.5C0 13 2 14 4 14C7.5 14 8 11.5 8 8Z"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.svg>
            <span className="text-xs text-gray-400 font-mono">
              Continuous Integration & Continuous Delivery
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
