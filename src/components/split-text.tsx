"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "view" = animasi saat masuk viewport, "mount" = langsung saat dimuat */
  trigger?: "view" | "mount";
};

/** Judul muncul kata demi kata dengan efek "naik dari balik garis". */
export function SplitText({ text, className, delay = 0, stagger = 0.07, trigger = "view" }: Props) {
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
          const transition = { duration: 0.85, delay: delay + i * stagger, ease };
          const anim =
            trigger === "view"
              ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "0px 0px -10% 0px" } }
              : { animate: { y: "0%" } };

          return (
            <span key={`${word}-${i}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className="inline-block will-change-transform" initial={{ y: "110%" }} transition={transition} {...anim}>
                {word}
              </motion.span>
              {i < words.length - 1 ? "\u00A0" : null}
            </span>
          );
        })}
      </span>
    </span>
  );
}
