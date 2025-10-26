import React from "react";
import { HabitTracker } from "@/components/dashboard/child/habit-tracker";
import MoodQuotes from "@/components/dashboard/child/mood-quotes";
import MoodJournal from "@/components/dashboard/child/mood-journal";
import MoodActivity from "@/components/dashboard/child/mood-activity";

// 🎖️ Rewards Card
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

// 🎮 Active Game Card
const ActiveGameCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2">🎮 Continue Your Game</h3>
    <p>Healthy Food Match — Level 4</p>
    <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      Play Now ▶️
    </button>
  </div>
);

// 💡 Fun Tip Card
const FunTipCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2">💡 Health Tip</h3>
    <p className="text-gray-700">
      Drinking water keeps your brain happy and helps you think better!
    </p>
  </div>
);

// Section wrapper component
const SectionWrapper: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <section className="mb-8 p-6 bg-white/80 border border-slate-300 rounded-2xl shadow-lg backdrop-blur-sm">
    <header className="mb-4">
      <h2 className="text-2xl font-bold text-green-700">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </header>
    {children}
  </section>
);

// Daily Section
const DailySection: React.FC = () => (
  <SectionWrapper
    title="🏆 Daily Highlights"
    subtitle="Check out your daily tasks, rewards, games, and quick tips!"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
      <HabitTracker userId="demo-user-123" />
      <RewardsCard />
      <ActiveGameCard />
      <FunTipCard />
    </div>
  </SectionWrapper>
);

// AI Section
const AISection: React.FC = () => (
  <SectionWrapper
    title="🤖 Mood & AI Insights"
    subtitle="Share your feelings, and we'll recommend activities and quotes for your mood!"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
      <MoodJournal />
      <MoodActivity />
      <MoodQuotes />
    </div>
  </SectionWrapper>
);

const ChildDashboard = () => {
  return (
    <div className="flex flex-col">
      <DailySection />
      <AISection />
    </div>
  );
};

export default ChildDashboard;
