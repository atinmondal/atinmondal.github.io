import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt } from "./systemPrompt";

let model = null;

function getModel() {
  if (model) return model;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("Gemini API key not configured");
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        parts: [{ text: buildSystemPrompt() }],
      },
    });
    return model;
  } catch (err) {
    console.error("Failed to initialize Gemini model:", err);
    return null;
  }
}

export async function askGemini(userMessage, history = []) {
  const m = getModel();

  if (!m) {
    return "Chat is currently unavailable. Please reach out to Atin directly at atincse@outlook.com or connect on LinkedIn!";
  }

  try {
    // Only include paired user/model turns in history
    const chatHistory = [];
    for (const msg of history) {
      chatHistory.push({
        role: msg.role === "bot" ? "model" : "user",
        parts: [{ text: msg.content }],
      });
    }

    const chat = m.startChat({ history: chatHistory });
    const result = await chat.sendMessage(userMessage);
    const text = result.response.text();
    return text;
  } catch (error) {
    // Log full error details to browser console for debugging
    console.error("Gemini API error:", error);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error status:", error?.status);

    if (
      error?.message?.includes("RESOURCE_EXHAUSTED") ||
      error?.message?.includes("429") ||
      error?.status === 429
    ) {
      return "I'm getting too many requests right now. Please wait a few seconds and try again.";
    }

    if (error?.message?.includes("API_KEY_INVALID")) {
      return "The API key appears to be invalid. Please check the configuration.";
    }

    if (error?.message?.includes("PERMISSION_DENIED")) {
      return "The API key doesn't have permission. Please enable the Generative Language API in Google Cloud Console.";
    }

    // Show the actual error for debugging
    return `Something went wrong: ${error?.message || "Unknown error"}. You can reach Atin at atincse@outlook.com`;
  }
}

export function isApiConfigured() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return apiKey && apiKey !== "your_gemini_api_key_here";
}
