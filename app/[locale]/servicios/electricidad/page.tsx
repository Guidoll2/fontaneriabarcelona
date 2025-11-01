import { getDict } from "../../../../lib/i18n";
import ServicePageLayout from "../../../../components/ServicePageLayout";

export default async function Electricity({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";
  const dict = getDict(locale);

  return (
    <ServicePageLayout
      title={dict.services.electricidad.title}
      description={dict.services.electricidad.desc}
      image="/Medidores.jpeg"
      features={dict.services.electricidad.features}
      locale={locale}
    />
  );
}
