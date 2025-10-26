import AISection from "@/components/dashboard/child/sections/ai-section";
import DailySection from "@/components/dashboard/child/sections/daily-section";
import GamesSection from "@/components/dashboard/child/sections/games-section";

const ChildDashboard = () => {
  return (
    <div className="flex flex-col">
      <DailySection />
      <AISection />
      <GamesSection />
    </div>
  );
};

export default ChildDashboard;
