"use client";

import { motion } from "framer-motion";
import { ToggleThemeButton } from "./utils/toggle-theme-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md py-3">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 flex justify-between items-center"
      >
        {/* Brand */}
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-extrabold text-green-600 cursor-pointer"
        >
          HealthEd Kids 🌱
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-green-600 transition">
            How It Works
          </a>
          <a href="#testimonials" className="hover:text-green-600 transition">
            Testimonials
          </a>
          <a href="#pricing" className="hover:text-green-600 transition">
            Pricing
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ToggleThemeButton />
          <Button
            size="sm"
            onClick={() => router.push("/child")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-green-700"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-t mt-2 shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4 py-6 text-lg font-medium">
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-600"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-600"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-600"
            >
              Pricing
            </a>

            <div className="flex gap-3 mt-4">
              <ToggleThemeButton />
              <Button
                size="sm"
                onClick={() => {
                  router.push("/child");
                  setMenuOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Login
              </Button>
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
