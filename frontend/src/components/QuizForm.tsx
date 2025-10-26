import { useEffect, useState } from "react";
import { useQuizStore } from "../store/QuizStore";
import Loader from "./Loader";

export default function QuizForm() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);

  const fetchQuestions = useQuizStore((state) => state.fetchQuestions);
  const setStage = useQuizStore((state) => state.setStage);
  const loading = useQuizStore((state) => state.loading);

  const handleSubmit = async (topic: string, numQuestions: number) => {
    await fetchQuestions(topic, numQuestions);
    setStage("quiz");
  };

  useEffect(() => {
    console.log("loading = ", loading);
  }, [loading]);

  return (
    <div className="max-w-md mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">🎯 Generate Quiz</h2>

      <div className="form-control mb-3">
        <label className="label">Topic</label>
        <input
          type="text"
          placeholder="Enter topic (e.g. JavaScript)"
          className="input input-bordered w-full"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="form-control mb-3">
        <label className="label">Number of Questions</label>
        <input
          type="number"
          min={1}
          max={20}
          className="input input-bordered w-full"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
        />
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={() => handleSubmit(topic, numQuestions)}
      >
        Start Quiz 🚀
      </button>
      {loading && <Loader />}
    </div>
  );
}
