"use client";
import { useTheme } from "@/app/contexts/ThemeContext";
import { MoonIcon, SunIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      aria-label="Toggle Theme"
      onClick={toggle}
      className="p-2 rounded-full transition-colors cursor-pointer hover:bg-white/20 dark:hover:bg-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <MoonIcon size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <SunIcon size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
