import { getDict } from "../../../../lib/i18n";
import ServicePageLayout from "../../../../components/ServicePageLayout";

export default async function Plumbing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";
  const dict = getDict(locale);

  return (
    <ServicePageLayout
      title={dict.services.fontaneria.title}
      description={dict.services.fontaneria.desc}
      image="/Fontanero-2.jpeg"
      features={dict.services.fontaneria.features}
      locale={locale}
    />
  );
}
