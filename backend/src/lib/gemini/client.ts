import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env";

let aiInstance: GoogleGenAI | null = null;

/**
 * Returns a configured, singleton instance of the official Google Gen AI Client.
 */
export function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    if (!env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiInstance = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  }
  return aiInstance;
}
