// src/components/layout/ModeSelector.tsx
import { Sword, Brain, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/QuizStore";
import type { QuizMode } from "../types/QuizTypes";

const modes = [
  {
    title: "normal" as QuizMode,
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    desc: "Pick a topic and test your knowledge solo.",
    path: "/quiz",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "battle" as QuizMode,
    icon: <Sword className="w-8 h-8 text-red-400" />,
    desc: "Face off against AI in a timed knowledge duel.",
    path: "/ai-battle",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "1v1" as QuizMode,
    icon: <Users className="w-8 h-8 text-green-400" />,
    desc: "Challenge a friend or random player in real time. (Coming soon...)",
    path: "/1v1-form",
    color: "from-green-500 to-emerald-500",
  },
];

export default function ModeSelector() {
  const setMode = useQuizStore((state) => state.setMode);
  const navigate = useNavigate();

  const handleMode = (path: string, mode: QuizMode) => {
    setMode(mode); // ✅ store globally
    navigate(path); // ✅ then go to the form page
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {modes.map((mode) => (
        <div
          key={mode.title}
          onClick={() => handleMode(mode.path, mode.title)}
          className={`cursor-pointer rounded-2xl bg-gradient-to-br${mode.color} p-px hover:scale-105 transition-transform`}
        >
          <div className="bg-gray-900 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3">
              {mode.icon}
              <h3 className="text-lg font-semibold text-white capitalize">
                {mode.title}
              </h3>
            </div>
            <p className="text-sm text-gray-400 mt-3">{mode.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
