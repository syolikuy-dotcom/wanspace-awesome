"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="Career Path" title="Work Experience" />

      <div className="relative mx-auto max-w-5xl">
        {/* garis timeline + progres scroll */}
        <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-[calc(50%-0.5px)]">
          <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-foreground will-change-transform" />
        </div>

        <ol ref={ref} className="relative">
          {site.experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <li key={`${job.company}-${i}`} className="relative pb-12 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0">
                <span
                  aria-hidden
                  className="absolute left-4 top-8 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-foreground bg-background md:left-1/2"
                />
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`min-w-0 rounded-2xl border border-line bg-card p-6 shadow-soft ${
                    left ? "md:col-start-1 md:text-right" : "md:col-start-2"
                  }`}
                >
                  <p className="text-[11px] font-semibold text-muted">{job.period}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{job.title}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{job.company}</p>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted">{job.description}</p>
                  <ul className={`mt-5 flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}`}>
                    {job.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
