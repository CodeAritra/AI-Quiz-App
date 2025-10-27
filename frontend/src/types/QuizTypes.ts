export type QuizMode = "normal" | "battle" | "1v1";
export type QuizStage = "form" | "quiz" | "result";

export interface Questions {
  question: string;
  options: string[];
  correct_answer: string;
  marks: number;
}
export interface Answers {
  id: string;
  answer: string;
}

export interface QuizStore {
  questions: Questions[];
  aiAnswers: Answers[];
  score: number;
  aiScore: number;
  totalScore: number;

  loading: boolean;
  stage: QuizStage;
  mode: QuizMode;

  setQuestions: (questions: Questions[]) => void;
  setAiAnswers: (aiAnswers: Answers[]) => void;
  setScore: (score: number) => void;
  setAiScore: (aiScore: number) => void;
  setTotalScore: (totalScore: number) => void;

  setStage: (stage: QuizStage) => void;
  setMode: (mode: QuizMode) => void;

  fetchQuestions: (topic: string, numQuestions: number) => Promise<void>;
  aiBattle: (topic: string, numQuestions: number) => Promise<void>;
  reset: () => void;
}

export interface QuizProps {
  mode: QuizMode;
}
