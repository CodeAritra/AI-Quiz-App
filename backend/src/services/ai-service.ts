import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateQuizQuestions(
  topic: string,
  numQuestions: number
) {
  const prompt = `
  Generate ${numQuestions} multiple choice questions about ${topic}.
  Each should have 4 options (A–D) and one correct answer.
  Respond strictly in JSON like:
  [
    {"question":"...","options":["A","B","C","D"],"answer":"A"},
    ...
  ]
  `;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  console.log("Res = ", response);

  //   try {
  //     const text = response.output[0].content[0].text;
  //     const data = JSON.parse(text);
  //     return data;
  //   } catch (err) {
  //     console.error("AI parsing failed:", err);
  //     return [];
  //   }
}
