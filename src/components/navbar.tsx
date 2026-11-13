"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { emit, OPEN_PALETTE } from "@/lib/events";
import { scrollToId } from "@/lib/lenis";
import { ThemeToggle } from "@/components/theme-toggle";

const ids = navLinks.map((l) => l.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  useEffect(() => setIsMac(/Mac|iPhone|iPad/i.test(navigator.platform)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Navigasi utama"
        className={`mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center rounded-full border border-line/70 bg-background/75 px-5 backdrop-blur-xl transition-all duration-300 md:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "py-2 shadow-float" : "py-2.5 shadow-soft"
        }`}
      >
        <a href="#home" onClick={(e) => go(e, "home")} className="text-base font-bold tracking-tight">
          PORTFOLIO.
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                aria-current={active === l.id ? "page" : undefined}
                className={`text-[13px] transition-colors ${
                  active === l.id ? "font-semibold text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
              {active === l.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-2 left-1/2 size-1 -ml-0.5 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => emit(OPEN_PALETTE)}
            aria-label="Buka pencarian cepat"
            className="flex h-9 items-center gap-2 rounded-full px-2.5 text-muted transition-colors hover:bg-soft hover:text-foreground"
          >
            <Search size={16} />
            <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-[10px] font-medium lg:inline">
              {isMac ? "⌘ K" : "Ctrl K"}
            </kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-soft hover:text-foreground md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl origin-top overflow-hidden rounded-3xl border border-line/70 bg-background/95 p-2 shadow-float backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id)}
                  className={`block rounded-2xl px-4 py-3 text-sm ${
                    active === l.id ? "bg-soft font-semibold" : "text-muted"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
