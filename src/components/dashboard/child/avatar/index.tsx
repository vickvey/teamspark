"use client";

import React, { useState } from "react";
import { AvatarProgress } from "./components/AvatarProgress";

interface AvatarProps {
  gender: "male" | "female";
  maxHeight?: string; // e.g., "30rem"
}

const Avatar: React.FC<AvatarProps> = ({
  gender: initialGender,
  maxHeight = "30rem",
}) => {
  const [gender, setGender] = useState<"male" | "female">(initialGender);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [expanded, setExpanded] = useState(false);

  const selectGender = (g: "male" | "female") => {
    if (gender !== g) {
      setGender(g);
      setTotalPoints(0);
    }
  };

  const genderButtonClasses = (g: "male" | "female") =>
    `px-4 py-1 font-bold rounded-full transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
      gender === g
        ? "bg-sky-600 text-white shadow-md scale-105"
        : "bg-white text-sky-700 hover:bg-sky-100"
    }`;

  return (
    <div
      className={`bg-white/90 p-4 rounded-2xl shadow-md flex flex-col items-center transition-all overflow-hidden`}
      style={{ height: expanded ? maxHeight : "6rem" }}
    >
      {/* Compact header area */}
      <div className="flex items-center gap-4 w-full">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
          {gender === "female" ? "👧" : "👦"}
        </div>

        <div className="flex-1">
          <div className="flex gap-2 mb-1">
            <button
              onClick={() => selectGender("female")}
              className={genderButtonClasses("female")}
            >
              Girl
            </button>
            <button
              onClick={() => selectGender("male")}
              className={genderButtonClasses("male")}
            >
              Boy
            </button>
          </div>
          <button
            className="text-sm text-sky-600 underline hover:text-sky-800"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      {/* Expanded area */}
      {expanded && (
        <div className="mt-4 w-full flex flex-col items-center">
          <AvatarProgress points={totalPoints} gender={gender} />
          <div className="mt-4 w-full px-2">
            <label
              htmlFor="points-slider"
              className="block text-sm font-semibold text-center text-slate-700 mb-2"
            >
              Simulate Total Points
            </label>
            <input
              id="points-slider"
              type="range"
              min={0}
              max={1200}
              value={totalPoints}
              onChange={(e) => setTotalPoints(Number(e.target.value))}
              className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="text-center text-slate-600 font-bold mt-1 text-sm">
              {totalPoints.toLocaleString()} Points
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
