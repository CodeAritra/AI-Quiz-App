export type QuizMode = "normal" | "battle" | "1v1";
export type QuizStage = "form" | "quiz" | "result";

export interface Questions {
  question: string;
  options: string[];
  correct_answer: string;
  marks: number;
}

export interface QuizStore {
  questions: Questions[];
  score: number;
  totalScore: number;

  loading: boolean;
  stage: QuizStage;
  mode: QuizMode;

  setQuestions: (questions: Questions[]) => void;
  setScore: (score: number) => void;
  setTotalScore: (totalScore: number) => void;

  setStage: (stage: QuizStage) => void;
  setMode: (mode: QuizMode) => void;

  fetchQuestions: (topic: string, numQuestions: number) => Promise<void>;
  reset: () => void;
}

export interface QuizProps {
  mode: QuizMode;
}
