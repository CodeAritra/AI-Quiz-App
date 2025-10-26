import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/QuizStore";

export default function ResultPage() {
  const score = useQuizStore((state) => state.score);
  const totalScore = useQuizStore((state) => state.totalScore);
  const reset = useQuizStore((state) => state.reset);

  const navigate = useNavigate();

  const handleReset = () => {
    reset();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-4xl font-bold mb-4">🏁 Quiz Completed!</h2>
      <p className="text-xl mb-6">
        Your Score:{" "}
        <span className="font-semibold">
          {score}/{totalScore}
        </span>
      </p>
      <button className="btn btn-primary" onClick={handleReset}>
        Try Again 🔁
      </button>
    </div>
  );
}
