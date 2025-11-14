import { getDict } from "../../../../lib/i18n";
import ServicePageLayout from "../../../../components/ServicePageLayout";
import { generateMetadata as genMeta } from "../../../../lib/seo";
import ValveGuideCTA from "../../../../components/ValveGuideCTA";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale);
  
  return genMeta({
    title: dict.services.piscinas.title,
    description: dict.services.piscinas.desc,
    path: '/servicios/piscinas',
    locale
  });
}

export default async function Pools({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";
  const dict = getDict(locale);

  const galleryaImages = [
    { src: "/piscinalista.jpeg", alt: "Piscina lista para usar" },
    { src: "/piscinaslista2.jpeg", alt: "Piscina terminada vista 2" },
    { src: "/piscinaslista3.jpeg", alt: "Piscina terminada vista 3" },
    { src: "/piscinapasto.jpeg", alt: "Piscina con césped" },
    { src: "/piscinacubierta.jpeg", alt: "Piscina cubierta" },
    { src: "/piscinareparada.jpeg", alt: "Piscina reparada" },
    { src: "/reparacionpiscina.jpeg", alt: "Reparación en proceso" },
    { src: "/reparacionpiscina2.jpeg", alt: "Reparación de piscina 2" },
    { src: "/reparacionpiscina3.jpeg", alt: "Reparación de piscina 3" },
    { src: "/reparacionpiscina4.jpeg", alt: "Reparación de piscina 4" },
    { src: "/filtronuevo.jpeg", alt: "Filtro nuevo instalado" },
    { src: "/filtroencobertizo.jpeg", alt: "Sistema de filtro" },
  ];

  return (
    <>
      <ServicePageLayout
        title={dict.services.piscinas.title}
        description={dict.services.piscinas.desc}
        image="/filtroencobertizo.jpeg"
        features={dict.services.piscinas.features}
        locale={locale}
        galleryImages={galleryaImages}
      />

      <ValveGuideCTA locale={locale} />
    </>
  );
}
