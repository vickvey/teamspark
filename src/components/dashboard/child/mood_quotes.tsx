"use client";
import React, { useState, useEffect, useCallback } from "react";
import { fetchQuotesByEmotions } from "@/lib/fetchQuotesByEmotions";
import { useSessionStore } from "@/lib/store/useSessionStore";

// --------------------------- Types ---------------------------
export type Emotion =
  | "joy"
  | "sadness"
  | "angry"
  | "fear"
  | "surprise"
  | "neutral";

export interface Quote {
  id: number;
  text: string;
  author: string;
  emotion: Emotion;
}

export type EmotionData = {
  [key in Emotion]?: number;
};

// --------------------------- EmotionTag ---------------------------
const emotionColorMap: Record<Emotion, string> = {
  joy: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
  sadness: "bg-blue-400/20 text-blue-300 border-blue-400/30",
  angry: "bg-red-500/20 text-red-400 border-red-500/30",
  fear: "bg-purple-400/20 text-purple-300 border-purple-400/30",
  surprise: "bg-pink-400/20 text-pink-300 border-pink-400/30",
  neutral: "bg-gray-400/20 text-gray-300 border-gray-400/30",
};

interface EmotionTagProps {
  emotion: Emotion;
}

const EmotionTag: React.FC<EmotionTagProps> = ({ emotion }) => {
  const colorClasses = emotionColorMap[emotion] || emotionColorMap.neutral;

  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full capitalize border ${colorClasses}`}
    >
      {emotion}
    </span>
  );
};

// --------------------------- QuoteCard ---------------------------
interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-cyan-500/10">
      <div className="grow">
        <blockquote className="border-l-4 border-cyan-500 pl-4">
          <p
            className="text-lg italic text-slate-300"
            style={{ fontFamily: "'Lora', serif" }}
          >
            "{quote.text}"
          </p>
        </blockquote>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
        <cite className="text-slate-400 not-italic font-medium">
          - {quote.author}
        </cite>
        <EmotionTag emotion={quote.emotion} />
      </div>
    </div>
  );
};

// --------------------------- SkeletonCard ---------------------------
const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
        <div className="h-4 bg-slate-700 rounded w-1/3"></div>
        <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
};

// --------------------------- Main MoodQuotes ---------------------------
const MoodQuotes: React.FC = () => {
  const emotions = useSessionStore((state) => state.emotions);
  const [quotesByEmotion, setQuotesByEmotion] = useState<
    Record<string, Quote[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuotes = useCallback(async () => {
    if (!emotions.length) return;

    setIsLoading(true);
    setError(null);

    try {
      const quotes = await fetchQuotesByEmotions(emotions);
      const grouped: Record<string, Quote[]> = {};

      for (const quote of quotes) {
        if (!grouped[quote.emotion]) grouped[quote.emotion] = [];
        grouped[quote.emotion].push(quote);
      }

      const ordered: Record<string, Quote[]> = {};
      emotions.forEach((emotion) => {
        if (grouped[emotion]) ordered[emotion] = grouped[emotion];
      });

      setQuotesByEmotion(ordered);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch quotes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [emotions]);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  if (!emotions.length) {
    return (
      <div className="text-center py-12 text-slate-400">
        No emotions detected yet. Try journaling first!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Quotes for Your Mood
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Based on your detected emotions, here are some quotes that resonate
            with your state of mind.
          </p>
          <div className="mt-6 flex justify-center items-center gap-2">
            <span className="text-slate-400">Top Emotions:</span>
            {emotions.map((emotion: Emotion) => (
              <EmotionTag key={emotion} emotion={emotion} />
            ))}
          </div>
        </header>

        <main>
          {isLoading ? (
            <div className="space-y-10">
              {Array.from({ length: emotions.length }).map((_, index) => (
                <div key={index}>
                  <div className="h-8 w-32 bg-slate-700 rounded-md animate-pulse mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10 px-4 bg-slate-800 rounded-lg">
              <p className="text-red-400 text-xl">{error}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(quotesByEmotion).map(([emotion, quotes]) => (
                <section key={emotion}>
                  <h2
                    className="text-3xl font-bold text-white capitalize mb-6 border-b-2 border-slate-700 pb-2"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {emotion}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quotes.map((quote) => (
                      <QuoteCard key={quote.id} quote={quote} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MoodQuotes;
