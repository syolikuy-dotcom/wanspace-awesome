import { Bot, LayoutDashboard, Server } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Spotlight } from "@/components/spotlight";

const icons = { layout: LayoutDashboard, server: Server, bot: Bot } as const;

export function Services() {
  return (
    <section id="services" className="section">
      <SectionHeading eyebrow="Services" title="What I Do" description="Tiga hal yang paling sering saya kerjakan dari ide sampai rilis." />

      <ul className="grid gap-5 md:grid-cols-3">
        {site.services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.title} className="min-w-0">
              <Reveal delay={i * 0.1} className="h-full">
                <Spotlight className="h-full rounded-2xl border border-line bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1.5">
                  <article className="flex h-full flex-col p-7">
                    <span className="grid size-12 place-items-center rounded-xl bg-brand text-brand-fg">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{s.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.points.map((p) => (
                        <li key={p} className="rounded-md bg-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Spotlight>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
