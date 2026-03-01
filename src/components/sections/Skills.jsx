import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper";
import SectionTitle from "../ui/SectionTitle";

const skillCategories = [
  {
    title: "GenAI & LLM",
    icon: "🤖",
    skills: [
      { name: "LLM / GenAI", level: 70 },
      { name: "RAG Pipelines", level: 75 },
      { name: "Prompt Engineering", level: 78 },
      { name: "AWS Bedrock / Agents", level: 65 },
      { name: "LangChain", level: 75 },
    ],
  },
  {
    title: "Cloud & AWS",
    icon: "☁️",
    skills: [
      { name: "AWS Bedrock", level: 90 },
      { name: "Lambda", level: 95 },
      { name: "ECS / EKS", level: 88 },
      { name: "DynamoDB", level: 80 },
      { name: "CloudFormation", level: 85 },
    ],
  },
  {
    title: "Containers & Orchestration",
    icon: "🐳",
    skills: [
      { name: "Docker", level: 95 },
      { name: "Kubernetes", level: 90 },
      { name: "Helm", level: 80 },
      { name: "Terraform", level: 88 },
    ],
  },
  {
    title: "CI/CD & Automation",
    icon: "⚙️",
    skills: [
      { name: "Jenkins", level: 92 },
      { name: "GitHub Actions", level: 90 },
      { name: "Ansible", level: 82 },
      { name: "Bash / Python", level: 88 },
    ],
  },
  {
    title: "Monitoring & AIOps",
    icon: "📊",
    skills: [
      { name: "CloudWatch", level: 85 },
      { name: "AIOps (Bedrock)", level: 82 },
      { name: "Linux Admin", level: 90 },
      { name: "Git", level: 95 },
    ],
  },
];

function SkillBar({ name, level, delay, isInView }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-300 font-mono">{name}</span>
        <span className="text-xs text-gray-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="skills">
      <SectionTitle>Skills & Tools</SectionTitle>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {skillCategories.map((cat, catIdx) => (
          <motion.div
            key={cat.title}
            className="bg-gray-900/70 border border-white/10 backdrop-blur-xl rounded-xl p-5"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ delay: catIdx * 0.15, duration: 0.5 }}
            whileHover={{
              borderColor: "rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{cat.icon}</span>
              <h3 className="text-sm font-bold text-white">{cat.title}</h3>
            </div>

            {cat.skills.map((skill, skillIdx) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={catIdx * 0.15 + skillIdx * 0.1 + 0.3}
                isInView={isInView}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
