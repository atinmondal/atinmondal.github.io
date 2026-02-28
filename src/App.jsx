import { motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Experience from "./components/sections/Experience";
import DevOpsPipeline from "./components/sections/DevOpsPipeline";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import ParticleNetwork from "./components/three/ParticleNetwork";
import ChatBot from "./components/chatbot/ChatBot";
import ScrollBot from "./components/ui/ScrollBot";
import ScrollProgress from "./components/ui/ScrollProgress";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollProgress />
      <ParticleNetwork />
      <ScrollBot />
      <Navbar />
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <Hero />
        <Experience />
        <DevOpsPipeline />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <ChatBot />
    </motion.div>
  );
}
