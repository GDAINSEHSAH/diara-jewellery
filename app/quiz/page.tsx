"use client";

import { useState } from "react";
import { quizQuestions, getRecommendations } from "@/data/quiz";
import { Product } from "@/data/products";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";

type Phase = "intro" | "quiz" | "results";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Product[]>([]);

  const handleStart = () => {
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers({});
  };

  const handleAnswer = (optionIndex: number) => {
    const question = quizQuestions[currentQ];
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    // Auto-advance after 400ms
    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        const recs = getRecommendations(newAnswers);
        setResults(recs);
        setPhase("results");
      }
    }, 400);
  };

  const handleRetake = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers({});
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-900">
      <div className="h-20" />

      {phase === "intro" && <QuizIntro onStart={handleStart} />}

      {phase === "quiz" && (
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          <QuizProgress current={currentQ + 1} total={quizQuestions.length} />
          <QuizQuestion
            question={quizQuestions[currentQ]}
            selectedIndex={answers[quizQuestions[currentQ].id] ?? null}
            onSelect={handleAnswer}
          />
        </div>
      )}

      {phase === "results" && (
        <QuizResults products={results} onRetake={handleRetake} />
      )}
    </div>
  );
}
