// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import QuizFlow from "./pages/QuizFlow";

export default function App() {
  return (
    <Router>
      <div className="font-inter min-h-screen bg-gradient-to-brfrom-gray-900 via-purple-900 to-black text-white">
        <Routes>
          {/* 🏠 Home */}
          <Route path="/" element={<HomePage />} />

          <Route path="/quiz" element={<QuizFlow />} />
          <Route path="/ai-battle" element={<QuizFlow />} />
        </Routes>

        {/* 🔔 Toast Notifications */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
}
