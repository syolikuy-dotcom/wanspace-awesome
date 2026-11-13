/**
 * SATU-SATUNYA file yang perlu kamu edit untuk mengganti isi website.
 * Semua section (Hero, About, Experience, Skills, Projects, Contact)
 * dan AI Assistant membaca data dari sini.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export type Social = { label: string; href: string; icon: "instagram" | "github" | "linkedin" };
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

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  name: "Ahmad Rizki Hartawan",
  nickname: "RyHar",
  firstName: "Rizki",
  tagline: "Fullstack Web Developer",
  description:
    "Portofolio Ahmad Rizki Hartawan (RyHar) — Fullstack Web Developer yang fokus pada tampilan sederhana, cepat, dan fungsional.",
  roles: ["Fullstack Web Developer", "Next.js Enthusiast", "WhatsApp Bot Builder"],
  intro:
    "Halo! Saya suka ngoding dan bereksperimen dengan ide-ide baru. Bagi saya, setiap baris kode adalah cara untuk menghadirkan sesuatu yang bermanfaat dan keren di dunia digital.",
  avatar: "/avatar.svg",
  cv: "/cv.pdf",
  email: "ryharofficial@gmail.com",
  socials: [
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  ] satisfies Social[],
  highlights: [
    { label: "2+ Years of Experience", icon: "clock" },
    { label: "Javascript Main Language", icon: "code" },
    { label: "Fullstack developer", icon: "monitor" },
  ] satisfies Highlight[],
  stats: { years: 2, gpa: 3.84 },
  chatSuggestions: ["Kamu siapa?", "Apa saja skill-nya?", "Ada proyek apa saja?", "Bagaimana cara menghubungi?"],
  services: [
    {
      title: "Web Applications",
      description: "Dashboard, platform, dan website full-stack yang cepat, responsif, dan mudah dirawat.",
      icon: "layout",
      points: ["Next.js & React", "Dashboard admin / user", "Payment gateway"],
    },
    {
      title: "REST API & Backend",
      description: "API yang rapi dengan database, manajemen akses, dan dokumentasi yang jelas.",
      icon: "server",
      points: ["Express.js", "MySQL & MongoDB", "Dokumentasi API"],
    },
    {
      title: "WhatsApp Bots",
      description: "Bot multifungsi dengan command dinamis, integrasi API, dan otomatisasi layanan.",
      icon: "bot",
      points: ["Baileys", "Puppeteer & Canvas", "Integrasi API"],
    },
  ] satisfies Service[],
  about: {
    who: "Saya seorang web developer yang berfokus pada menciptakan tampilan dan pengalaman pengguna yang sederhana, cepat, dan fungsional.",
    approach:
      "Saya mengutamakan clean code, desain responsif, dan pengalaman pengguna yang intuitif di setiap proyek yang saya kerjakan.",
    details: [
      { label: "Name", value: "Ahmad Rizki Hartawan" },
      { label: "Place of Birth", value: "Palembang, Indonesia" },
      { label: "Phone", value: "+62 895-0818-8642" },
      { label: "GPA", value: "3.84" },
      { label: "Email", value: "ryharofficial@gmail.com" },
      { label: "Education", value: "Universitas Multi Data Palembang" },
    ],
  },
  experience: [
    {
      period: "2025",
      title: "Fullstack Web Developer",
      company: "Ryhar Panel",
      description:
        "Developed a web platform for selling hosting panels with dedicated admin and user dashboards. Implemented analytics for monitoring sales and system usage, built system settings management, and integrated a payment gateway for automated transactions.",
      tags: ["Next.js", "Node.js", "Prisma"],
    },
    {
      period: "2025",
      title: "Fullstack Web Developer",
      company: "Ryhar API",
      description:
        "Developed Ryhar API, a platform that provides developers with easy access to free APIs accompanied by comprehensive documentation. Built a responsive frontend interface and implemented a backend system to handle API requests, user access, and data management.",
      tags: ["Next.js", "Tailwind CSS", "Express.js", "MySQL", "REST API"],
    },
    {
      period: "2024 - 2025",
      title: "Bot Developer",
      company: "WhatsApp Bot Platform",
      description:
        "Built a multifunctional WhatsApp bot with various features including games, utility tools, and automated services. Implemented message processing, API integrations, and dynamic command handling to create interactive chat-based experiences.",
      tags: ["Node.js", "Baileys", "Puppeteer", "Express.js", "Canvas", "API Integration"],
    },
  ] satisfies Job[],
  skills: [
    {
      title: "Frontend Languages & Frameworks",
      description: "The tools I use to build beautiful, responsive, and interactive user interfaces.",
      items: [
        { name: "React", glyph: "react" },
        { name: "Next.js", glyph: "next" },
        { name: "Tailwind CSS", glyph: "tailwind" },
        { name: "TypeScript", glyph: "typescript" },
      ],
    },
    {
      title: "Backend Core",
      description: "The foundations of the APIs and services I build for web apps and bots.",
      items: [
        { name: "Node.js", glyph: "node" },
        { name: "Express.js", glyph: "express" },
        { name: "MySQL", glyph: "mysql" },
        { name: "MongoDB", glyph: "mongodb" },
      ],
    },
  ] satisfies SkillGroup[],
  projects: [
    {
      slug: "ryhar-panel",
      title: "Ryhar Panel",
      summary:
        "Platform web untuk menjual panel hosting dengan sistem dashboard terpisah untuk admin dan user serta integrasi payment gateway.",
      details:
        "Dashboard admin untuk memantau penjualan, penggunaan sistem, dan pengaturan layanan. Dashboard user untuk membeli dan mengelola panel. Pembayaran otomatis lewat payment gateway.",
      stack: ["Next.js", "Node.js", "Prisma", "MySQL"],
      category: "web",
      thumb: "panel",
    },
    {
      slug: "ryhar-api",
      title: "Ryhar API",
      summary:
        "Platform Rest API yang menyediakan berbagai endpoint gratis dan mudah digunakan untuk developer, lengkap dengan dokumentasi API yang jelas.",
      details:
        "Kumpulan endpoint gratis dengan dokumentasi interaktif, manajemen akses user, dan pencatatan penggunaan API.",
      stack: ["Next.js", "Tailwind CSS", "Express.js", "MySQL", "REST API"],
      category: "api",
      thumb: "api",
    },
    {
      slug: "elaina-bot",
      title: "Elaina Bot (WhatsApp)",
      summary:
        "Multifunctional WhatsApp bot with games, tools, and automation features designed to enhance user interaction directly within WhatsApp.",
      details:
        "Bot WhatsApp dengan sistem command dinamis, game, tools harian, integrasi berbagai API, dan pembuatan gambar menggunakan Canvas.",
      stack: ["Node.js", "Baileys", "Puppeteer", "Canvas"],
      category: "bot",
      thumb: "bot",
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
