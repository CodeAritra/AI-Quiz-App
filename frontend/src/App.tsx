import QuizForm from "./pages/QuizForm";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import { useQuizStore } from "./store/QuizStore";

export default function App() {
  const stage = useQuizStore((state) => state.stage);

  return (
    <div className="min-h-screen bg-base-100">
      {stage === "home" && <QuizForm />}
      {stage === "quiz" && <QuizPage />}
      {stage === "result" && <ResultPage />}
    </div>
  );
}
