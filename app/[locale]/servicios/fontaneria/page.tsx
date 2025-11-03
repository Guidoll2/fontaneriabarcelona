import { getDict } from "../../../../lib/i18n";
import ServicePageLayout from "../../../../components/ServicePageLayout";

export default async function Plumbing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";
  const dict = getDict(locale);

  const galleryImages = [
    { src: "/griferiabaño.jpeg", alt: "Grifería de baño instalada" },
    { src: "/griferiacocina.jpeg", alt: "Grifería de cocina moderna" },
    { src: "/bachabaño.jpeg", alt: "Bacha de baño elegante" },
    { src: "/bachadoblecocina.jpeg", alt: "Bacha doble de cocina" },
    { src: "/bachaoro.jpeg", alt: "Bacha decorativa" },
    { src: "/calefon.jpeg", alt: "Calefón instalado" },
    { src: "/calefoninterno.jpeg", alt: "Calefón interno" },
    { src: "/calentadorexterno.jpeg", alt: "Calentador exterior" },
    { src: "/hinodoro.jpeg", alt: "Inodoro moderno" },
    { src: "/desaguebaño.jpeg", alt: "Sistema de desagüe" },
    { src: "/desagueroto.jpeg", alt: "Reparación de desagüe" },
    { src: "/herramientas.jpeg", alt: "Herramientas profesionales" },
  ];

  return (
    <ServicePageLayout
      title={dict.services.fontaneria.title}
      description={dict.services.fontaneria.desc}
      image="/Fontanero-2.jpeg"
      features={dict.services.fontaneria.features}
      locale={locale}
      galleryImages={galleryImages}
    />
  );
}
