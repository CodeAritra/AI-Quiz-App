// src/services/aiService.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const aiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateQuizQuestions(
  topic: string,
  numQuestions: number
) {
  const prompt = `Generate ${numQuestions} multiple-choice questions on "${topic}".
Each question must include:
- question (string)
- options (array of 4 strings)
- correct_answer (string)
- marks (1 or 2)

Return ONLY pure JSON array. 
Do NOT include markdown fences, explanations, or code block syntax. Example output:
[
  { "question": "What is JS?", "options": ["A","B","C","D"], "correct_answer": "A", "marks": 1 }
]`;

  try {
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
        maxOutputTokens: 2000,
      },
    });

    let textOutput = response.text || "";
    textOutput = textOutput
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .replace(/\r?\n|\r/g, " ")
      .replace(/[“”]/g, '"')
      .trim()
      .replace(/\\'/g, "'") // Remove escaped single quotes
      .replace(/\\"/g, '"') // Fix double quotes
      .replace(/(\w)"(\w)/g, '$1\\"$2'); // Escape stray quotes between words

    // Try to find the first '[' and the last ']' to ensure valid JSON array
    const start = textOutput.indexOf("[");
    const end = textOutput.lastIndexOf("]");
    if (start !== -1 && end !== -1) {
      textOutput = textOutput.slice(start, end + 1);
    }

    // console.log("output = ", textOutput);
    return await JSON.parse(textOutput);
  } catch (e) {
    console.error("Failed to parse AI output:", e);
    return [];
  }
}
