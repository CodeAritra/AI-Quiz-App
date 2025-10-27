import { create } from "zustand";
import type { QuizStore } from "../types/QuizTypes";
import { fetchQuizQuestions } from "../api/api";

export const useQuizStore = create<QuizStore>((set) => ({
  questions: [],
  score: 0,
  totalScore: 0,
  loading: false,

  stage: "form",
  mode: "normal",

  setQuestions: (questions) => set({ questions }),
  setScore: (score) => set({ score }),
  setTotalScore: (totalScore) => set({ totalScore }),

  setStage: (stage) => set({ stage }),
  setMode: (mode) => set({ mode }),

  fetchQuestions: async (topic, numQuestions) => {
    set({ loading: true });
    try {
      const questions = await fetchQuizQuestions(topic, numQuestions);
      set({ questions });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  reset: () =>
    set({
      questions: [],
      score: 0,
      totalScore: 0,
    }),
}));
