"use client";

import React from "react";
import { FaCoins, FaBars } from "react-icons/fa";
import { useSessionStore } from "@/lib/store/useSessionStore";

interface HeaderProps {
  toggleSidebar?: () => void; // optional mobile sidebar toggle
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const emotions = useSessionStore((state) => state.emotions);

  // Greeting based on mood
  const moodGreeting = emotions.length
    ? `You're feeling ${emotions.join(", ")} today! 🌟`
    : "Welcome back! 🌞";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
      {/* Left: Sidebar toggle + Greeting */}
      <div className="flex items-center gap-3">
        {toggleSidebar && (
          <button
            className="md:hidden bg-green-600 text-white p-2 rounded-md shadow-md"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-green-700">{moodGreeting}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Keep learning, venting, and enjoying your day!
          </p>
        </div>
      </div>

      {/* Right: Coins display */}
      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl font-semibold shadow-sm">
        <FaCoins />
        <span>10121 coins earned</span>
      </div>
    </div>
  );
}
