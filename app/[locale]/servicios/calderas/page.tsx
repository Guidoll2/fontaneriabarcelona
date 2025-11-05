import { getDict } from "../../../../lib/i18n";
import ServicePageLayout from "../../../../components/ServicePageLayout";
import { generateMetadata as genMeta } from "../../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale);
  
  return genMeta({
    title: dict.services.calderas.title,
    description: dict.services.calderas.desc,
    path: '/servicios/calderas',
    locale
  });
}

export default async function Calderas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";
  const dict = getDict(locale);

  const galleryImages = [
    { src: "/calentadorexterno.jpeg", alt: "Instalación de caldera" },
    { src: "/calderamodificada.png", alt: "Mantenimiento de caldera" },
    { src: "/calefon.jpeg", alt: "Reparación de caldera" },
    { src: "/termotanque.jpeg", alt: "Caldera reparada" },
    { src: "/termoexterior2.jpeg", alt: "Sistema de calefacción" },
    { src: "/calderaabierta.jpeg", alt: "Caldera nueva instalada" },
  ];

  return (
    <ServicePageLayout
      title={dict.services.calderas.title}
      description={dict.services.calderas.desc}
      image="/caldera.png"
      features={dict.services.calderas.features}
      locale={locale}
      galleryImages={galleryImages}
    />
  );
}
