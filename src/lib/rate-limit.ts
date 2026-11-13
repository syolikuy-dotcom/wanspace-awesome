const buckets = new Map<string, number[]>();

/**
 * Rate limit sederhana in-memory (per instance serverless).
 * Cukup untuk mencegah spam ringan; pakai Upstash/Vercel KV kalau butuh yang ketat.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 5000) {
    buckets.forEach((v, k) => {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    });
  }
  return true;
}

export function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
