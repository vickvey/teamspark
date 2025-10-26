"use client";

import { FaBars } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-green-600 text-white flex flex-col p-6 transition-transform duration-300
        md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          HealthEd Kids 🌱
        </h1>

        <nav className="flex-1">
          <ul className="space-y-3">
            {[
              { label: "Home", icon: "🏠" },
              { label: "My Games", icon: "🎮" },
              { label: "Challenges", icon: "🏆" },
              { label: "Rewards", icon: "🎖️" },
              { label: "Progress", icon: "📈" },
            ].map((item) => (
              <li
                key={item.label}
                className="hover:bg-green-700 rounded-md px-4 py-2 cursor-pointer flex items-center gap-2"
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

      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-green-600 text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
    </>
  );
}
