// src/pages/ResultPage.tsx
import React from "react";

export default function ResultPage({ score, onRestart }: { score: number; onRestart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-4xl font-bold mb-4">🏁 Quiz Completed!</h2>
      <p className="text-xl mb-6">Your Score: <span className="font-semibold">{score}</span></p>
      <button className="btn btn-primary" onClick={onRestart}>
        Try Again 🔁
      </button>
    </div>
  );
}
