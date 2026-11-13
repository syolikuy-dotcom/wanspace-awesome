import { site } from "@/data/site";

export function buildSystemPrompt(): string {
  const jobs = site.experience
    .map((j) => `- ${j.title} @ ${j.company} (${j.period}): ${j.description} Stack: ${j.tags.join(", ")}`)
    .join("\n");
  const projects = site.projects
    .map((p) => `- ${p.title}: ${p.summary} Stack: ${p.stack.join(", ")}`)
    .join("\n");
  const skills = site.skills
    .map((g) => `- ${g.title}: ${g.items.map((i) => i.name).join(", ")}`)
    .join("\n");

  return [
    `Kamu adalah "${site.nickname} Assistant", asisten AI di website portofolio ${site.name} (${site.tagline}).`,
    "Jawab singkat (maksimal 4 kalimat), ramah, dan dalam bahasa yang dipakai pengunjung (default Bahasa Indonesia).",
    "Hanya jawab berdasarkan data di bawah. Kalau tidak ada di data, bilang tidak tahu dan arahkan pengunjung memakai form kontak.",
    "Jangan mengarang fakta, harga, atau ketersediaan kerja.",
    "",
    `Nama lengkap: ${site.name}`,
    `Intro: ${site.intro}`,
    `Tentang: ${site.about.who} ${site.about.approach}`,
    ...site.about.details.map((d) => `${d.label}: ${d.value}`),
    "",
    "Pengalaman:",
    jobs,
    "",
    "Skill:",
    skills,
    "",
    "Project:",
    projects,
  ].join("\n");
}

/** Jawaban dasar kalau API key belum diisi / API sedang gagal. */
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  if (has("siapa", "who are", "kamu apa", "tentang")) {
    return `Saya ${site.nickname} Assistant, asisten AI pribadi untuk ${site.name}, seorang ${site.tagline}. Saya siap membantu Anda dengan informasi tentang portofolio, pengalaman, dan proyek yang ia kerjakan.`;
  }
  if (has("skill", "tech", "stack", "bahasa", "tools", "keahlian")) {
    return site.skills.map((g) => `${g.title}: ${g.items.map((i) => i.name).join(", ")}.`).join(" ");
  }
  if (has("project", "proyek", "karya", "portofolio", "portfolio")) {
    return `Beberapa proyek ${site.nickname}: ${site.projects.map((p) => p.title).join(", ")}. Detailnya ada di section Projects.`;
  }
  if (has("pengalaman", "experience", "kerja", "career")) {
    return site.experience.map((j) => `${j.period}: ${j.title} di ${j.company}.`).join(" ");
  }
  if (has("kontak", "contact", "email", "hubungi", "wa", "telepon", "phone")) {
    return `Anda bisa menghubungi ${site.nickname} lewat email ${site.email} atau form di section Contacts.`;
  }
  if (has("cv", "resume")) {
    return "Anda bisa mengunduh CV lewat tombol Download CV di bagian atas halaman.";
  }
  return `Saya bisa bantu menjawab soal pengalaman, skill, dan proyek ${site.nickname}. Coba tanya, misalnya: "Apa saja skill-nya?" atau "Ada proyek apa saja?"`;
}
