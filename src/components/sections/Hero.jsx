import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import { personalInfo, skills } from "../../data/portfolioData";
import Terminal from "../ui/Terminal";
import WelcomeAvatar from "../ui/WelcomeAvatar";

function TypingText({ texts, speed = 100, pause = 2000 }) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!deleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(timeout);
    }

    if (!deleting && charIndex === currentText.length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (deleting && charIndex > 0) {
      const timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
      return () => clearTimeout(timeout);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  useEffect(() => {
    setDisplayed(texts[textIndex].substring(0, charIndex));
  }, [charIndex, textIndex, texts]);

  return (
    <span>
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Hero() {
  const nameChars = personalInfo.name.split("");

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center pt-16 pb-8"
    >
      {/* Welcome Avatar with photo */}
      <WelcomeAvatar />

      <div className="mt-8" />

      {/* Name with character stagger */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {nameChars.map((char, i) => (
          <motion.span
            key={i}
            variants={charVariants}
            className={char === " " ? "inline" : "inline-block"}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Typing tagline */}
      <motion.p
        className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-4 h-16 sm:h-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <TypingText
          texts={[
            "Building scalable cloud infrastructure",
            "Automating CI/CD pipelines",
            "Crafting AIOps solutions on AWS",
            "DevOps Engineer & Cloud Architect",
          ]}
        />
      </motion.p>

      {/* Skills ticker */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 max-w-xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            className="px-3 py-1 text-xs font-mono text-primary/80 bg-primary/5 border border-primary/10 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 + i * 0.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.a
          href="#contact"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Let's Connect
        </motion.a>
        <motion.a
          href={personalInfo.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-white/20 text-gray-300 font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiDownload size={16} />
          Resume / CV
        </motion.a>
      </motion.div>

      {/* Social links */}
      <motion.div
        className="flex gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-primary transition-colors"
          aria-label="GitHub"
        >
          <FiGithub size={20} />
        </a>
        <a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <FiLinkedin size={20} />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-gray-500 hover:text-primary transition-colors"
          aria-label="Email"
        >
          <FiMail size={20} />
        </a>
      </motion.div>

      {/* Terminal animation */}
      <Terminal />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-primary rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
