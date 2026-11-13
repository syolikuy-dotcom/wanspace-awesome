/**
 * SATU-SATUNYA file yang perlu kamu edit untuk mengganti isi website.
 * Semua section (Hero, About, Experience, Skills, Projects, Contact)
 * dan AI Assistant membaca data dari sini.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export type Social = { label: string; href: string; icon: "instagram" | "github" | "whatsapp" };
export type Highlight = { label: string; icon: "clock" | "code" | "monitor" };
export type Job = {
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
};
export type SkillGroup = {
  title: string;
  description: string;
  items: { name: string; glyph: string }[];
};
export type Service = {
  title: string;
  description: string;
  icon: "layout" | "server" | "bot";
  points: string[];
};
export type Project = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  stack: string[];
  category: "web" | "api" | "bot";
  thumb: "panel" | "api" | "bot";
  /** Isi kalau ada screenshot di /public, contoh: "/projects/panel.png" */
  image?: string;
  live?: string;
  repo?: string;
};

/** Tahun mulai ngoding, dipakai untuk menghitung "years" otomatis. Ubah kalau kamu mulai lebih awal. */
const START_YEAR = 2025;
const BIRTH_DATE = new Date("2009-08-21");

function ageFrom(birth: Date, now = new Date()): number {
  let age = now.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

const email = "ikhwanajeh@gmail.com";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  name: "Ikhwan Romadon",
  nickname: "Ikhwan",
  firstName: "Ikhwan",
  tagline: "Fullstack Web Developer",
  description:
    "Portofolio Ikhwan Romadon — pelajar SMAN 7 Kabupaten Tangerang dan Fullstack Web Developer yang membangun aplikasi web, REST API, dan bot dengan Next.js, Node.js, dan MySQL.",
  roles: ["Fullstack Web Developer", "Next.js & Node.js Builder", "WhatsApp Bot Developer"],
  intro:
    "Halo! Saya suka ngoding dan bereksperimen dengan ide-ide baru. Bagi saya, setiap baris kode adalah cara untuk menghadirkan sesuatu yang bermanfaat dan keren di dunia digital.",
  avatar: "/avatar.jpg",
  /** Upload CV kamu ke /public/cv.pdf (nama file harus sama) dan tombol Download CV langsung berfungsi. */
  cv: "/cv.pdf",
  email,
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/wtf.w4n_/", icon: "instagram" },
    { label: "GitHub", href: "https://github.com/Ikhwan-stars", icon: "github" },
    { label: "WhatsApp", href: "https://wa.me/6283138010670", icon: "whatsapp" },
  ] satisfies Social[],
  highlights: [
    { label: `Coding since ${START_YEAR}`, icon: "clock" },
    { label: "JavaScript Main Language", icon: "code" },
    { label: "Fullstack Developer", icon: "monitor" },
  ] satisfies Highlight[],
  stats: { years: Math.max(1, new Date().getFullYear() - START_YEAR), age: ageFrom(BIRTH_DATE) },
  chatSuggestions: ["Kamu siapa?", "Apa saja skill-nya?", "Ada proyek apa saja?", "Bagaimana cara menghubungi?"],
  services: [
    {
      title: "Web Applications",
      description: "Toko digital, dashboard admin/user, dan website full-stack yang cepat, responsif, dan mudah dirawat.",
      icon: "layout",
      points: ["Next.js & React", "Dashboard admin / user", "Pembayaran QRIS"],
    },
    {
      title: "REST API & Backend",
      description: "API yang rapi dengan autentikasi, database, rate limiting, dan struktur endpoint yang jelas serta mudah digunakan.",
      icon: "server",
      points: ["Node.js & Express", "MySQL & Supabase", "Auth & keamanan"],
    },
    {
      title: "WhatsApp & Game Bots",
      description: "Bot dengan sistem plugin, integrasi API, dan kontrol real-time melalui browser untuk mengotomatisasi layanan.",
      icon: "bot",
      points: ["WhatsApp bot", "Socket.IO realtime", "Integrasi API"],
    },
  ] satisfies Service[],
  about: {
    who: "Saya seorang web developer yang berfokus pada menciptakan tampilan dan pengalaman pengguna yang sederhana, cepat, dan fungsional.",
    approach:
      "Saya mengutamakan clean code, desain responsif, dan pengalaman pengguna yang intuitif di setiap proyek yang saya kerjakan.",
    details: [
      { label: "Name", value: "Ikhwan Romadon" },
      { label: "Place of Birth", value: "Tangerang, 21 Agustus 2009" },
      { label: "Location", value: "Kabupaten Tangerang, Banten, Indonesia" },
      { label: "Education", value: "SMAN 7 Kabupaten Tangerang" },
      { label: "Email", value: email },
      { label: "Focus", value: "Fullstack Web, REST API & Bots" },
    ],
  },
  experience: [
    {
      period: "2026",
      title: "Fullstack Web Developer",
      company: "Nivo Premium",
      description:
        "Membangun toko produk digital full-stack dengan katalog, deposit saldo QRIS, checkout, riwayat pesanan, dan panel admin. Menerapkan keamanan berlapis (hash Argon2, login Google, 2FA TOTP, Cloudflare Turnstile), audit log, rate limiting, dan worker latar belakang.",
      tags: ["Next.js", "TypeScript", "MySQL", "Tailwind CSS"],
    },
    {
      period: "2026",
      title: "Fullstack Web Developer",
      company: "SnowyStore",
      description:
        "Membangun toko server panel Pterodactyl, aplikasi premium, dan nomor virtual (OTP) dengan pembayaran QRIS otomatis. Mengerjakan dashboard member dan admin, klaim garansi, status sistem real-time, worker rekonsiliasi pembayaran, serta cadangan terenkripsi.",
      tags: ["Next.js", "Express.js", "MySQL", "Payment Gateway"],
    },
    {
      period: "2025 - 2026",
      title: "Bot Developer",
      company: "WhatsApp & Minecraft Bots",
      description:
        "Mengkustomisasi dan menstabilkan bot WhatsApp ELYRA berbasis plugin, dan membangun SnowyChat, klien web untuk mengontrol bot Minecraft secara real-time lewat Socket.IO dan Mineflayer.",
      tags: ["Node.js", "Zapo-JS", "Socket.IO", "Mineflayer", "SQLite"],
    },
    {
      period: "2025",
      title: "Backend & Web Developer",
      company: "Personal Projects",
      description:
        "Membangun Kyoto API (30+ endpoint di 6 kategori), RepoHub (dashboard pengelola repository GitHub dari browser), dan Archie (ruang arsip pribadi) sebagai bahan belajar sekaligus portofolio.",
      tags: ["Node.js", "REST API", "GitHub API", "Astro", "Supabase"],
    },
  ] satisfies Job[],
  skills: [
    {
      title: "Frontend Languages & Frameworks",
      description: "Tools yang saya gunakan untuk membangun antarmuka yang rapi, responsif, dan interaktif.",
      items: [
        { name: "React", glyph: "react" },
        { name: "Next.js", glyph: "next" },
        { name: "Tailwind CSS", glyph: "tailwind" },
        { name: "TypeScript", glyph: "typescript" },
      ],
    },
    {
      title: "Backend Core",
      description: "Fondasi API dan layanan yang saya bangun untuk aplikasi web dan bot.",
      items: [
        { name: "Node.js", glyph: "node" },
        { name: "Express.js", glyph: "express" },
        { name: "MySQL", glyph: "mysql" },
        { name: "Supabase", glyph: "supabase" },
      ],
    },
    {
      title: "Bots, Realtime & Tools",
      description: "Otomatisasi, komunikasi real-time, dan alat kerja sehari-hari.",
      items: [
        { name: "WhatsApp Bot", glyph: "bot" },
        { name: "Socket.IO", glyph: "realtime" },
        { name: "REST API", glyph: "api" },
        { name: "Git & GitHub", glyph: "git" },
      ],
    },
  ] satisfies SkillGroup[],
  projects: [
    {
      slug: "nivo-premium",
      title: "Nivo Premium",
      summary:
        "Toko produk digital full-stack dengan katalog, deposit saldo QRIS, checkout otomatis, riwayat pesanan, dan panel admin lengkap.",
      details:
        "Dibangun dengan Next.js dan TypeScript dalam satu server, MySQL, serta React Query. Keamanan berlapis: hash Argon2, login Google, 2FA TOTP, Cloudflare Turnstile, audit log, dan rate limiting. Integrasi penyedia produk memakai health tracker dan retry dengan backoff agar tetap stabil saat penyedia bermasalah.",
      stack: ["Next.js", "TypeScript", "MySQL", "Tailwind CSS", "React Query"],
      category: "web",
      thumb: "panel",
    },
    {
      slug: "snowystore",
      title: "SnowyStore",
      summary:
        "Toko server panel Pterodactyl, aplikasi premium, dan nomor virtual (OTP) dengan pembayaran QRIS otomatis serta dashboard member dan admin.",
      details:
        "Alur penuh otomatis: pelanggan bayar QRIS, pembayaran terdeteksi lewat webhook, polling, dan worker, pesanan diproses ke penyedia, lalu akun atau server dikirim. Dilengkapi klaim garansi 30 hari, status sistem real-time, notifikasi, cadangan terenkripsi otomatis, circuit breaker, dan tes otomatis.",
      stack: ["Next.js", "Express.js", "MySQL", "JWT", "Zod"],
      category: "web",
      thumb: "panel",
    },
    {
      slug: "kyoto-api",
      title: "Kyoto API",
      summary:
        "Platform REST API performa tinggi dengan 30+ endpoint di 6 kategori: AI, downloader media, tools, storage, image manipulation, hingga data manga dan anime.",
      details:
        "Respons rata-rata di bawah 100 ms dengan struktur endpoint yang dikelompokkan per kategori sehingga tetap rapi saat jumlah fiturnya bertambah. Di-deploy di Vercel.",
      stack: ["Node.js", "REST API", "Vercel"],
      category: "api",
      thumb: "api",
      live: "https://kyoto-rest-api.vercel.app/",
      repo: "https://github.com/Ikhwan-stars/kyoto-rest-api",
    },
    {
      slug: "repohub",
      title: "RepoHub",
      summary:
        "Dashboard client-side untuk mengontrol GitHub tanpa terminal: upload folder atau ZIP, jelajahi file repo, kelola issue, dan push langsung dari browser.",
      details:
        "Berjalan sepenuhnya di sisi klien dan terhubung ke GitHub API, jadi tidak perlu menginstal Git untuk melakukan operasi dasar pada repository.",
      stack: ["JavaScript", "GitHub API", "Dashboard"],
      category: "web",
      thumb: "panel",
      live: "https://repo-hub-psi.vercel.app/",
      repo: "https://github.com/Ikhwan-stars/RepoHub",
    },
  ] satisfies Project[],
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contacts" },
] as const;
