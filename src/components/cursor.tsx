"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Mode = "default" | "link" | "hidden";

const INTERACTIVE = "a, button, [role='button'], summary, [data-cursor]";
const TEXT = "input, textarea, select";

/** Cursor kustom: titik + cincin yang mengikuti dengan spring. Hanya untuk perangkat dengan mouse. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target || !("closest" in target)) return;
      if (target.closest(TEXT)) setMode("hidden");
      else if (target.closest(INTERACTIVE)) setMode("link");
      else setMode("default");
    };
    const onLeave = () => setMode("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const visible = mode !== "hidden";

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[120] -ml-4 -mt-4 size-8 will-change-transform"
      >
        <motion.div
          animate={{ scale: mode === "link" ? 1.7 : 1, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="size-full rounded-full border border-white bg-white/10 mix-blend-difference"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[120] -ml-[3px] -mt-[3px] size-1.5 will-change-transform"
      >
        <motion.div
          animate={{ scale: mode === "link" ? 0 : 1, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="size-full rounded-full bg-white mix-blend-difference"
        />
      </motion.div>
    </>
  );
}
