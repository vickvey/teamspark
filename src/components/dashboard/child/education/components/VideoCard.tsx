import React from "react";
import { Video } from "../types";
import Image from "next/image";

interface VideoCardProps {
  video: Video;
}

const PlayButton: React.FC = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-120 group-hover:bg-indigo-500">
    <div className="w-0 h-0 border-l-20 border-l-indigo-500 border-y-12 border-y-transparent ml-1 transition-colors duration-300 group-hover:border-l-white" />
  </div>
);

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-linear-to-br from-gray-50 to-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl no-underline"
    >
      <div className="relative pt-[56.25%] overflow-hidden">
        <Image
          height={360}
          width={640}
          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <PlayButton />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {video.description}
        </p>
      </div>
    </a>
  );
};

export default VideoCard;
