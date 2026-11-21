export const dynamic = "force-static";

export function GET() {
  return new Response("dh=555deed81b8820817528d6f0dd64284a7dea04f2", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
