import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ChatToggle from "./ChatToggle";
import ChatWindow from "./ChatWindow";
import { askGemini, isApiConfigured } from "./chatService";

const INITIAL_MESSAGE = {
  role: "bot",
  content:
    "Hi! I'm Atin's AI assistant. Ask me about his experience, skills, projects, or anything about his professional background!",
};

const NO_API_MESSAGE = {
  role: "bot",
  content:
    "Hi! The AI assistant is being set up. In the meantime, feel free to explore Atin's portfolio or reach out at atincse@outlook.com!",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    isApiConfigured() ? INITIAL_MESSAGE : NO_API_MESSAGE,
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(
    async (text) => {
      const userMsg = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // chatService manages conversation history internally
        const response = await askGemini(text);
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: response },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Sorry, something went wrong. Please try again or reach out to Atin at atincse@outlook.com",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            onSend={handleSend}
            onClose={() => setIsOpen(false)}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
      <ChatToggle isOpen={isOpen} onClick={() => setIsOpen((o) => !o)} />
    </>
  );
}
