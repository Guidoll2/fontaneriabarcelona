import { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CheckCircle, XCircle, Shield, Award, Clock, Euro } from "lucide-react";
import { getDict } from "../../../lib/i18n";

// Dynamic import for non-critical component
const LeadFormClorador = dynamic(() => import("../../../components/LeadFormClorador"), {
  loading: () => <div className="h-96 bg-slate-50 animate-pulse rounded-2xl" />,
});

type Params = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.cloradorSalino;

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: locale === "en"
      ? "salt chlorinator Barcelona, salt chlorination, pool chlorinator installation, salt electrolysis Barcelona, chlorine-free pool"
      : "clorador salino Barcelona, cloración salina, instalación clorador piscina, electrólisis salina Barcelona, piscina sin cloro",
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/instalacion-clorador-salino`,
    },
  };
}

export default async function CloradorSalinoPage({ params }: Params) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.cloradorSalino;

  // JSON-LD Schema para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Instalación de Clorador Salino",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Fontanería Low Cost",
      "image": "https://www.fontanerialowcost.com/logo.png",
      "telephone": "+34-XXX-XXX-XXX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barcelona",
        "addressRegion": "Cataluña",
        "addressCountry": "ES"
      },
      "areaServed": {
        "@type": "City",
        "name": "Barcelona"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "1800",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
      "description": "Instalación completa de clorador salino incluyendo equipo, mano de obra y puesta en marcha"
    },
    "description": "Instalación profesional de sistemas de cloración salina para piscinas en Barcelona. Incluye equipo de primera marca, instalación, puesta en marcha y sal inicial.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky Header with CTA - Glass Style */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm md:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-slate-800 font-semibold text-sm">{locale === "en" ? "Salt Chlorinator" : "Clorador Salino"}</span>
          <a
            href="tel:+34677133242"
            className="bg-slate-900 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-slate-800 transition-all"
          >
            {locale === "en" ? "Call now" : "Llamar ahora"}
          </a>
        </div>
      </div>

      {/* Hero Section - Premium Apple-like Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-200/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-200/30 to-transparent rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-slate-900">
              {t.hero.title1}
              <br />
              <span className="bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                {t.hero.title2}
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              {t.hero.subtitle}
              <span className="text-slate-800 font-medium"> {t.hero.savings}</span> {t.hero.savingsText}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a
                href="#formulario"
                className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-medium text-lg shadow-xl shadow-slate-900/20 transition-all hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-0.5"
              >
                {t.hero.cta}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="tel:+34677133242"
                className="flex items-center gap-3 text-slate-700 hover:text-slate-900 px-6 py-4 rounded-full font-medium text-lg transition-colors bg-white/50 backdrop-blur-sm border border-slate-200 hover:border-slate-300 hover:bg-white/80"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {t.hero.phone}
              </a>
            </div>

            {/* Trust indicators - Glass Cards */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-800">{t.hero.trust.warranty}</div>
                  <div className="text-xs text-slate-500">{t.hero.trust.warrantyLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-800">{t.hero.trust.install}</div>
                  <div className="text-xs text-slate-500">{t.hero.trust.installLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-800">{t.hero.trust.count}</div>
                  <div className="text-xs text-slate-500">{t.hero.trust.countLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Comparativa Section - Premium Glass Design */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
                {t.comparison.title}
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                {t.comparison.subtitle}
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Cloro Card - Negative */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl blur-xl transition-all group-hover:blur-2xl" />
                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{t.comparison.chlorine.title}</h3>
                      <p className="text-sm text-slate-500">{t.comparison.chlorine.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">{t.comparison.labels.annualCost}</span>
                      <span className="text-2xl font-bold text-red-600">{t.comparison.chlorine.cost}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">{t.comparison.labels.maintenance}</span>
                      <span className="font-medium text-slate-800">{t.comparison.chlorine.maintenance}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">{t.comparison.labels.irritation}</span>
                      <span className="font-medium text-slate-800">{t.comparison.chlorine.irritation}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-slate-600">{t.comparison.labels.smell}</span>
                      <span className="font-medium text-slate-800">{t.comparison.chlorine.smell}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clorador Salino Card - Positive */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl transition-all group-hover:blur-2xl" />
                <div className="relative bg-white/80 backdrop-blur-sm border-2 border-cyan-200 rounded-3xl p-8 h-full shadow-xl shadow-cyan-500/10">
                  {/* Recommended badge */}
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-xs font-bold rounded-full shadow-lg">
                    {t.comparison.saltwater.recommended}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{t.comparison.saltwater.title}</h3>
                      <p className="text-sm text-slate-500">{t.comparison.saltwater.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-cyan-100">
                      <span className="text-slate-600">{t.comparison.labels.annualCost}</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-cyan-600">{t.comparison.saltwater.cost}</span>
                        <span className="block text-xs text-emerald-600 font-medium">{t.comparison.saltwater.savings}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-cyan-100">
                      <span className="text-slate-600">{t.comparison.labels.maintenance}</span>
                      <span className="font-semibold text-cyan-700">{t.comparison.saltwater.maintenance}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-cyan-100">
                      <span className="text-slate-600">{t.comparison.labels.irritation}</span>
                      <span className="font-semibold text-cyan-700">{t.comparison.saltwater.irritation}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-slate-600">{t.comparison.labels.smell}</span>
                      <span className="font-semibold text-cyan-700">{t.comparison.saltwater.smell}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom ROI Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl" />
              <div className="relative bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.15),transparent_50%)] rounded-2xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-slate-400 text-sm mb-1">{t.comparison.roi.investment}</p>
                    <p className="text-4xl font-bold text-white">1.800€</p>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-slate-700" />
                  <div className="text-center md:text-left">
                    <p className="text-slate-400 text-sm mb-1">{t.comparison.roi.annualSavings}</p>
                    <p className="text-4xl font-bold text-cyan-400">360€</p>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-slate-700" />
                  <div className="text-center md:text-left">
                    <p className="text-slate-400 text-sm mb-1">{t.comparison.roi.payback}</p>
                    <p className="text-4xl font-bold text-white">&lt;5 {locale === "en" ? "years" : "años"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Reales - Before/After Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="text-sm font-medium text-emerald-700">{t.results.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
                {t.results.title}
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                {t.results.subtitle}
              </p>
            </div>

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Before */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-lg opacity-60" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/Piscina-antes.jpeg"
                    alt={locale === "en" ? "Pool with green water before treatment - algae problem due to poor chlorine maintenance" : "Piscina con agua verde antes del tratamiento - problema de algas por mal mantenimiento del cloro"}
                    width={600}
                    height={450}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/90 backdrop-blur-sm mb-2">
                      <XCircle className="w-4 h-4 text-white" />
                      <span className="text-sm font-semibold text-white">{t.results.before}</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      {t.results.beforeDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/30 to-sky-500/30 rounded-3xl blur-lg opacity-80" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/Piscina-despues.jpeg"
                    alt={locale === "en" ? "Pool with crystal clear water after salt chlorinator installation - perfectly treated water" : "Piscina con agua cristalina después de instalar clorador salino - agua perfectamente tratada"}
                    width={600}
                    height={450}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/90 backdrop-blur-sm mb-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span className="text-sm font-semibold text-white">{t.results.after}</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      {t.results.afterDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery of completed pools */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative overflow-hidden rounded-2xl group">
                <Image
                  src="/piscinalista.jpeg"
                  alt={locale === "en" ? "Pool with crystal clear water in Barcelona - salt chlorinator installation completed" : "Piscina con agua cristalina en Barcelona - instalación de clorador salino completada"}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative overflow-hidden rounded-2xl group">
                <Image
                  src="/piscinapasto.jpeg"
                  alt={locale === "en" ? "Residential pool with garden in Barcelona metropolitan area" : "Piscina residencial con jardín en área metropolitana de Barcelona"}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative overflow-hidden rounded-2xl group col-span-2 md:col-span-1">
                <Image
                  src="/piscinaslista3.jpeg"
                  alt={locale === "en" ? "Pool with salt chlorination system installed - perfect water without chemicals" : "Piscina con sistema de cloración salina instalado - agua perfecta sin químicos"}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autoridad y Confianza - Premium Design */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
                {t.authority.title}
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                {t.authority.subtitle}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/5 rounded-2xl blur-xl transition-all group-hover:from-cyan-500/20" />
                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 h-full transition-all group-hover:shadow-xl group-hover:shadow-cyan-500/10 group-hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/30">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{t.authority.features.certified.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.authority.features.certified.desc}
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/5 rounded-2xl blur-xl transition-all group-hover:from-cyan-500/20" />
                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 h-full transition-all group-hover:shadow-xl group-hover:shadow-cyan-500/10 group-hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/30">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{t.authority.features.experience.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.authority.features.experience.desc}
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/5 rounded-2xl blur-xl transition-all group-hover:from-cyan-500/20" />
                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 h-full transition-all group-hover:shadow-xl group-hover:shadow-cyan-500/10 group-hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{t.authority.features.response.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.authority.features.response.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial - Premium Glass Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-sky-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 md:p-10 shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Quote icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed font-light">
                      {t.authority.testimonial.quote}
                      <span className="font-medium text-slate-900"> {t.authority.testimonial.highlight}</span>
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <span className="text-lg font-bold text-slate-600">JM</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{t.authority.testimonial.author}</p>
                        <p className="text-sm text-slate-500">{t.authority.testimonial.location}</p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precio y Oferta - Premium Glass Design */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-sm font-medium text-cyan-300">{t.pricing.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-200">
                {t.pricing.title}
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                {t.pricing.subtitle}
              </p>
            </div>

            {/* Pricing Card */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-3xl blur-lg opacity-30" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
                {/* Price */}
                <div className="text-center mb-10">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {t.pricing.price}
                    </span>
                    <span className="text-2xl font-medium text-slate-400">€</span>
                  </div>
                  <p className="text-slate-400 mt-2">{t.pricing.poolSize}</p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{t.pricing.features.equipment.title}</p>
                      <p className="text-xs text-slate-400">{t.pricing.features.equipment.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{t.pricing.features.installation.title}</p>
                      <p className="text-xs text-slate-400">{t.pricing.features.installation.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{t.pricing.features.config.title}</p>
                      <p className="text-xs text-slate-400">{t.pricing.features.config.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{t.pricing.features.salt.title}</p>
                      <p className="text-xs text-slate-400">{t.pricing.features.salt.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 md:col-span-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{t.pricing.features.warranty.title}</p>
                      <p className="text-xs text-slate-400">{t.pricing.features.warranty.desc}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#formulario"
                  className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-cyan-500/25 transition-all hover:shadow-2xl hover:shadow-cyan-500/30"
                >
                  {t.pricing.cta}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>

                <p className="text-center mt-4 text-xs text-slate-500">
                  {t.pricing.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Captación - Premium Design */}
      <section id="formulario" className="py-24 bg-gradient-to-b from-white to-slate-50 scroll-mt-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-sm font-medium text-cyan-700">{t.form.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
                {t.form.title}
              </h2>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                {t.form.subtitle}
              </p>
            </div>

            <LeadFormClorador locale={locale} />
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium Design */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-slate-100/50 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
                {t.faq.title}
              </h2>
              <p className="text-lg text-slate-500">
                {t.faq.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {t.faq.questions.map((faq: { q: string; a: string }, index: number) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between gap-4 p-6 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer transition-colors">
                    <span className="font-semibold text-lg text-slate-900">{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-200 group-open:bg-cyan-500 flex items-center justify-center transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 text-slate-600 group-open:text-white group-open:rotate-180 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-4">
                    <p
                      className="text-slate-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.a }}
                    />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Premium Design */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-slate-200 font-bold mb-4 tracking-tight">
              {t.finalCta.title1}
              <span className="block mt-1 bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                {t.finalCta.title2}
              </span>
            </h2>
            <p className="text-lg mb-10 text-slate-400 max-w-xl mx-auto">
              {t.finalCta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#formulario"
                className="group bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl shadow-cyan-500/25 transition-all hover:shadow-2xl hover:shadow-cyan-500/30"
              >
                {t.finalCta.cta}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="tel:+34677133242"
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors border border-white/10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                677 133 242
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
