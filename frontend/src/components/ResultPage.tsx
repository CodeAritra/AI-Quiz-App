import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/QuizStore";
import type { QuizProps } from "../types/QuizTypes";

export default function ResultPage({ mode }: QuizProps) {
  const score = useQuizStore((state) => state.score);
  const aiScore = useQuizStore((state) => state.aiScore);
  const totalScore = useQuizStore((state) => state.totalScore);
  const reset = useQuizStore((state) => state.reset);

  const navigate = useNavigate();

  const handleReset = () => {
    reset();
    navigate("/");
  };

  // 🏆 Determine winner (for battle mode)
  let resultMessage = "";
  if (mode === "battle") {
    if (score > aiScore)
      resultMessage = "🎉 You won the battle! Amazing performance!";
    else if (score < aiScore)
      resultMessage = "🤖 AI wins this time! Train harder, warrior!";
    else resultMessage = "🤝 It's a draw! Great minds think alike!";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h2 className="text-4xl font-bold mb-6">
        {mode === "battle" ? "⚔️ Battle Completed!" : "🏁 Quiz Completed!"}
      </h2>

      {mode === "battle" ? (
        <>
          <div className="bg-base-200 rounded-2xl shadow-xl p-6 mb-6 max-w-md w-full">
            <p className="text-2xl font-semibold mb-3 text-primary">
              🧠 You: {score}/{totalScore}
            </p>
            <p className="text-2xl font-semibold mb-3 text-error">
              🤖 AI: {aiScore}/{totalScore}
            </p>
          </div>

          <h3 className="text-xl font-bold text-success mb-8">
            {resultMessage}
          </h3>

          <button className="btn btn-primary" onClick={handleReset}>
            ⚔️ Battle Again
          </button>
        </>
      ) : (
        <>
          <p className="text-xl mb-6">
            Your Score:{" "}
            <span className="font-semibold">
              {score}/{totalScore}
            </span>
          </p>

          <button className="btn btn-primary" onClick={handleReset}>
            🔁 Try Again
          </button>
        </>
      )}
    </div>
  );
}
