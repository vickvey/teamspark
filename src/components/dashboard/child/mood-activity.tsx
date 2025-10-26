"use client";

import React, { useEffect, useState } from "react";
import { useSessionStore } from "@/lib/store/useSessionStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityData {
  mood: string;
  activities: string[];
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Emotion color mapping for badges
const EMOTION_COLORS: Record<string, string> = {
  joy: "bg-yellow-100 text-yellow-800",
  sadness: "bg-blue-100 text-blue-800",
  anger: "bg-red-100 text-red-800",
  fear: "bg-purple-100 text-purple-800",
  disgust: "bg-green-100 text-green-800",
  surprise: "bg-pink-100 text-pink-800",
  neutral: "bg-gray-100 text-gray-800",
};

const MoodActivity: React.FC = () => {
  const emotions = useSessionStore((state) => state.emotions);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [displayActivities, setDisplayActivities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load activity data once
  useEffect(() => {
    // mount marker for quick debugging
    console.log("MoodActivity mounted");
    fetch("/data/activity.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch activity data");
        return res.json();
      })
      .then((data: ActivityData[]) => setActivityData(data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load activities 😢");
      });
  }, []);

  // Compute display activities whenever emotions or activityData change
  useEffect(() => {
    if (!activityData.length) return;

    let newActivities: string[] = [];

    if (emotions.length === 0) {
      // No detected mood → show random activities
      const allActivities = activityData.flatMap((a) => a.activities);
      newActivities = shuffleArray(allActivities).slice(0, 5);
    } else {
      // Pick activities based on detected emotions
      const selected: string[] = [];
      emotions.forEach((emotion) => {
        const moodObj = activityData.find((a) => a.mood === emotion);
        if (moodObj) selected.push(...moodObj.activities.slice(0, 5));
      });
      newActivities = shuffleArray(selected).slice(0, 5);
    }

    // Use setTimeout to defer state update and avoid cascading renders
    const id = setTimeout(() => setDisplayActivities(newActivities), 0);
    return () => clearTimeout(id);
  }, [emotions, activityData]);

  return (
    <Card className="w-full p-6 border border-slate-200 shadow-xl rounded-3xl bg-white/90 backdrop-blur-md">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">
          {emotions.length === 0
            ? "Activities to boost your day 💡"
            : `Based on your mood${
                emotions.length > 1 ? "s" : ""
              } ${emotions.join(", ")}! Try these:`}
        </CardTitle>

        {emotions.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2 mt-2">
            {emotions.map((emotion, idx) => (
              <Badge key={idx} className={EMOTION_COLORS[emotion]}>
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 mt-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {displayActivities.map((activity, idx) => (
          <p
            key={idx}
            className="text-slate-700 text-center font-medium hover:text-indigo-600 transition-colors"
          >
            🎯 {activity}
          </p>
        ))}
        {displayActivities.length === 0 && !error && (
          <p className="text-slate-500 text-center">Loading activities...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodActivity;
