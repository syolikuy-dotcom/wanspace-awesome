"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lockScroll } from "@/lib/lenis";
import { site } from "@/data/site";

const DURATION = 1.8;

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    lockScroll(true);
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      lockScroll(false);
    };
    const timer = setTimeout(() => {
      setDone(true);
      release();
    }, DURATION * 1000 + 150);
    return () => {
      clearTimeout(timer);
      release();
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading"
          role="status"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--soft))_0%,rgb(var(--bg))_62%)]" />
          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.p
              className="text-4xl font-semibold tracking-tight sm:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.nickname}
            </motion.p>
            <motion.p
              className="mt-3 text-[10px] font-medium uppercase tracking-[0.35em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Portfolio Loading
            </motion.p>
            <div className="mt-8 h-px w-40 overflow-hidden bg-line">
              <motion.div
                className="h-full w-full origin-left bg-foreground"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
