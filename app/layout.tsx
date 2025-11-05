import type { Metadata, Viewport } from "next";
import "./globals.css";
import { montserrat, poppins } from "./fonts";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    template: "%s | Fontanería Barcelona",
    default: "Fontanería Barcelona - Emergencias 24h | Calderas | Piscinas",
  },
  description: "Fontanería profesional en Barcelona y comarca. Emergencias 24h, instalación y mantenimiento de calderas, servicios de piscinas. Atención en Barcelonès, Vallès Oriental, Vallès Occidental, Baix Llobregat, Bages y Maresme.",
  applicationName: "Fontanería Barcelona",
  authors: [{ name: "Fontanería Barcelona" }],
  generator: "Next.js",
  keywords: ["fontanería barcelona", "fontanero barcelona", "emergencias 24h", "calderas barcelona", "piscinas barcelona", "barcelonès", "vallès occidental", "vallès oriental", "baix llobregat", "bages", "maresme", "fontanero urgente", "reparación calderas", "mantenimiento piscinas"],
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${montserrat.variable} ${poppins.variable}`}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="bg-white text-secondary-900 antialiased">{children}</body>
    </html>
  );
}
