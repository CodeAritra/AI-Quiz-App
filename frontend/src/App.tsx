// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <div className="font-inter min-h-screen bg-gradient-to-brfrom-gray-900 via-purple-900 to-black text-white">
        <Routes>
          {/* 🏠 Home */}
          <Route path="/" element={<HomePage />} />

          {/* 🧠 Normal Quiz */}
          <Route path="/quiz" element={<QuizPage />} />

          {/* ⚔️ AI Battle Mode
          <Route path="/ai-battle" element={<AIBattlePage />} />

          {/* 👥 1v1 Multiplayer Mode */}
          {/* <Route path="/1v1" element={<OneVsOnePage />} /> */}

          
        </Routes>

        {/* 🔔 Toast Notifications */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
}
