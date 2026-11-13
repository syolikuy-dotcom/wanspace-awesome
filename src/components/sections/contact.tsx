"use client";

import { useState } from "react";
import { Check, Copy, Loader2, Mail } from "lucide-react";
import { site } from "@/data/site";
import { socialIcons } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useToast } from "@/components/toast";

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string };

const field =
  "mt-2 w-full rounded-xl border border-line bg-soft/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-foreground focus:bg-card";

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [length, setLength] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast("Email disalin ke clipboard.", "success");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast(`Email: ${site.email}`, "info");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Pesan gagal dikirim.");
      form.reset();
      setLength(0);
      const message = "Pesan terkirim. Terima kasih, saya akan segera membalas!";
      setStatus({ state: "success", message });
      toast(message, "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setStatus({ state: "error", message });
      toast(message, "error");
    }
  }

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contacts"
        description="Punya proyek atau ide? Kirim pesan, saya biasanya membalas dalam 1–2 hari."
      />

      <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
        <Reveal className="min-w-0">
          <h3 className="text-2xl font-semibold tracking-tight">Let&apos;s work together</h3>
          <div className="mt-6 flex max-w-full items-stretch gap-2">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-w-0 items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 text-sm font-medium shadow-soft transition-colors hover:border-foreground/40"
            >
              <Mail size={16} className="shrink-0" />
              <span className="min-w-0 break-all">{site.email}</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Salin email"
              className="grid w-11 shrink-0 place-items-center rounded-xl border border-line bg-card shadow-soft transition-colors hover:border-foreground/40"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
          </div>
          <ul className="mt-6 flex gap-3">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-xl border border-line bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:border-foreground/40"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-foreground/80 bg-card p-6 shadow-soft sm:p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight">Send an Email directly.</h3>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="label">Name</span>
                <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="John Doe" className={field} />
              </label>
              <label className="block">
                <span className="label">Email</span>
                <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="johndoe@example.com" className={field} />
              </label>
              <label className="block">
                <span className="label">Message</span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  placeholder="Your message here..."
                  onChange={(e) => setLength(e.target.value.length)}
                  className={`${field} resize-none`}
                />
                <span className="mt-1.5 block text-right text-[10px] text-muted">{length} / 3000</span>
              </label>

              {/* honeypot anti-spam: disembunyikan dari user */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={status.state === "sending"}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-fg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.state === "sending" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`mt-4 min-h-5 text-center text-xs ${
                status.state === "error" ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {status.message}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
