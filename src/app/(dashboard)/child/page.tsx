import React from "react";
import { HabitTracker } from "@/components/dashboard/child/habit-tracker";
import MoodQuotes from "@/components/dashboard/child/mood-quotes";
import MoodJournal from "@/components/dashboard/child/mood-journal";
import MoodActivity from "@/components/dashboard/child/mood-activity";

// 🎖️ Card 2 — Rewards
const RewardsCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2">🎖️ Your Rewards</h3>
    <p>
      You have <span className="font-bold text-green-600">120 points</span>!
    </p>
    <button className="mt-3 bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500">
      Redeem Rewards 🎁
    </button>
  </div>
);

// 🎮 Card 3 — Active Game
const ActiveGameCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2">🎮 Continue Your Game</h3>
    <p>Healthy Food Match — Level 4</p>
    <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      Play Now ▶️
    </button>
  </div>
);

// 💡 Card 5 — Fun Tip
const FunTipCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2">💡 Health Tip</h3>
    <p className="text-gray-700">
      Drinking water keeps your brain happy and helps you think better!
    </p>
  </div>
);

// 🧠 Dashboard Layout
const ChildDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* <TodayChallenge /> */}
      <HabitTracker userId="demo-user-123" />
      <MoodJournal />
      <MoodQuotes />
      <MoodActivity />
      <RewardsCard />
      <ActiveGameCard />
      <FunTipCard />
    </div>
  );
};

export default ChildDashboard;
