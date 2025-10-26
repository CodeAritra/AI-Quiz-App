import axios from "axios";
import type { Questions } from "../types/QuizTypes";

const API_BASE_URL = "https://ai-quiz-app-backend-qjld.onrender.com";

export const fetchQuizQuestions = async (
  topic: string,
  numQuestions: number
): Promise<Questions[]> => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/quiz/generate`, {
      topic,
      numQuestions,
    });
    return data.questions;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};
