// src/pages/HomePage.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModeSelector from "../components/ModeSelector";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-brfrom-gray-900 via-purple-900 to-black text-white flex flex-col">
      <Navbar />
      
      <main className="grow max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to <span className="text-purple-400">AI Quizverse</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          A fun, intelligent, and evolving quiz experience — 
          test your brain, battle AI, challenge friends, or explore story mode adventures.
        </p>

        <ModeSelector />
      </main>

      <Footer />
    </div>
  );
}
