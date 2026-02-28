import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import TechTag from "../ui/TechTag";
import { experiences } from "../../data/portfolioData";

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" },
  }),
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="experience">
      <SectionTitle>Experience</SectionTitle>

      <div ref={ref} className="relative">
        {/* Timeline line */}
        <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="sm:pl-20 relative"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {/* Timeline dot */}
              <div className="hidden sm:flex absolute left-6 top-8 w-5 h-5 rounded-full bg-bg border-2 border-primary items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <GlassCard>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-12 h-12 rounded-lg bg-white/5 p-1 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-primary font-mono text-sm">
                      {exp.company}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{exp.period}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-gray-400 text-sm flex items-start gap-2"
                    >
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
