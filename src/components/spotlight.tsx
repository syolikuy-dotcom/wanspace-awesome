"use client";

import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string };

/** Container dengan cahaya lembut yang mengikuti kursor (update lewat CSS variable, tanpa re-render). */
export function Spotlight({ children, className }: Props) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div onPointerMove={onMove} className={cn("group/spot relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--fg) / 0.08), transparent 70%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
