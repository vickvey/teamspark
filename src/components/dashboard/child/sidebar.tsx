"use client";

import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { useSessionStore } from "@/lib/store/useSessionStore";
import Avatar from "./avatar";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface SectionItem {
  label: string;
  icon: string;
  id: string; // unique identifier for active state
}

const SECTIONS: SectionItem[] = [
  { label: "Home", icon: "🏠", id: "home" },
  { label: "My Games", icon: "🎮", id: "games" },
  { label: "Challenges", icon: "🏆", id: "challenges" },
  { label: "Rewards", icon: "🎖️", id: "rewards" },
  { label: "Progress", icon: "📈", id: "progress" },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("home");

  const coins = useSessionStore((state) => state.coins);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    if (window.innerWidth < 1024) setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-20 h-full w-64 bg-green-600 text-white flex flex-col p-6 
          transition-transform duration-300
          transform 
          -translate-x-full 
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Avatar (hidden on small screens) */}
        <div className="hidden lg:flex flex-col items-center mb-6">
          <Avatar gender="female" />
          <div className="mt-2 text-yellow-300 font-semibold">
            {coins} coins
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center lg:hidden">
          HealthEd Kids 🌱
        </h1>

        <nav className="flex-1">
          <ul className="space-y-3">
            {SECTIONS.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`
                  flex items-center gap-3 cursor-pointer px-4 py-2 rounded-md
                  transition-colors duration-200
                  hover:bg-green-700
                  ${
                    activeSection === item.id
                      ? "bg-green-800 font-semibold shadow-md"
                      : ""
                  }
                `}
              >
                <span>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <button className="mt-auto bg-white text-green-700 font-semibold py-2 rounded-md hover:bg-green-100">
          Logout
        </button>
      </aside>

      {/* Mobile & Tablet toggle button */}
      <button
        className="fixed top-4 left-4 z-30 bg-green-600 text-white p-2 rounded-md shadow-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
    </>
  );
}
