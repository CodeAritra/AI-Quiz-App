import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizStore } from "../types/QuizTypes";
import { fetchQuizQuestions, fetchAiBattleQuestions } from "../api/api";

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      questions: [],
      aiAnswers: [],
      score: 0,
      totalScore: 0,
      loading: false,

      stage: "form",
      mode: "normal",

      setQuestions: (questions) => set({ questions }),
      setAiAnswers: (aiAnswers) => set({ aiAnswers }),
      setScore: (score) => set({ score }),
      setTotalScore: (totalScore) => set({ totalScore }),
      setStage: (stage) => set({ stage }),
      setMode: (mode) => set({ mode }),

      // ✅ Normal quiz fetch
      fetchQuestions: async (topic, numQuestions) => {
        set({ loading: true });
        try {
          const questions = await fetchQuizQuestions(topic, numQuestions);
          set({ questions });
        } catch (error) {
          console.error("Error fetching normal questions:", error);
        } finally {
          set({ loading: false });
        }
      },

      // ✅ AI Battle quiz fetch (renamed to avoid recursion)
      aiBattle: async (topic, numQuestions) => {
        set({ loading: true });
        try {
          const { questions, answers } = await fetchAiBattleQuestions(
            topic,
            numQuestions
          );
          set({ questions, aiAnswers: answers });
        } catch (error) {
          console.error("Error fetching AI Battle questions:", error);
        } finally {
          set({ loading: false });
        }
      },

      reset: () =>
        set({
          questions: [],
          aiAnswers: [],
          score: 0,
          totalScore: 0,
          stage: "form",
          mode: "normal",
        }),
    }),
    {
      name: "quiz-storage",
      partialize: (state) => ({
        // ✅ only persist these keys
        questions: state.questions,
        aiAnswers: state.aiAnswers,
        score: state.score,
        totalScore: state.totalScore,
        mode: state.mode,
      }),
    }
  )
);
