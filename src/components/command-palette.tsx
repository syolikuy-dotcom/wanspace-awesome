"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Briefcase,
  Copy,
  CornerDownLeft,
  Download,
  ExternalLink,
  FolderGit2,
  Home,
  Mail,
  MessageSquare,
  Search,
  SunMoon,
  User,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/data/site";
import { emit, OPEN_CHAT, OPEN_PALETTE } from "@/lib/events";
import { lockScroll, scrollToId } from "@/lib/lenis";
import { useToast } from "@/components/toast";

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Links";
  icon: LucideIcon;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => scrollToId(id);
    const link = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");

    const list: Command[] = [
      { id: "home", label: "Home", group: "Navigate", icon: Home, run: go("home") },
      { id: "about", label: "About", group: "Navigate", icon: User, run: go("about") },
      { id: "experience", label: "Experience", group: "Navigate", icon: Briefcase, run: go("experience") },
      { id: "skills", label: "Skills", group: "Navigate", icon: Wrench, run: go("skills") },
      { id: "projects", label: "Projects", group: "Navigate", icon: FolderGit2, run: go("projects") },
      { id: "contact", label: "Contacts", group: "Navigate", icon: Mail, run: go("contact") },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap",
        group: "Actions",
        icon: SunMoon,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      { id: "chat", label: "Buka AI Assistant", group: "Actions", icon: MessageSquare, run: () => emit(OPEN_CHAT) },
      {
        id: "copy-email",
        label: "Salin email",
        group: "Actions",
        icon: Copy,
        run: () => {
          navigator.clipboard
            .writeText(site.email)
            .then(() => toast("Email disalin ke clipboard.", "success"))
            .catch(() => toast(`Email: ${site.email}`, "info"));
        },
      },
    ];

    const cv = site.cv;
    if (cv) {
      list.push({
        id: "cv",
        label: "Download CV",
        group: "Actions",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = cv;
          a.download = "";
          a.click();
        },
      });
    }

    site.socials.forEach((s) =>
      list.push({ id: `social-${s.icon}`, label: s.label, group: "Links", icon: ExternalLink, run: link(s.href) }),
    );
    return list;
  }, [resolvedTheme, setTheme, toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const exec = useCallback(
    (cmd: Command) => {
      close();
      // tunggu overlay tertutup & scroll dibuka lagi sebelum menjalankan aksi
      window.setTimeout(cmd.run, 220);
    },
    [close],
  );

  // pintasan keyboard + event dari tombol navbar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onEsc);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onEsc);
      lockScroll(false);
    };
  }, [open, close]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) exec(cmd);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Tutup pencarian"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-card shadow-float"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Cari section atau aksi..."
                aria-label="Cari perintah"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/60"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 text-[10px] font-medium text-muted">Esc</kbd>
            </div>

            <ul
              ref={listRef}
              id="palette-list"
              role="listbox"
              data-lenis-prevent
              className="max-h-[min(22rem,55dvh)] overflow-y-auto overscroll-contain p-2"
            >
              {filtered.length === 0 && (
                <li className="px-3 py-10 text-center text-sm text-muted">Tidak ada hasil untuk “{query}”.</li>
              )}
              {filtered.map((c, i) => {
                const Icon = c.icon;
                const isActive = i === active;
                return (
                  <li key={c.id} role="presentation">
                    {(i === 0 || filtered[i - 1].group !== c.group) && <p className="label px-3 pb-1.5 pt-3">{c.group}</p>}
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      tabIndex={-1}
                      onMouseMove={() => setActive(i)}
                      onClick={() => exec(c)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-soft text-foreground" : "text-muted"
                      }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="min-w-0 flex-1 truncate">{c.label}</span>
                      {isActive && <CornerDownLeft size={13} className="shrink-0 text-muted" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-muted">
              <span>↑ ↓ untuk memilih</span>
              <span>Enter untuk membuka</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
