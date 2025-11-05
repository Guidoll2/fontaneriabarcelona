export interface MetadataProps {
  title: string;
  description: string;
  path?: string;
  locale?: string;
}

export function generateMetadata({ title, description, path = '', locale = 'es' }: MetadataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}/${locale}${path}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Fontanería Profesional Barcelona',
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      images: [
        {
          url: `${siteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Fontanería Profesional - Emergencias 24h en Barcelona',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: url,
      languages: {
        'es': `${siteUrl}/es${path}`,
        'en': `${siteUrl}/en${path}`,
      },
    },
  };
}

export function localBusinessJsonLd({ locale = 'es', path = '' } = {}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}/${locale}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteUrl,
    name: "Fontanería Profesional Barcelona",
    telephone: "+34 677 133 242",
    email: "fontanerialowcost24@gmail.com",
    url: url,
    logo: `${siteUrl}/images/ImagenLogo.jpeg`,
    image: `${siteUrl}/images/HeroFondoLight.jpeg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressRegion: "Catalunya",
      addressCountry: "ES",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 41.3851,
        longitude: 2.1734
      },
      geoRadius: "50000"
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "€€",
    description: locale === 'en' 
      ? 'Professional plumbing, boiler and pool services. 24/7 emergencies in Barcelona, Barcelonès, Vallès Occidental, Vallès Oriental, Baix Llobregat, Bages and Maresme. Fast response and guaranteed work.' 
      : 'Servicios profesionales de fontanería, calderas y piscinas. Emergencias 24h en Barcelona, Barcelonès, Vallès Occidental, Vallès Oriental, Baix Llobregat, Bages y Maresme. Respuesta rápida y trabajo garantizado.',
    sameAs: [
      "https://wa.me/34677133242",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === 'en' ? "Our Services" : "Nuestros Servicios",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === 'en' ? "Emergency Plumbing 24/7" : "Fontanería de Emergencias 24/7",
            description: locale === 'en' ? "Repairs, installation and maintenance: faucets, sinks, water heaters, toilets, drains and more. Available 24/7 for emergencies in Barcelona and surrounding areas" : "Reparaciones, instalación y mantenimiento: grifería, bachas, calefones, inodoros, desagües y más. Urgencias 24/7 en Barcelona y alrededores"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === 'en' ? "Pool Maintenance and Repair" : "Mantenimiento y Reparación de Piscinas",
            description: locale === 'en' ? "Filter equipment repair and upgrade, pipe repair, skimmer fixes, and complete pool maintenance in Barcelona and surrounding areas" : "Reparación y actualización de equipos de filtrado, reparación de cañerías, arreglo de skimmers y mantenimiento completo en Barcelona y alrededores"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === 'en' ? "Boiler Installation and Maintenance" : "Instalación y Mantenimiento de Calderas",
            description: locale === 'en' ? "Installation, repair and annual maintenance of gas and electric boilers. Energy optimization and safety certifications" : "Instalación, reparación y mantenimiento anual de calderas de gas y eléctricas. Optimización energética y certificaciones de seguridad"
          }
        }
      ]
    }
  };
}

interface BreadcrumbItem {
  path: string;
  name: string;
}

export function breadcrumbJsonLd({ items, locale = 'es' }: { items: BreadcrumbItem[]; locale?: string } = { items: [] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": `${siteUrl}/${locale}${item.path}`,
        "name": item.name
      }
    }))
  };
}
