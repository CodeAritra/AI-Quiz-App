import axios from "axios";
import type { Questions } from "../types/QuizTypes";

const API_BASE_URL = "https://ai-quiz-app-backend-qjld.onrender.com";
// const DEV_BASE_URL = "http://localhost:5000";

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

export const fetchAiBattleQuestions = async (
  topic: string,
  numQuestions: number
) => {
  try {
    const { data } = await axios.post(`${DEV_BASE_URL}/quiz/aibattle`, {
      topic,
      numQuestions,
    });

    return {
      questions: data?.ans.questions,
      answers: data?.ans.answers,
    };
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};
