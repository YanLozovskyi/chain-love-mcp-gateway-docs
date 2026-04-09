"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { heroSubtitleLines } from "@/lib/gateway-data";

export function AnimatedSubtitle() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSubtitleLines.length);
    }, 3200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="hero-subtitle-shell">
      <span className="hero-subtitle-label">Live gateway capabilities</span>
      <div className="hero-subtitle-frame">
        <AnimatePresence mode="wait">
          <motion.p
            key={heroSubtitleLines[activeIndex]}
            className="hero-subtitle-line"
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroSubtitleLines[activeIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
