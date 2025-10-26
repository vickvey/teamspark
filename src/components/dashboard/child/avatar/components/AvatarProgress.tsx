import React, { useState, useEffect, useMemo } from "react";
import { avatarStagesByGender, BADGES } from "../constants";

interface AvatarProgressProps {
  points: number;
  gender: "male" | "female";
}

interface IconProps {
  className?: string;
}

const PointIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c.321-.772 1.305-.772 1.626 0l1.373 3.315c.133.32.43.548.774.595l3.475.505c.84.122 1.176 1.172.56 1.763l-2.515 2.452a.965.965 0 00-.279.849l.593 3.46c.144.836-.734 1.483-1.488.995l-3.107-1.634a.966.966 0 00-.902 0l-3.107 1.634c-.754.488-1.632-.159-1.488-.995l.593-3.46a.965.965 0 00-.279-.849L2.09 9.062c-.615-.591-.28-1.64.56-1.763l3.475-.505a.965.965 0 00.774-.595l1.373-3.315z"
      clipRule="evenodd"
    />
  </svg>
);

export const AvatarProgress: React.FC<AvatarProgressProps> = ({
  points,
  gender,
}) => {
  const AVATAR_STAGES = useMemo(() => avatarStagesByGender[gender], [gender]);

  const currentStage = useMemo(
    () =>
      [...AVATAR_STAGES].reverse().find((stage) => points >= stage.minPoints) ||
      AVATAR_STAGES[0],
    [points, AVATAR_STAGES]
  );

  const nextStage = useMemo(
    () => AVATAR_STAGES.find((stage) => stage.level === currentStage.level + 1),
    [currentStage, AVATAR_STAGES]
  );

  const earnedBadgeNames = useMemo(
    () =>
      new Set(BADGES.filter((b) => points >= b.minPoints).map((b) => b.name)),
    [points]
  );

  const progressPercentage = useMemo(() => {
    if (!nextStage) return 100;
    const pointsInLevel = points - currentStage.minPoints;
    const pointsForNextLevel = nextStage.minPoints - currentStage.minPoints;
    if (pointsForNextLevel <= 0) return 100;
    return Math.min((pointsInLevel / pointsForNextLevel) * 100, 100);
  }, [points, currentStage, nextStage]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [lastLevel, setLastLevel] = useState(currentStage.level);

  useEffect(() => {
    if (currentStage.level > lastLevel) {
      // Schedule state updates asynchronously to avoid cascading renders
      const startAnim = setTimeout(() => setIsAnimating(true), 0);
      const updateLevel = setTimeout(() => setLastLevel(currentStage.level), 0);

      const stopAnim = setTimeout(() => setIsAnimating(false), 600);

      return () => {
        clearTimeout(startAnim);
        clearTimeout(updateLevel);
        clearTimeout(stopAnim);
      };
    } else if (currentStage.level < lastLevel) {
      // Schedule level reset asynchronously
      const resetLevel = setTimeout(() => setLastLevel(currentStage.level), 0);
      return () => clearTimeout(resetLevel);
    }
  }, [currentStage.level, lastLevel]);

  const { Icon } = currentStage;
  const animationClass = isAnimating ? "animate-bounce" : "";

  return (
    <div className="bg-linear-to-br from-white to-sky-100 p-6 rounded-2xl shadow-lg w-full text-center">
      <div
        className={`relative w-40 h-40 mx-auto mb-2 transition-transform duration-500 transform ${
          isAnimating ? "scale-110" : "scale-100"
        }`}
      >
        <Icon className={`w-full h-full ${animationClass}`} />
      </div>

      <h2 className="text-2xl font-bold text-slate-800">{currentStage.name}</h2>
      <p className="text-sm text-slate-500 mb-4">Level {currentStage.level}</p>

      {/* Badges */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">
          Badges
        </h3>
        <div className="flex justify-center items-center space-x-3 overflow-x-auto">
          {BADGES.map((badge) => {
            const isEarned = earnedBadgeNames.has(badge.name);
            const BadgeIcon = badge.Icon as React.FC<IconProps>;
            return (
              <div
                key={badge.name}
                className={`relative p-1 rounded-full transition-all duration-300 ${
                  isEarned ? "bg-amber-300/50" : ""
                }`}
                title={`${badge.name} (${
                  isEarned ? "Earned!" : `Unlock at ${badge.minPoints} pts`
                })\n${badge.description}`}
              >
                <BadgeIcon
                  className={`w-10 h-10 transition-all duration-300 ${
                    isEarned ? "opacity-100" : "opacity-40 grayscale"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-amber-500 font-semibold mb-4">
        <PointIcon className="w-6 h-6 text-amber-400" />
        <span className="text-lg">{points.toLocaleString()} Points</span>
      </div>

      <div className="px-4">
        <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
          <div
            className="bg-linear-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>{currentStage.minPoints.toLocaleString()}</span>
          <span>
            {nextStage ? nextStage.minPoints.toLocaleString() : "Max Level!"}
          </span>
        </div>
      </div>

      <p className="text-sm text-slate-600 mt-4 italic">
        {currentStage.description}
      </p>
    </div>
  );
};
