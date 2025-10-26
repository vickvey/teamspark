"use client";

import React, { useState, useCallback } from "react";
import { fetchEmotionsBasedOnText } from "@/lib/server/emotion-service"; // only external import
import { useSessionStore } from "@/lib/store/useSessionStore"; // Zustand store
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MoodJournal: React.FC = () => {
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setSentiment = useSessionStore((state) => state.setSentiment);
  const setEmotions = useSessionStore((state) => state.setEmotions);

  const handleStoryChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setStory(e.target.value),
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!story.trim()) {
      setError("Please write something before submitting.");
      return;
    }

    setIsLoading(true);
    setError("");
    setEmotions([]);
    // setSentiment(null);

    try {
      setSentiment("Processing your story...");

      const topEmotions = await fetchEmotionsBasedOnText(story);

      setEmotions(topEmotions);
      setSentiment("Thanks for sharing! Here's what we detected:");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  }, [story, setSentiment, setEmotions]);

  return (
    <Card className="flex flex-col justify-between max-w-xl w-full h-full p-6 border border-slate-200 shadow-xl rounded-3xl bg-white/90 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-violet-600 via-blue-500 to-yellow-500">
          How are you feeling today?
        </CardTitle>
        <p className="text-slate-500 text-sm sm:text-base">
          Wanna vent out? Sharing your thoughts can make you feel lighter ✨
        </p>
      </CardHeader>

      <div className="flex flex-col flex-1 space-y-4 mt-4">
        <Textarea
          value={story}
          onChange={handleStoryChange}
          placeholder="Write about your day here..."
          className="resize-none h-36 flex-1 p-4 text-slate-700 rounded-xl border border-slate-300 shadow-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition-all duration-200"
        />
        <Button
          onClick={handleSubmit}
          disabled={!story.trim() || isLoading}
          className="w-full bg-linear-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "✨ Thinking..." : "Share My Feelings!"}
        </Button>
      </div>

      {(error || story) && (
        <Card className="bg-white/80 border border-slate-200 shadow rounded-2xl mt-6 animate-fadeIn">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Response</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading && (
              <p className="text-slate-500 text-center animate-pulse">
                Aura is listening...
              </p>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
          </CardContent>
        </Card>
      )}
    </Card>
  );
};

export default MoodJournal;
