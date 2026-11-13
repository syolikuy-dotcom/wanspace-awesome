import Image from "next/image";
import { site } from "@/data/site";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Spotlight } from "@/components/spotlight";
import { Tilt } from "@/components/tilt";

export function About() {
  const { who, approach, details } = site.about;
  const techCount = new Set(site.skills.flatMap((g) => g.items.map((i) => i.name))).size;

  const stats = [
    { value: site.stats.years, suffix: "+", decimals: 0, label: "Years of coding" },
    { value: site.projects.length, suffix: "", decimals: 0, label: "Featured projects" },
    { value: techCount, suffix: "", decimals: 0, label: "Core technologies" },
    { value: site.stats.age, suffix: "", decimals: 0, label: "Years old" },
  ];

  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="Get to know me" title="About Me" />

      <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-xs lg:mx-0">
          <Tilt>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-soft shadow-float">
              <Image
                src={site.avatar}
                alt={`Potret ${site.name}`}
                fill
                unoptimized={site.avatar.endsWith(".svg")}
                sizes="(min-width: 1024px) 320px, 80vw"
                className="object-cover grayscale"
              />
            </div>
          </Tilt>
        </Reveal>

        <div className="min-w-0">
          <div className="grid gap-8 sm:grid-cols-2">
            <Reveal>
              <h3 className="border-b border-line pb-3 text-base font-semibold">Who Am I</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{who}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="border-b border-line pb-3 text-base font-semibold">My Approach</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{approach}</p>
            </Reveal>
          </div>

          <Reveal className="mt-12" delay={0.05}>
            <h3 className="border-l-4 border-foreground pl-4 text-lg font-semibold">Personal Details</h3>
            <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="min-w-0">
                  <dt className="label">{d.label}</dt>
                  <dd className="mt-1.5 break-words text-sm font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-12" delay={0.05}>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <li key={s.label} className="min-w-0">
                  <Spotlight className="h-full rounded-2xl border border-line bg-card shadow-soft">
                    <div className="px-4 py-5">
                      <p className="text-3xl font-semibold tracking-tight">
                        <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-muted">{s.label}</p>
                    </div>
                  </Spotlight>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
