import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import TechTag from "../ui/TechTag";
import { certifications, education } from "../../data/portfolioData";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="certs">
      <SectionTitle>Certifications & Education</SectionTitle>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <GlassCard className="h-full text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-20 h-20 object-contain hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {cert.title}
              </h3>
              <p className="text-primary text-sm font-mono mb-2">
                {cert.subtitle}
              </p>
              <p className="text-gray-500 text-xs mb-1">
                ID: {cert.credentialId}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                Issued: {cert.issued}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {cert.tags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}

        {/* Education card */}
        <motion.div
          custom={certifications.length}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <GlassCard className="h-full text-center">
            <div className="flex justify-center mb-4">
              <img
                src={education.logo}
                alt={education.institution}
                className="w-20 h-20 object-contain hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-300"
              />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {education.degree}
            </h3>
            <p className="text-accent text-sm font-mono mb-2">
              {education.institution}
            </p>
            <p className="text-gray-500 text-xs mb-1">
              Graduated: {education.graduated}
            </p>
            <p className="text-gray-500 text-xs mb-4">
              CGPA: {education.cgpa}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {education.tags.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
