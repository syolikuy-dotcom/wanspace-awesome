"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; strength?: number; className?: string };

/** Elemen "tertarik" ke arah kursor saat di-hover (hanya mouse). */
export function Magnetic({ children, strength = 0.3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.2 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
