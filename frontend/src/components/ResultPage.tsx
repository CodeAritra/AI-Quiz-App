import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/QuizStore";
import type { QuizProps } from "../types/QuizTypes";

export default function ResultPage({ mode }: QuizProps) {
  const score = useQuizStore((state) => state.score);
  const totalScore = useQuizStore((state) => state.totalScore);
  const reset = useQuizStore((state) => state.reset);

  const navigate = useNavigate();

  const handleReset = () => {
    reset();
    if (mode === "battle") navigate("/battle");
    else navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-4xl font-bold mb-4">
        {mode === "battle" ? "⚔️ Battle Completed!" : "🏁 Quiz Completed!"}
      </h2>

      <p className="text-xl mb-6">
        {mode === "battle" ? "Your final duel score:" : "Your Score:"}{" "}
        <span className="font-semibold">
          {score}/{totalScore}
        </span>
      </p>

      <button className="btn btn-primary" onClick={handleReset}>
        {mode === "battle" ? "Battle Again ⚔️" : "Try Again 🔁"}
      </button>
    </div>
  );
}
