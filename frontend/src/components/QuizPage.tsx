import { useEffect, useState } from "react";
import { useQuizStore } from "../store/QuizStore";
import { motion } from "framer-motion";
import type { QuizProps } from "../types/QuizTypes";

export default function QuizPage({ mode }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = useQuizStore((state) => state.questions);
  const aiAnswers = useQuizStore((state) => state.aiAnswers); // ✅ Added
  const setStage = useQuizStore((s) => s.setStage);
  const setScore = useQuizStore((s) => s.setScore);
  const setAiScore = useQuizStore((s) => s.setAiScore);
  const setTotalScore = useQuizStore((s) => s.setTotalScore);

  useEffect(() => {
    setTotalScore(questions.length);
  }, [questions, setTotalScore]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelect = (option: string) => {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      let score = 0;
      questions.forEach((q, i) => {
        if (answers[i] === q.correct_answer) score += q.marks;
      });
      setScore(score);
      setStage("result");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // ✅ If AI Battle mode → Split layout
  if (mode === "battle") {
    const aiAnswer = String(aiAnswers?.[currentIndex]);
    if (mode === "battle" && aiAnswers) {
      let aiScore = 0;
      questions.forEach((q, i) => {
        const aiAns = aiAnswers[i]?.answer;
        if (aiAns === q.correct_answer) aiScore += q.marks;
      });
      setAiScore(aiScore);
    }
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-brfrom-gray-900 via-indigo-900 to-black">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl h-[90vh]"
        >
          {/* 🧠 You */}
          <div className="bg-base-200 rounded-2xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
            <div>
              <h2 className="text-lg font-semibold text-indigo-400 mb-3">
                🧠 You — Question {currentIndex + 1}/{totalQuestions}
              </h2>
              <h3 className="text-xl font-bold mb-4 text-primary">
                {currentQuestion?.question}{" "}
                <span className="font-light">
                  [Marks: {currentQuestion?.marks}]
                </span>
              </h3>
              <p className="text-sm text-gray-400"></p>
              <div className="grid grid-cols-2 gap-3 max-h-[55vh] pr-2">
                {currentQuestion?.options.map((option: string, i: number) => {
                  const isSelected = answers[currentIndex] === option;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(option)}
                      className={`btn text-md py-2 ${
                        isSelected
                          ? "btn-primary shadow-md scale-105"
                          : "btn-outline btn-primary hover:scale-105"
                      } transition-all duration-200`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 🤖 AI Opponent */}
          <div className="bg-base-200 rounded-2xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden border border-red-500/30">
            <div>
              <h2 className="text-lg font-semibold text-red-400 mb-3">
                🤖 AI Opponent — Thinking...
              </h2>
              <h3 className="text-xl font-bold mb-4 text-primary">
                {currentQuestion?.question}{" "}
                <span className="font-light">
                  [Marks: {currentQuestion?.marks}]
                </span>
              </h3>

              <div className="grid grid-cols-2 gap-3  max-h-[55vh] pr-2 opacity-90 pointer-events-none">
                {currentQuestion?.options.map((option: string, i: number) => {
                  const isAIChoice = aiAnswer === option;
                  return (
                    <button
                      key={i}
                      className={`btn text-md py-2 ${
                        isAIChoice
                          ? "btn-error shadow-lg scale-105"
                          : "btn-outline btn-error hover:scale-100"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ⚙️ Controls */}
          <div className="md:col-span-2 flex justify-between items-center mt-4">
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

  // ✅ Normal Mode (unchanged)
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
            🧠 Quiz — Question {currentIndex + 1} / {totalQuestions}
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
            {currentQuestion?.question}{" "}
            <span className="font-light">
              [Marks: {currentQuestion?.marks}]
            </span>
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion?.options.map((option: string, i: number) => {
            const isSelected = answers[currentIndex] === option;
            return (
              <button
                key={i}
                onClick={() => handleSelect(option)}
                className={`btn text-lg py-3 h-auto whitespace-normal ${
                  isSelected
                    ? "btn-primary shadow-md scale-105"
                    : "btn-outline btn-primary hover:scale-105"
                } transition-all duration-200`}
              >
                {option}
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
