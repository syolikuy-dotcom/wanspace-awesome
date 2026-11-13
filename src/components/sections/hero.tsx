"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Code, Download, Monitor } from "lucide-react";
import { site } from "@/data/site";
import { socialIcons } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { ScrollLink } from "@/components/scroll-link";
import { SplitText } from "@/components/split-text";
import { Typewriter } from "@/components/typewriter";

const highlightIcons = { clock: Clock, code: Code, monitor: Monitor } as const;

// Hero masuk setelah preloader selesai (~2s).
const START = 1.85;
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (i: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: START + i * 0.09, ease },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* latar: dot grid + dua cahaya yang melayang pelan */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0" />
        <div className="bg-aurora absolute -left-24 top-1/4 size-[28rem] animate-drift rounded-full" />
        <div className="bg-aurora absolute -right-24 bottom-0 size-[32rem] animate-drift-slow rounded-full" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="min-w-0">
          <h1 className="break-words text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <SplitText text={`Hi, I'm ${site.firstName}`} trigger="mount" delay={START} stagger={0.1} />
          </h1>

          <motion.div {...rise(1)} className="mt-5 h-8 text-lg font-medium text-muted sm:text-xl">
            <Typewriter words={site.roles} />
          </motion.div>

          <motion.p {...rise(2)} className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            {site.intro}
          </motion.p>

          <motion.div {...rise(3)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <ScrollLink
                id="projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-medium text-brand-fg shadow-soft"
              >
                Explore Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </ScrollLink>
            </Magnetic>
            <Magnetic>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-6 py-3.5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                Download CV
                <Download size={16} />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...rise(4)} className="mt-12">
            <p className="label">Connect</p>
            <ul className="mt-3 flex gap-3">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.label}>
                    <Magnetic strength={0.4}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid size-11 place-items-center rounded-xl border border-line bg-card text-foreground shadow-soft transition-colors hover:border-foreground/40"
                      >
                        <Icon />
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: START + 0.15, ease }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <motion.div style={{ y: avatarY }} className="flex flex-col items-center gap-6 lg:items-end">
            <div className="relative aspect-square w-64 overflow-hidden rounded-full border-[6px] border-card shadow-float sm:w-80 lg:w-[22rem]">
              <Image
                src={site.avatar}
                alt={`Foto ${site.name}`}
                fill
                priority
                unoptimized={site.avatar.endsWith(".svg")}
                sizes="(min-width: 1024px) 352px, 320px"
                className="object-cover grayscale"
              />
            </div>

            <ul className="flex w-full flex-col gap-3 sm:w-auto lg:absolute lg:-left-16 lg:bottom-6 lg:w-auto">
              {site.highlights.map((h, i) => {
                const Icon = highlightIcons[h.icon];
                return (
                  <li key={h.label} className="animate-float" style={{ animationDelay: `${i * 0.6}s` }}>
                    <div className="flex items-center gap-3 rounded-xl border border-line/60 bg-card px-3 py-2.5 shadow-float">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-brand-fg">
                        <Icon size={15} />
                      </span>
                      <span className="pr-2 text-xs font-semibold">{h.label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* indikator scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: START + 1, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
      >
        <ScrollLink id="about" className="pointer-events-auto flex flex-col items-center gap-2 text-muted">
          <span className="label">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-2">
            <span className="size-1 animate-scrolldot rounded-full bg-foreground" />
          </span>
        </ScrollLink>
      </motion.div>
    </section>
  );
}
