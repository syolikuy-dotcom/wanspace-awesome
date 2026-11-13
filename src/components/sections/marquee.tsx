import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  variant?: "display" | "pill";
  reverse?: boolean;
  className?: string;
};

/** Teks berjalan tanpa putus (CSS only, hanya transform → ringan). */
export function Marquee({ items, variant = "display", reverse = false, className }: Props) {
  const repeated = [...items, ...items, ...items];
  const anim =
    variant === "display"
      ? reverse
        ? "animate-marquee-reverse"
        : "animate-marquee"
      : reverse
        ? "animate-marquee-slow-reverse"
        : "animate-marquee-slow";

  return (
    <div
      aria-hidden
      className={cn("group select-none overflow-hidden", variant === "pill" && "mask-fade-x", className)}
    >
      <div className={cn("flex w-max will-change-transform", anim, variant === "pill" && "group-hover:[animation-play-state:paused]")}>
        {[0, 1].map((copy) => (
          <div key={copy} className={cn("flex shrink-0 items-center", variant === "display" ? "gap-10 pr-10" : "gap-3 pr-3")}>
            {repeated.map((text, i) =>
              variant === "display" ? (
                <span
                  key={`${copy}-${i}`}
                  className="whitespace-nowrap text-5xl font-semibold tracking-tight text-foreground/[0.07] sm:text-7xl lg:text-8xl"
                >
                  {text}
                </span>
              ) : (
                <span
                  key={`${copy}-${i}`}
                  className="whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-xs font-medium text-muted"
                >
                  {text}
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
