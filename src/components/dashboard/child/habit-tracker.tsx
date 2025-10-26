"use client";

import React, { useState, useEffect } from "react";
import { Habit, fetchTodayTasks } from "@/lib/fetchTodayTasks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Info, Loader2 } from "lucide-react";
import { toast } from "sonner"; // ✅ new toast system

export const HabitTracker: React.FC<{ userId: string }> = ({ userId }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetchTodayTasks(userId);
      setHabits(data);
      setIsLoading(false);
    })();
  }, [userId]);

  const toggleHabit = async (id: number) => {
    const target = habits.find((h) => h.id === id);
    if (!target || target.completed || updating) return;

    setUpdating(id);
    await new Promise((res) => setTimeout(res, 400)); // mimic API

    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: true } : h))
    );

    toast.success(`Completed "${target.name}" 🎉`, {
      description: "Nice job keeping up with your routine!",
    });

    setUpdating(null);
  };

  const completed = habits.filter((h) => h.completed).length;
  const total = habits.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card className="w-full p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-linear-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
          Daily Habits
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Loading habits...
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-5">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Progress</span>
                <span>
                  {completed} / {total}
                </span>
              </div>
              <Progress value={progress} />
            </div>

            {/* Habit List */}
            <div className="space-y-3">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`flex items-center justify-between border rounded-md p-3 transition ${
                    habit.completed
                      ? "bg-muted text-muted-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <div
                    onClick={() => toggleHabit(habit.id)}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <input
                      type="checkbox"
                      checked={habit.completed}
                      readOnly
                      disabled={updating === habit.id}
                      className="accent-cyan-500"
                    />
                    <span
                      className={`text-base ${
                        habit.completed ? "line-through" : ""
                      }`}
                    >
                      {habit.name}
                    </span>
                    {updating === habit.id && (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedHabit(habit)}
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>

      {/* Habit Info Dialog */}
      <Dialog
        open={!!selectedHabit}
        onOpenChange={() => setSelectedHabit(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedHabit?.name}</DialogTitle>
            <DialogDescription>
              {selectedHabit?.description || "No description available."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
