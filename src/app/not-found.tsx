import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Halaman tidak ditemukan</h1>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-medium text-brand-fg"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
