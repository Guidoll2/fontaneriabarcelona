import { getDict } from "../../../../lib/i18n";
import ServicePageLayout from "../../../../components/ServicePageLayout";

export default async function Pools({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";
  const dict = getDict(locale);

  return (
    <ServicePageLayout
      title={dict.services.piscinas.title}
      description={dict.services.piscinas.desc}
      image="/Fontanero-piscina.jpeg"
      features={dict.services.piscinas.features}
      locale={locale}
    />
  );
}
