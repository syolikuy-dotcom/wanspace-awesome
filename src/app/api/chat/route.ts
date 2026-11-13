import { NextResponse } from "next/server";
import { buildSystemPrompt, localAnswer } from "@/lib/knowledge";
import { getIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): Msg[] | null {
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 20) return null;

  const out: Msg[] = [];
  for (const m of raw) {
    const { role, content } = (m ?? {}) as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, 800);
    if (text) out.push({ role, content: text });
  }
  while (out.length > 0 && out[0].role !== "user") out.shift();
  if (out.length === 0 || out[out.length - 1].role !== "user") return null;
  return out;
}

export async function POST(req: Request) {
  if (!rateLimit(`chat:${getIp(req)}`, 20, 60_000)) {
    return NextResponse.json({ reply: "Terlalu banyak pesan. Tunggu sebentar ya." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) return NextResponse.json({ error: "Pesan tidak valid." }, { status: 400 });

  const lastQuestion = messages[messages.length - 1].content;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ reply: localAnswer(lastQuestion) });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
        max_tokens: 400,
        system: buildSystemPrompt(),
        messages,
      }),
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`Anthropic API ${res.status}`);

    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const reply = (data.content ?? [])
      .filter((b) => b.type === "text" && b.text)
      .map((b) => b.text)
      .join("")
      .trim();

    return NextResponse.json({ reply: reply || localAnswer(lastQuestion) });
  } catch (err) {
    console.error("[chat] fallback ke jawaban lokal:", err);
    return NextResponse.json({ reply: localAnswer(lastQuestion) });
  } finally {
    clearTimeout(timer);
  }
}
