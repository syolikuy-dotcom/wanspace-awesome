import type { ReactNode } from "react";
import { Atom, Database, Hexagon, Leaf, Wind } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Marquee } from "@/components/sections/marquee";

const TextGlyph = ({ children, square }: { children: ReactNode; square?: boolean }) => (
  <span
    className={`grid size-[26px] place-items-center border-2 border-current text-[10px] font-bold leading-none ${
      square ? "rounded-md" : "rounded-full"
    }`}
  >
    {children}
  </span>
);

const glyphs: Record<string, ReactNode> = {
  react: <Atom size={26} strokeWidth={1.75} />,
  next: <TextGlyph>N</TextGlyph>,
  tailwind: <Wind size={26} strokeWidth={1.75} />,
  typescript: <TextGlyph square>TS</TextGlyph>,
  node: <Hexagon size={26} strokeWidth={1.75} />,
  express: <TextGlyph>Ex</TextGlyph>,
  mysql: <Database size={26} strokeWidth={1.75} />,
  mongodb: <Leaf size={26} strokeWidth={1.75} />,
};

export function Skills() {
  const techs = Array.from(new Set([...site.skills.flatMap((g) => g.items.map((i) => i.name)), ...site.experience.flatMap((j) => j.tags)]));

  return (
    <section id="skills" className="section">
      <SectionHeading eyebrow="Tech Stack" title="Skills & Tools" />

      <div className="space-y-12">
        {site.skills.map((group) => (
          <Reveal key={group.title} className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
            <div>
              <h3 className="text-lg font-semibold leading-snug">{group.title}</h3>
              <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-muted">{group.description}</p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="group flex min-w-0 flex-col items-center gap-3 rounded-2xl border border-transparent bg-soft/60 px-3 py-6 text-muted transition-all duration-300 hover:-translate-y-1 hover:border-line hover:bg-card hover:text-foreground hover:shadow-soft"
                >
                  {glyphs[item.glyph]}
                  <span className="text-center text-xs font-semibold text-foreground">{item.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 space-y-3">
        <Marquee items={techs} variant="pill" />
        <Marquee items={[...techs].reverse()} variant="pill" reverse />
      </div>
    </section>
  );
}
