import SectionWrapper from "@/components/ui/section-wrapper";

// 🎯 Health Education Mini Games Section
const GamesSection: React.FC = () => (
  <SectionWrapper
    title="🎯 Health Education Mini Games"
    subtitle="Learn about healthy habits while having fun! Click a game to play."
  >
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
      {/* Placeholder Game Cards */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-40 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h3 className="text-lg font-semibold mb-2">Game {idx + 1}</h3>
          <p className="text-gray-500 text-center">Coming soon! 🎮</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default GamesSection;
