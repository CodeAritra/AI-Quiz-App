import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [num, setNum] = useState(5);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">🎯 AI Quiz Generator</h1>
        <div className="form-control mb-4">
          <label className="label">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic (e.g., React, JS)"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">Number of Questions</label>
          <input
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            min="1"
            max="10"
            className="input input-bordered w-full"
          />
        </div>
        <button onClick={handleStart} className="btn btn-primary w-full">
          Generate Quiz
        </button>
      </div>
    </div>
  );
}
