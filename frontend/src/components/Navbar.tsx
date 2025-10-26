// src/components/layout/Navbar.tsx
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Brain className="text-purple-400" />
          <span>AI Quizverse</span>
        </Link>

        <div className="flex gap-4 text-sm">
          <Link to="/leaderboard" className="hover:text-purple-400">Leaderboard</Link>
          <Link to="/about" className="hover:text-purple-400">About</Link>
        </div>
      </div>
    </nav>
  );
}
