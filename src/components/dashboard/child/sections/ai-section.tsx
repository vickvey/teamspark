import SectionWrapper from "@/components/ui/section-wrapper";
import MoodJournal from "@/components/dashboard/child/mood-journal";
import MoodActivity from "@/components/dashboard/child/mood-activity";
import MoodQuotes from "@/components/dashboard/child/mood-quotes";

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
export default AISection;
