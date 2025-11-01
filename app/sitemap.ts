import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LOCALES = ["es", "en", "ca"];
const PAGES = ["", "servicios/fontaneria", "servicios/piscinas", "servicios/electricidad", "contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${SITE_URL}/${locale}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );
}
