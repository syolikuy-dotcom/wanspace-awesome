"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, RotateCcw, Send, X } from "lucide-react";
import { site } from "@/data/site";
import { OPEN_CHAT } from "@/lib/events";

type Message = { id: number; role: "user" | "assistant"; content: string; time: string };

const now = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

const GREETING = `Halo! Saya adalah asisten AI ${site.nickname}. Ada yang bisa saya bantu terkait portofolio, pengalaman, atau project ${site.nickname}?`;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const session = useRef(0); // naik setiap reset, supaya balasan lama dibuang

  // dibuka dari command palette
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT, onOpen);
  }, []);

  // Sapaan dibuat saat pertama dibuka (hindari mismatch waktu server/client).
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId.current++, role: "assistant", content: GREETING, time: now() }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;

      const mySession = session.current;
      const userMsg: Message = { id: nextId.current++, role: "user", content: text, time: now() };
      const history = [...messages, userMsg];
      setMessages(history);
      setInput("");
      setLoading(true);

      let reply = "Maaf, terjadi gangguan. Coba lagi sebentar lagi ya.";
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.slice(-12).map(({ role, content }) => ({ role, content })),
          }),
        });
        const json = (await res.json()) as { reply?: string };
        if (json.reply) reply = json.reply;
      } catch {
        /* pakai pesan default */
      }

      if (mySession !== session.current) return; // chat sudah di-reset
      setMessages((m) => [...m, { id: nextId.current++, role: "assistant", content: reply, time: now() }]);
      setLoading(false);
    },
    [messages, loading],
  );

  const reset = () => {
    session.current += 1;
    setLoading(false);
    setInput("");
    setMessages([]); // sapaan dibuat ulang oleh efek di atas
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  const onlyGreeting = messages.length === 1 && messages[0].role === "assistant";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label={`${site.nickname} Assistant`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(34rem,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-[23rem] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-float sm:right-6"
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="grid size-9 place-items-center rounded-full bg-soft text-[11px] font-bold">AI</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{site.nickname} Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" /> Online
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Mulai percakapan baru"
                className="grid size-8 place-items-center rounded-full text-muted hover:bg-soft hover:text-foreground"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup chat"
                className="grid size-8 place-items-center rounded-full text-muted hover:bg-soft hover:text-foreground"
              >
                <X size={16} />
              </button>
            </header>

            <div
              ref={listRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      m.role === "user"
                        ? "rounded-tr-md bg-brand text-brand-fg"
                        : "rounded-tl-md border border-line bg-card"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-[13px] leading-relaxed">{m.content}</p>
                    <p className={`mt-1 text-[10px] ${m.role === "user" ? "text-brand-fg/60" : "text-muted"}`}>{m.time}</p>
                  </div>
                </motion.div>
              ))}

              {onlyGreeting && !loading && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                  aria-label="Pertanyaan cepat"
                >
                  {site.chatSuggestions.map((q) => (
                    <li key={q}>
                      <button
                        type="button"
                        onClick={() => void ask(q)}
                        className="rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
                      >
                        {q}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-tl-md border border-line px-4 py-3.5" aria-label="Sedang mengetik">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-muted/60"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask me anything..."
                aria-label="Tulis pesan"
                className="min-w-0 flex-1 rounded-xl border border-line bg-soft/60 px-3.5 py-2.5 text-[13px] outline-none transition-colors placeholder:text-muted/60 focus:border-foreground focus:bg-card"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Kirim pesan"
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-brand-fg transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup asisten AI" : "Buka asisten AI"}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-5 right-4 z-[70] grid size-14 place-items-center rounded-full bg-brand text-brand-fg shadow-float sm:right-6"
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
        {!open && (
          <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full border border-line bg-card px-1 text-[9px] font-bold text-foreground shadow-soft">
            AI
          </span>
        )}
      </motion.button>
    </>
  );
}
