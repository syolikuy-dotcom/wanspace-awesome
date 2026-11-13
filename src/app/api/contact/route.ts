import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  if (!rateLimit(`contact:${getIp(req)}`, 5, 10 * 60_000)) {
    return fail("Terlalu banyak percobaan. Coba lagi beberapa menit lagi.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Format permintaan tidak valid.", 400);
  }

  // Honeypot: bot biasanya mengisi semua field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").replace(/[\r\n]+/g, " ").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || name.length > 80) return fail("Nama harus 2–80 karakter.", 400);
  if (!EMAIL_RE.test(email) || email.length > 120) return fail("Format email tidak valid.", 400);
  if (message.length < 10 || message.length > 3000) return fail("Pesan harus 10–3000 karakter.", 400);

  const { SMTP_HOST = "smtp.gmail.com", SMTP_PORT = "465", SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    return fail("Layanan email belum dikonfigurasi di server.", 503);
  }

  try {
    const port = Number(SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Pesan baru dari ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] gagal kirim email:", err);
    return fail("Pesan gagal dikirim. Silakan coba lagi nanti.", 502);
  }
}
