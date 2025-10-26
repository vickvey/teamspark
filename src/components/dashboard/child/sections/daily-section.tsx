import React from "react";
import { HabitTracker } from "@/components/dashboard/child/habit-tracker";
import SectionWrapper from "@/components/ui/section-wrapper";

// 💡 Fun Tip Card (keep)
const FunTipCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2">💡 Health Tip</h3>
    <p className="text-gray-700">
      Drinking water keeps your brain happy and helps you think better!
    </p>
  </div>
);

// Daily Section
const DailySection: React.FC = () => (
  <SectionWrapper
    title="🏆 Daily Highlights"
    subtitle="Check out your daily tasks and quick tips!"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
      {/* Make HabitTracker span all columns so there's no empty space */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <HabitTracker userId="ava-hanson-123" />
      </div>

      {/* Keep the fun tip as a separate card */}
      <FunTipCard />
    </div>
  </SectionWrapper>
);

export default DailySection;
