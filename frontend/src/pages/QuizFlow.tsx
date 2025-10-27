import QuizForm from "../components/QuizForm";
import QuizPage from "../components/QuizPage";
import ResultPage from "../components/ResultPage";
import { useQuizStore } from "../store/QuizStore";

export default function QuizFlow() {
  const stage = useQuizStore((state) => state.stage);
  const mode = useQuizStore((state) => state.mode);

  if (stage === "form") return <QuizForm mode={mode} />;
  if (stage === "quiz") return <QuizPage mode={mode} />;
  if (stage === "result") return <ResultPage mode={mode} />;

  return null;
}
