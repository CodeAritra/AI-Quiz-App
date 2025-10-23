import axios from "axios";
import { create } from "zustand";

interface Questions {
  question: string;
  options: string[];
  correct_answer: string;
  marks:number;
}

interface QuizStore {
  stage: "home" | "quiz" | "result";
  topic: string;
  numQuestions: number;
  questions: Questions[];
  score: number;

  loading: boolean;

  setStage: (stage: "home" | "quiz" | "result") => void;
  setTopic: (topic: string) => void;
  setNoQuestions: (noQuestions: number) => void;
  setQuestions: (questions: Questions[]) => void;
  setScore: (score: number) => void;

  fetchQuestions: (topic: string, numQuestions: number) => Promise<void>;
}

export const useQuizStore = create<QuizStore>((set) => ({
  stage: "home",
  topic: "",
  numQuestions: 0,
  questions: [],
  score: 0,

  loading: false,

  setStage: (stage) => set({ stage }),
  setTopic: (topic) => set({ topic }),
  setNoQuestions: (numQuestions) => set({ numQuestions }),
  setQuestions: (questions) => set({ questions }),
  setScore: (points) => set((state) => ({ score: state.score + points })),

  fetchQuestions: async (topic, numQuestions) => {
    set({ loading: true });

    try {
      const { data } = await axios.post("http://localhost:5000/quiz/generate", {
        topic,
        numQuestions,
      });
      console.log("res = ", data);
      set({ loading: false, questions: data.questions });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
