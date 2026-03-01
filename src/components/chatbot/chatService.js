import { buildSystemPrompt } from "./systemPrompt";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// Rate limit: minimum 2 seconds between requests
let lastRequestTime = 0;
const MIN_INTERVAL = 2000;

// Conversation history for multi-turn chat
let conversationHistory = [];

function getGroqKey() {
  return import.meta.env.VITE_GROQ_API_KEY || null;
}

function getGeminiKey() {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return key && key !== "your_gemini_api_key_here" ? key : null;
}

async function callGroq(userMessage) {
  const apiKey = getGroqKey();
  if (!apiKey) return null;

  conversationHistory.push({ role: "user", content: userMessage });

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API ${response.status}: ${err}`);
  }

  const data = await response.json();
  const reply = data.choices[0].message.content;
  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}

async function callGemini(userMessage) {
  const apiKey = getGeminiKey();
  if (!apiKey) return null;

  conversationHistory.push({ role: "user", content: userMessage });

  // Build Gemini format contents
  const contents = conversationHistory.slice(-10).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: buildSystemPrompt() }] },
      contents,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API ${response.status}: ${err}`);
  }

  const data = await response.json();
  const reply = data.candidates[0].content.parts[0].text;
  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}

export async function askGemini(userMessage) {
  // Rate limit check
  const now = Date.now();
  if (now - lastRequestTime < MIN_INTERVAL) {
    return "Please wait a moment before sending another message.";
  }
  lastRequestTime = now;

  try {
    // Try Groq first (more generous free tier), then Gemini as fallback
    const groqResult = await callGroq(userMessage);
    if (groqResult) return groqResult;
  } catch (error) {
    console.warn("Groq failed, trying Gemini:", error.message);
  }

  try {
    const geminiResult = await callGemini(userMessage);
    if (geminiResult) return geminiResult;
  } catch (error) {
    console.error("Gemini also failed:", error.message);

    if (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED")) {
      return "I'm getting too many requests right now. Please wait a minute and try again.";
    }

    return `Something went wrong: ${error.message}. You can reach Atin at atincse@outlook.com`;
  }

  return "Chat is currently unavailable. Please reach out to Atin directly at atincse@outlook.com or connect on LinkedIn!";
}

export function isApiConfigured() {
  return !!(getGroqKey() || getGeminiKey());
}

export function resetChat() {
  conversationHistory = [];
}
