"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <p className="label">Error</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Terjadi kesalahan</h1>
        <p className="mt-3 text-sm text-muted">Halaman gagal dimuat. Silakan coba lagi.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-brand-fg"
        >
          Muat ulang
        </button>
      </div>
    </main>
  );
}
