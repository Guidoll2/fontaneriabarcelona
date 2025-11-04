import type { Metadata, Viewport } from "next";
import "./globals.css";
import { montserrat, poppins } from "./fonts";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    template: "%s | Fontanería Terrassa",
    default: "Fontanería Terrassa - Servicios 24h | Piscinas",
  },
  description: "Fontanería profesional en Terrassa y comarca. Servicios de fontanería y mantenimiento de piscinas. Urgencias 24h en Vallès Occidental, Barcelona y comarca.",
  applicationName: "Fontanería Terrassa",
  authors: [{ name: "Fontanería Terrassa" }],
  generator: "Next.js",
  keywords: ["fontanería", "fontanero terrassa", "piscinas", "mantenimiento piscinas", "vallès occidental", "barcelona", "24h", "urgencias", "sabadell", "rubí", "calefones", "grifería"],
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
