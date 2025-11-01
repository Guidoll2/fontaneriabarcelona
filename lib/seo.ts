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
      siteName: 'Fontanería Low Cost',
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      images: [
        {
          url: `${siteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Fontanería Low Cost - Servicios profesionales en Barcelona',
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
    name: "Fontanería Low Cost",
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
      ? 'Professional plumbing, pools and electrical services. 24/7 emergencies in Barcelona. Fast response, fair pricing and guaranteed work.' 
      : 'Servicios profesionales de fontanería, piscinas y electricidad. Urgencias 24h en Barcelona. Respuesta rápida, precios justos y trabajo garantizado.',
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
            name: locale === 'en' ? "Plumbing Services" : "Servicios de Fontanería",
            description: locale === 'en' ? "Repairs, installation and maintenance: leaks, pipes, boilers and more" : "Reparaciones, instalación y mantenimiento: fugas, tuberías, calderas y más"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === 'en' ? "Pool Services" : "Servicios de Piscinas",
            description: locale === 'en' ? "Maintenance, filter repair, treatment and pool refurbishment" : "Mantenimiento, reparación de filtros, tratamiento y puesta a punto"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === 'en' ? "Electrical Services" : "Servicios de Electricidad",
            description: locale === 'en' ? "Installations, breakdowns, electrical panels and 24/7 emergencies" : "Instalaciones, averías, cuadros eléctricos y urgencias 24/7"
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
