import { useEffect, useState } from "react";
import { useQuizStore } from "../store/QuizStore";
// import { demoQuestions } from "../data/demoQuestions";

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = useQuizStore((state) => state.questions);
  const setStage = useQuizStore((state) => state.setStage);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate score and finish
      let score = 0;
      questions.forEach((q, i) => {
        if (answers[i] === q.correct_answer) score += q.marks;
      });
      // onFinish(score);
      setStage("result")
      console.log("score = ", score);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    console.log(
      "questions = ",
      questions,
      "\nanswers = ",
      answers,
      "\nscore = "
    );
  }, [questions, answers]);

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-base-200 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Question {currentIndex + 1} / {totalQuestions}
        </h2>
        <progress
          className="progress progress-primary w-32"
          value={((currentIndex + 1) / totalQuestions) * 100}
          max="100"
        ></progress>
      </div>

      <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleSelect(value)}
            className={`btn ${
              answers[currentIndex] === key
                ? "btn-primary"
                : "btn-outline btn-primary"
            }`}
          >
            {key}: {value}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="btn btn-secondary"
          disabled={currentIndex === 0}
          onClick={handlePrevious}
        >
          ⬅ Previous
        </button>

        <button
          className="btn btn-success"
          onClick={handleNext}
          disabled={!answers[currentIndex]}
        >
          {currentIndex === totalQuestions - 1 ? "Submit ✅" : "Next ➡"}
        </button>
      </div>
    </div>
  );
}
