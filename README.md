# RyHar Portfolio

Website portofolio full-stack: **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis (smooth scroll)**.

## Fitur

**Animasi & interaksi** (semua hanya animasi `transform`/`opacity` → ringan, otomatis mati jika pengguna memilih *reduced motion*)
- Preloader, smooth scroll (Lenis), scroll progress bar di atas halaman
- Judul muncul kata-demi-kata (SplitText), typewriter, teks marquee & tech marquee dua arah
- Hero dengan parallax saat scroll, latar dot-grid + aurora, tombol *magnetic*, badge melayang
- Foto About miring 3D mengikuti mouse (Tilt), kartu dengan efek *spotlight* mengikuti kursor
- Counter angka yang menghitung naik, timeline experience dengan garis progres
- Custom cursor (hanya perangkat dengan mouse), tombol back-to-top dengan cincin progres
- Filter project (All/Web/API/Bots) dengan animasi layout + modal detail (navigasi ← → / tombol)

**Komponen & sistem**
- Command palette: tekan **Ctrl/⌘ + K** (navigasi cepat, ganti tema, buka AI, salin email, download CV)
- Dark / light mode, toast notifikasi, navbar yang mengecil saat scroll + scroll-spy
- Form kontak (validasi, honeypot, rate limit, kirim email via SMTP) dan AI Assistant (chip pertanyaan cepat, reset chat)
- SEO: metadata, OpenGraph image otomatis, sitemap, robots, manifest, JSON-LD; Vercel Analytics & Speed Insights
- Aksesibilitas: skip-link, fokus keyboard terlihat, ARIA pada dialog/tab/listbox, `prefers-reduced-motion`

## Struktur

```
src/
├── app/
│   ├── api/contact/route.ts   # POST form kontak → SMTP (nodemailer)
│   ├── api/chat/route.ts      # POST chat → Anthropic API (fallback jawaban lokal)
│   ├── layout.tsx · page.tsx · globals.css · error.tsx · not-found.tsx
│   ├── opengraph-image.tsx · manifest.ts · robots.ts · sitemap.ts
├── components/
│   ├── sections/              # hero, about, services, marquee, experience, skills, projects, contact, footer
│   └── navbar, preloader, chat-widget, command-palette, cursor, toast, tilt, spotlight, magnetic, ...
├── data/site.ts               # ← SEMUA konten ada di sini (edit di sini saja)
├── hooks/ · lib/              # scroll-spy, lenis, rate-limit, knowledge base chatbot
public/
├── avatar.svg                 # ganti dengan fotomu (avatar.jpg) lalu ubah path di data/site.ts
└── cv.pdf                     # taruh CV kamu di sini (tombol Download CV)
```

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local     # isi nilainya
npm run dev                    # http://localhost:3000
```

## Environment variables

| Variable | Wajib | Fungsi |
| --- | --- | --- |
| `SMTP_USER`, `SMTP_PASS` | untuk form kontak | Gmail + **App Password** (Akun Google → Keamanan → Sandi aplikasi) |
| `SMTP_HOST`, `SMTP_PORT` | tidak | default `smtp.gmail.com` / `465` |
| `CONTACT_TO_EMAIL` | tidak | email tujuan pesan (default = `SMTP_USER`) |
| `ANTHROPIC_API_KEY` | tidak | aktifkan jawaban AI penuh; kosong = jawaban dasar dari data portofolio |
| `ANTHROPIC_MODEL` | tidak | default `claude-haiku-5-5` |
| `NEXT_PUBLIC_SITE_URL` | tidak | domain final untuk SEO/OpenGraph |

## Deploy ke Vercel

1. Push project ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) → import repo (framework otomatis terdeteksi Next.js).
3. Di **Settings → Environment Variables**, isi variabel di atas.
4. Klik **Deploy**. Setiap `git push` akan auto-deploy.

## Kustomisasi cepat

- Teks, pengalaman, skill, project, sosial media → `src/data/site.ts`
- Warna light/dark → variabel CSS di `src/app/globals.css`
- Screenshot project: taruh di `public/projects/` lalu isi field `image` pada project.
