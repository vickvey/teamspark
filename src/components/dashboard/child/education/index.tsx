import React from "react";
import { VIDEO_CATEGORIES } from "./constants";
import VideoCard from "./components/VideoCard";

const EducationSection: React.FC = () => {
  return (
    <div className="bg-linear-to-br from-indigo-400 to-purple-500 min-h-screen text-gray-800 p-5 md:p-8">
      <header className="text-center text-white mb-10 md:mb-16 animate-fade-in-down">
        <h1 className="text-4xl md:text-6xl font-bold text-shadow">
          🌟 Kids Health Hub 🌟
        </h1>
        <p className="text-lg md:text-2xl opacity-95 mt-2">
          Fun Videos to Learn About Staying Healthy!
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        {VIDEO_CATEGORIES.map((category, index) => (
          <section
            key={category.title}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-10 shadow-2xl animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center mb-6 pb-4 border-b-4 border-indigo-500">
              <div className="text-4xl md:text-5xl mr-4">{category.icon}</div>
              <h2 className="text-2xl md:text-4xl font-bold text-indigo-600">
                {category.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {category.videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default EducationSection;
