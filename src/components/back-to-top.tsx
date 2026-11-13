"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/lenis";

export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="fixed bottom-5 left-4 z-[60] grid size-12 place-items-center rounded-full border border-line bg-card/90 text-foreground shadow-float backdrop-blur sm:left-6"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
