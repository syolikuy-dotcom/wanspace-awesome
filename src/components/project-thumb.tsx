import type { Project } from "@/data/site";

/** Placeholder visual untuk kartu project. Ganti dengan screenshot lewat field `image` di data/site.ts. */
export function ProjectThumb({ variant }: { variant: Project["thumb"] }) {
  if (variant === "bot") {
    return (
      <div className="relative flex h-full items-end justify-center gap-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 px-6 pt-6">
        <div className="h-4/5 w-24 rounded-t-2xl border-[3px] border-b-0 border-white/90 bg-zinc-900 p-2">
          <div className="mb-1.5 ml-auto h-3 w-12 rounded-md bg-emerald-400" />
          <div className="mb-1.5 h-3 w-14 rounded-md bg-zinc-600" />
          <div className="ml-auto h-3 w-9 rounded-md bg-emerald-400" />
        </div>
        <div className="h-3/5 w-20 rounded-t-2xl border-[3px] border-b-0 border-white/70 bg-zinc-800 p-2">
          <div className="mb-1.5 h-3 w-10 rounded-md bg-zinc-600" />
          <div className="ml-auto h-3 w-12 rounded-md bg-emerald-400" />
        </div>
      </div>
    );
  }

  if (variant === "api") {
    return (
      <div className="h-full bg-zinc-950 p-4 font-mono text-[10px] leading-5 text-zinc-400">
        <div className="mb-2 flex gap-1.5">
          <span className="size-2 rounded-full bg-zinc-700" />
          <span className="size-2 rounded-full bg-zinc-700" />
          <span className="size-2 rounded-full bg-zinc-700" />
        </div>
        <p><span className="text-emerald-400">GET</span> /api/v1/random</p>
        <p><span className="text-sky-400">POST</span> /api/v1/tools/qr</p>
        <p><span className="text-emerald-400">GET</span> /api/v1/downloader</p>
        <p className="mt-2 text-zinc-600">{"{ \"status\": 200, \"data\": [...] }"}</p>
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-[28%_1fr] bg-zinc-950">
      <div className="space-y-2 border-r border-zinc-800 p-3">
        <div className="h-2 w-10 rounded bg-zinc-600" />
        <div className="h-2 w-12 rounded bg-zinc-800" />
        <div className="h-2 w-9 rounded bg-zinc-800" />
        <div className="h-2 w-11 rounded bg-zinc-800" />
      </div>
      <div className="space-y-3 p-3">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-9 rounded-md bg-zinc-800" />
          ))}
        </div>
        <div className="flex h-12 items-end gap-1.5">
          {[40, 70, 50, 90, 60, 80, 55].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-emerald-500/80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
