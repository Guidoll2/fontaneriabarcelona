import type { Metadata, Viewport } from "next";
import "./globals.css";
import { montserrat, poppins } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    template: "%s | Fontanería Low Cost",
    default: "Fontanería Low Cost - Servicios 24h en Barcelona",
  },
  description: "Fontanería Low Cost — Servicios profesionales de fontanería, piscinas y electricidad en la provincia de Barcelona. Urgencias 24h.",
  applicationName: "Fontanería Low Cost",
  authors: [{ name: "Fontanería Low Cost" }],
  generator: "Next.js",
  keywords: ["fontanería", "fontanero", "plomero", "electricista", "piscinas", "barcelona", "24h", "urgencias"],
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
      <body className="bg-white text-secondary-900 antialiased">{children}</body>
    </html>
  );
}
