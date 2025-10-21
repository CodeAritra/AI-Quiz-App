import { useState } from "react";
import QuizForm from "./componets/QuizForm";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  const [stage, setStage] = useState<"home" | "quiz" | "result">("home");
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-base-100">
      {stage === "home" && <QuizForm onStart={() => setStage("quiz")} />}
      {stage === "quiz" && (
        <QuizPage
          onFinish={(score) => {
            setScore(score);
            setStage("result");
          }}
        />
      )}
      {stage === "result" && (
        <ResultPage score={score} onRestart={() => setStage("home")} />
      )}
    </div>
  );
}
