import { ArrowUpRight } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { socialIcons } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { ScrollLink } from "@/components/scroll-link";
import { SplitText } from "@/components/split-text";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="min-w-0">
            <p className="label">Have an idea?</p>
            <p className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              <SplitText text="Let's build something great." />
            </p>
          </div>
          <Reveal>
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-medium text-brand-fg"
              >
                Say hello
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((l) => (
              <ScrollLink key={l.id} id={l.id} className="transition-colors hover:text-foreground">
                {l.label}
              </ScrollLink>
            ))}
          </nav>

          <ul className="flex gap-2">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-foreground/40 hover:text-foreground"
                  >
                    <Icon size={15} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
