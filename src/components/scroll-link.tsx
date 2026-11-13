"use client";

import { scrollToId } from "@/lib/lenis";

type Props = { id: string; children: React.ReactNode; className?: string };

export function ScrollLink({ id, children, className }: Props) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(id);
        history.replaceState(null, "", `#${id}`);
      }}
    >
      {children}
    </a>
  );
}
