"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { site, type Project } from "@/data/site";
import { lockScroll } from "@/lib/lenis";
import { SectionHeading } from "@/components/section-heading";
import { ProjectThumb } from "@/components/project-thumb";
import { Spotlight } from "@/components/spotlight";

type Filter = "all" | Project["category"];

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "api", label: "API" },
  { id: "bot", label: "Bots" },
];

function Thumb({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-soft">
      {project.image ? (
        <Image
          src={project.image}
          alt={`Tampilan ${project.title}`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <ProjectThumb variant={project.thumb} />
      )}
    </div>
  );
}

type ModalProps = {
  project: Project;
  position: string;
  canNavigate: boolean;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
};

function ProjectModal({ project, position, canNavigate, onClose, onStep }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // simpan handler terbaru di ref supaya efek keyboard tidak perlu dipasang ulang
  const handlers = useRef({ onClose, onStep, canNavigate });
  handlers.current = { onClose, onStep, canNavigate };

  useEffect(() => {
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      const h = handlers.current;
      if (e.key === "Escape") h.onClose();
      else if (e.key === "ArrowRight" && h.canNavigate) h.onStep(1);
      else if (e.key === "ArrowLeft" && h.canNavigate) h.onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Tutup detail project"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        data-lenis-prevent
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[88dvh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-3xl border border-line bg-card shadow-float"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
          >
            <Thumb project={project} />
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.details}</p>

              <p className="label mt-6">Tech stack</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-md bg-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    {s}
                  </li>
                ))}
              </ul>

              {(project.live || project.repo) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-medium text-brand-fg"
                    >
                      Live demo <ArrowUpRight size={15} />
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium"
                    >
                      Source code <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur hover:bg-background"
        >
          <X size={16} />
        </button>

        {canNavigate && (
          <div className="sticky bottom-0 flex items-center justify-between border-t border-line bg-card/95 px-4 py-3 backdrop-blur">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Project sebelumnya"
              className="grid size-9 place-items-center rounded-full border border-line hover:bg-soft"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-medium text-muted">{position}</span>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Project berikutnya"
              className="grid size-9 place-items-center rounded-full border border-line hover:bg-soft"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? site.projects : site.projects.filter((p) => p.category === filter)),
    [filter],
  );

  const index = selectedSlug ? visible.findIndex((p) => p.slug === selectedSlug) : -1;
  const selected = index >= 0 ? visible[index] : null;

  const close = useCallback(() => setSelectedSlug(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setSelectedSlug((cur) => {
        const i = visible.findIndex((p) => p.slug === cur);
        if (i < 0) return cur;
        return visible[(i + dir + visible.length) % visible.length].slug;
      });
    },
    [visible],
  );

  return (
    <section id="projects" className="section">
      <SectionHeading eyebrow="Portfolio" title="Selected Works" />

      <LayoutGroup id="project-filters">
        <div role="tablist" aria-label="Filter project" className="mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-line bg-card p-1 shadow-soft">
          {filters.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full px-5 py-2 text-xs font-semibold transition-colors ${on ? "text-brand-fg" : "text-muted hover:text-foreground"}`}
              >
                {on && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <Spotlight className="h-full rounded-2xl border border-line bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float">
                <article className="flex h-full flex-col">
                  <Thumb project={p} />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{p.summary}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(p.slug)}
                      className="mt-6 w-full rounded-lg border border-foreground/80 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-brand hover:text-brand-fg"
                    >
                      View details
                    </button>
                  </div>
                </article>
              </Spotlight>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            key="project-modal"
            project={selected}
            position={`${index + 1} / ${visible.length}`}
            canNavigate={visible.length > 1}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
