"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index % words.length];
    const complete = !deleting && text === word;
    const delay = complete ? 1700 : deleting ? 32 : 70;

    const timer = setTimeout(() => {
      if (complete) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduce]);

  return (
    <div className={className} aria-label={words[0]}>
      <span aria-hidden>{reduce ? words[0] : text}</span>
      {reduce ? null : (
        <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-px translate-y-[0.2em] bg-foreground animate-blink" />
      )}
    </div>
  );
}
