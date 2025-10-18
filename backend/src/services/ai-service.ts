// src/services/aiService.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const aiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateQuizQuestions(
  topic: string,
  numQuestions: number = 5
) {
  const prompt = `Generate ${numQuestions} multiple-choice quiz questions on the topic "${topic}". Each question should have four options, one correct answer, and marks (1 or 2). Return JSON array.`;

  const response = await aiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    // Optional: config with temperature, etc
    config: {
      temperature: 0.7,
      maxOutputTokens: 800,
    },
  });

  const textOutput = response.text || "";

  try {
    return JSON.parse(textOutput);
  } catch (e) {
    console.error("Failed to parse AI output:", e, textOutput);
    return [];
  }
}
