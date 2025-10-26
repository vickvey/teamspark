"use client";

import React, { useEffect, useState } from "react";
import { useSessionStore } from "@/lib/store/useSessionStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface QuoteData {
  mood: string;
  quotes: string[];
}

// Simple Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Map emotions to colors/icons for better UI
const EMOTION_STYLES: Record<string, string> = {
  joy: "text-yellow-500",
  sadness: "text-blue-500",
  anger: "text-red-500",
  fear: "text-purple-500",
  disgust: "text-green-500",
  surprise: "text-pink-500",
  neutral: "text-gray-500",
};

const MoodQuotes: React.FC = () => {
  const emotions = useSessionStore((state) => state.emotions);
  const [quotesData, setQuotesData] = useState<QuoteData[]>([]);
  const [displayQuotes, setDisplayQuotes] = useState<string[]>([]);

  // Fetch quotes JSON once
  useEffect(() => {
    fetch("/data/quotes.json")
      .then((res) => res.json())
      .then((data: QuoteData[]) => setQuotesData(data))
      .catch((err) => console.error("Failed to fetch quotes:", err));
  }, []);

  // Compute display quotes whenever emotions or quotesData change
  useEffect(() => {
    if (!quotesData.length) return;

    let newQuotes: string[] = [];

    if (emotions.length === 0) {
      const allQuotes = quotesData.flatMap((q) => q.quotes);
      newQuotes = shuffleArray(allQuotes).slice(0, 5);
    } else {
      const selected: string[] = [];
      emotions.forEach((emotion) => {
        const moodObj = quotesData.find((q) => q.mood === emotion);
        if (moodObj) {
          selected.push(...moodObj.quotes.slice(0, 5));
        }
      });
      newQuotes = shuffleArray(selected).slice(0, 5);
    }

    // Defer state update to avoid cascading renders
    const id = setTimeout(() => setDisplayQuotes(newQuotes), 0);
    return () => clearTimeout(id);
  }, [emotions, quotesData]);

  return (
    <Card className="max-w-xl mx-auto p-6 border border-slate-200 shadow-xl rounded-3xl bg-white/90 backdrop-blur-md">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">
          {emotions.length === 0
            ? "Here are some quotes to brighten your day 🌟"
            : `Ohh, you are feeling ${emotions.join(
                ", "
              )} 😊! Here are some quotes:`}
        </CardTitle>
        {emotions.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2 mt-1">
            {emotions.map((emotion, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full font-medium border ${EMOTION_STYLES[emotion]}`}
              >
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </span>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 mt-4">
        {displayQuotes.map((quote, idx) => (
          <p
            key={idx}
            className="text-slate-700 text-center italic animate-fadeIn"
          >
            {quote}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default MoodQuotes;
