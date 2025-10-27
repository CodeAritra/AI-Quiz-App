import { useEffect, useState } from "react";
import { useQuizStore } from "../store/QuizStore";
import { motion } from "framer-motion";
import type { QuizProps } from "../types/QuizTypes";

export default function QuizPage({ mode }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = useQuizStore((state) => state.questions);
  const setStage = useQuizStore((s) => s.setStage);
  const setScore = useQuizStore((s) => s.setScore);

  const setTotalScore = useQuizStore((state) => state.setTotalScore);

  useEffect(() => {
    setTotalScore(questions.length);
  }, [questions, setTotalScore]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // ✅ Mode-based scoring
      let score = 0;
      questions.forEach((q, i) => {
        if (answers[i] === q.correct_answer) score += q.marks;
      });
      setScore(score);
      // Normal Mode → Direct navigate to result
      if (mode === "normal") {
        setStage("result");
      }
      // AI Battle Mode → Different route or logic
      else if (mode === "battle") {
        setStage("result");
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-brfrom-gray-900 via-indigo-900 to-black">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-base-200 rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-white text-center sm:text-left">
            {mode === "battle" ? "🤖 AI Battle" : "🧠 Quiz"} — Question{" "}
            {currentIndex + 1} / {totalQuestions}
          </h2>
          <progress
            className="progress progress-primary w-full sm:w-1/3 h-3"
            value={((currentIndex + 1) / totalQuestions) * 100}
            max="100"
          ></progress>
        </div>

        {/* Question */}
        <div className="mb-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
            {currentQuestion?.question}
          </h3>
          <p className="text-sm text-gray-400">
            Marks: {currentQuestion?.marks}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(currentQuestion?.options).map(([key, value]) => {
            const isSelected = answers[currentIndex] === value;
            return (
              <button
                key={key}
                onClick={() => handleSelect(value)}
                className={`btn text-lg py-3 h-auto whitespace-normal ${
                  isSelected
                    ? "btn-primary shadow-md scale-105"
                    : "btn-outline btn-primary hover:scale-105"
                } transition-all duration-200`}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            className="btn btn-secondary w-28"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
          >
            ⬅ Prev
          </button>

          <button
            className="btn btn-success w-28"
            onClick={handleNext}
            disabled={!answers[currentIndex]}
          >
            {currentIndex === totalQuestions - 1 ? "Submit ✅" : "Next ➡"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
