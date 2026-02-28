import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import TechTag from "../ui/TechTag";
import { projects } from "../../data/portfolioData";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" },
  }),
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="projects">
      <SectionTitle>Projects</SectionTitle>

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <GlassCard className="h-full group">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={project.icon}
                  alt={project.title}
                  className="w-10 h-10 object-contain"
                />
                <h3 className="text-lg font-bold text-white">
                  {project.title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
