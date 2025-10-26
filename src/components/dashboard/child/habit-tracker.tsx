"use client";

import React, { useEffect, useState } from "react";
import { fetchTodayTasks } from "@/lib/fetchTodayTasks";
import { useHabitStore, Habit } from "@/lib/store/useHabitStore";
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
import { toast } from "sonner";

export const HabitTracker: React.FC<{ userId: string }> = ({ userId }) => {
  const habits = useHabitStore((state) => state.habits);
  const setHabits = useHabitStore((state) => state.setHabits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);

  const [isLoading, setIsLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  // Fetch habits if store is empty
  useEffect(() => {
    if (habits.length > 0) return;

    (async () => {
      setIsLoading(true);
      const data = await fetchTodayTasks(userId);
      setHabits(data);
      setIsLoading(false);
    })();
  }, [habits.length, setHabits, userId]);

  const handleToggle = async (habit: Habit) => {
    if (habit.completed || updating) return;

    setUpdating(habit.id);
    await new Promise((res) => setTimeout(res, 400)); // simulate API

    toggleHabit(habit.id);

    toast.success(`Completed "${habit.name}" 🎉`, {
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

            {/* Habit Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`border rounded-lg p-4 transition flex flex-col justify-between aspect-square overflow-hidden mx-auto ${
                    habit.completed
                      ? "bg-muted text-muted-foreground"
                      : "hover:shadow-md"
                  }`}
                >
                  <div
                    onClick={() => handleToggle(habit)}
                    className="flex items-start gap-3 cursor-pointer flex-1"
                  >
                    <input
                      type="checkbox"
                      checked={habit.completed}
                      readOnly
                      disabled={updating === habit.id}
                      className="accent-cyan-500 mt-1"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4
                          className={`text-base font-semibold leading-tight ${
                            habit.completed ? "line-through" : ""
                          }`}
                        >
                          {habit.name}
                        </h4>

                        {updating === habit.id && (
                          <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-2" />
                        )}
                      </div>

                      {habit.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {habit.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedHabit(habit)}
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
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
