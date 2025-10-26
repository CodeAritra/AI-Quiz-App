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

  setQuestions: (questions: Questions[]) => void;
  setScore: (score: number) => void;
  setTotalScore: (totalScore: number) => void;

  fetchQuestions: (topic: string, numQuestions: number) => Promise<void>;
  reset: () => void;
}
