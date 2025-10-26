import { useState } from "react";
import { useQuizStore } from "../store/QuizStore";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function QuizForm() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);

  const fetchQuestions = useQuizStore((s) => s.fetchQuestions);
  // const setStage = useQuizStore((s) => s.setStage);
  const loading = useQuizStore((s) => s.loading);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!topic.trim()) return alert("Please enter a topic!");
    await fetchQuestions(topic, numQuestions);
    navigate("/play");
  };

  return (
    <div className="relative flex flex-col items-center justify-center mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-bfrom-indigo-500/10 to-base-200 border border-indigo-300/20 shadow-xl p-8 rounded-3xl max-w-md w-full backdrop-blur-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-400 mb-2">
          ⚡ Create Your AI Quiz
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Type a topic and choose how many questions you want!
        </p>

        {/* Topic Input */}
        <div className="form-control mb-5">
          <label className="label text-sm text-gray-300">Enter Topic</label>
          <input
            type="text"
            placeholder="e.g. JavaScript, Space, AI..."
            className="input input-bordered w-full bg-base-100 text-white focus:ring-2 focus:ring-indigo-400"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Question Count Slider */}
        <div className="form-control mb-5">
          <label className="label text-sm text-gray-300">
            Number of Questions:{" "}
            <span className="font-semibold text-indigo-300">
              {numQuestions}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={15}
            value={numQuestions}
            className="range range-primary"
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          />
        </div>

        {/* Start Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="btn btn-primary w-full font-bold text-lg"
          disabled={loading}
        >
          {loading ? "Generating..." : "Start Quiz 🚀"}
        </motion.button>

        {loading && <Loader/>}
      </motion.div>
    </div>
  );
}
