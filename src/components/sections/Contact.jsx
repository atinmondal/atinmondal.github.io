import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import SectionWrapper from "../layout/SectionWrapper";
import SectionTitle from "../ui/SectionTitle";
import { personalInfo } from "../../data/portfolioData";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <SectionTitle>Contact</SectionTitle>

      <motion.div
        className="relative bg-gray-900/70 border border-white/10 backdrop-blur-xl rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative gradient border glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 -z-10 blur-sm" />

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to Collaborate?
        </h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          I'm always open to discussing new opportunities, DevOps challenges, or
          cloud architecture. Let's build something great together.
        </p>

        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow mb-8"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiSend size={16} />
          Send Message
        </motion.a>

        <div className="flex justify-center gap-6">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-primary hover:border-primary transition-colors"
            aria-label="Email"
          >
            <FiMail size={20} />
          </a>
        </div>

        <p className="text-gray-600 text-xs mt-8">
          Built with React, Tailwind CSS & Framer Motion
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
