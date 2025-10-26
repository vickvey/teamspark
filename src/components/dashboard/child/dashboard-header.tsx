"use client";

import { FaCoins } from "react-icons/fa";
import { useSessionStore } from "@/lib/store/useSessionStore";
import { Button } from "@/components/ui/button"; // ShadCN button

export default function Header() {
  const emotions = useSessionStore((state) => state.emotions);
  const coins = useSessionStore((state) => state.coins);
  const addCoins = useSessionStore((state) => state.addCoins);
  const subtractCoins = useSessionStore((state) => state.subtractCoins);

  // Greeting based on mood
  const moodGreeting = emotions.length
    ? `You're feeling ${emotions.join(", ")} today! 🌟`
    : "Welcome back! 🌞 Ava :)";

  return (
    <div className="sticky top-0 z-10 mb-6">
      <div className="flex items-center justify-between gap-4 px-8 bg-white/90 border border-slate-200 rounded-3xl p-4 shadow-sm">
        {/* Left: Greeting */}
        <div>
          <h2 className="text-2xl font-bold text-green-700">{moodGreeting}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Keep learning, venting, and enjoying your day!
          </p>
        </div>

        {/* Right: Coins + Profile */}
        <div className="flex items-center gap-6">
          {/* Coins */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl font-semibold shadow-sm">
              <FaCoins />
              <span>{coins} coins</span>
            </div>

            <div className="flex gap-2 mt-1">
              <Button size="sm" variant="outline" onClick={() => addCoins(10)}>
                +10
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => subtractCoins(10)}
              >
                -10
              </Button>
            </div>
          </div>

          {/* Profile Photo + Name */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-400 text-sm font-semibold">
              {/* Replace with <img /> for real photo */}
              Photo
            </div>
            <span className="mt-1 text-gray-700 font-medium text-sm">
              Ava Hanson
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
