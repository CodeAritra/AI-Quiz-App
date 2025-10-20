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
  const prompt = `You are a quiz generator. Create ${numQuestions} multiple-choice questions on "${topic}".
Each question must have:
- "question" (string)
- "options" (array of 4 strings)
- "correct_answer" (string)
- "marks" (1 or 2)
Return ONLY valid JSON inside a markdown code block like this:
\`\`\`json
[ {...}, {...} ]
\`\`\`
Do NOT add explanations or text outside the code block.`;

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
        maxOutputTokens: 800,
      },
    });

    let textOutput = response.text || "";

    // console.log("output = ", textOutput);
    return await JSON.parse(textOutput);
  } catch (e) {
    console.error("Failed to parse AI output:", e);
    return [];
  }
}
