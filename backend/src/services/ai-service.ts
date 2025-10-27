import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { cleanJsonText } from "./cleanJsonText";
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
- marks (1)

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

    const raw = response.text || "";
    const textOutput = cleanJsonText(raw);
    // console.log("output = ", textOutput);
    return await JSON.parse(textOutput);
  } catch (e) {
    console.error("Failed to parse AI output:", e);
    return [];
  }
}

export async function generateAiAnswers(questions: string[]) {
  if (!questions || questions.length === 0) return [];

  // Build compact JSON payload to ask the model to return indices only
  const prompt = `
You are an AI quiz taker. Given the following JSON array of questions (id, question, options),
for each question select the answers of the best option.
Return ONLY a JSON array of objects: [{"id":"q1","answer":virat kolhli}, ...] with no extra text.
Here are the questions:
${JSON.stringify(questions)}
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { temperature: 0.0, maxOutputTokens: 1000 },
    });
    const raw = response.text || "";
    const cleaned = cleanJsonText(raw);
    const aiAnswers = JSON.parse(cleaned);
    if (!Array.isArray(aiAnswers)) return [];

    return aiAnswers;
  } catch (err) {
    console.error("getAIAnswers parse error:", err);
    return [];
  }
}

export async function generateAiBattle(topic: string, numQuestions: number) {
  try {
    const questions = await generateQuizQuestions(topic, numQuestions);
    const answers = await generateAiAnswers(questions);
    return { questions, answers };
  } catch (error) {}
}
