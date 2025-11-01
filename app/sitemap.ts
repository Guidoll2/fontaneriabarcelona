const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LOCALES = ["es", "en", "ca"];
const PAGES = ["", "servicios/fontaneria", "servicios/piscinas", "servicios/electricidad", "contacto"];

export async function GET() {
  const urls = LOCALES.flatMap((locale) =>
    PAGES.map((p) => {
      const path = `${SITE_URL}/${locale}${p ? `/${p}` : ""}`;
      return `<url><loc>${path}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    })
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
