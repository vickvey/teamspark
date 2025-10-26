import React, { useEffect, useCallback } from 'react';
import { Video } from '../types';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
    return (
        <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&origin=${window.location.origin}`}
            title="Embedded YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    );
};

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-title"
    >
      <div className="relative w-full max-w-4xl">
        <div className="bg-gradient-to-br from-indigo-500/80 to-purple-600/80 backdrop-blur-lg rounded-2xl p-3 md:p-4 shadow-2xl text-white animate-fade-in-up">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 pr-4">
              <h2 id="video-title" className="text-xl md:text-2xl font-bold truncate">{video.title}</h2>
              <p className="text-indigo-200 text-sm mt-1 hidden md:block line-clamp-2">{video.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white text-4xl font-bold cursor-pointer transition-colors duration-300 hover:text-indigo-200 leading-none p-1 -mt-1"
              aria-label="Close video player"
            >
              &times;
            </button>
          </div>
          <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
            <YouTubePlayer videoId={video.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;