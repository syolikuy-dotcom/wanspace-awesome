import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";

type Props = { eyebrow: string; title: string; description?: string };

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal>
        <p className="label">{eyebrow}</p>
      </Reveal>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
        <SplitText text={title} />
      </h2>
      {description ? (
        <Reveal delay={0.15}>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
