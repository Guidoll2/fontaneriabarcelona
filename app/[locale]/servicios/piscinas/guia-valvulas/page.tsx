import { getDict } from "../../../../../lib/i18n";
import ServicePageLayout from "../../../../../components/ServicePageLayout";
import ValvePositionsTable from "../../../../../components/pools/ValvePositionsTable";
import { generateMetadata as genMeta } from "../../../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale);
  
  const title = locale === 'en' ? 'Valve Position Guide - Pools' : 'Guía de Posiciones de Válvulas - Piscinas';
  const description = locale === 'en' 
    ? 'Reference table to configure your pool filter multiport valve.' 
    : 'Tabla orientativa para configurar la válvula selectora del filtro de su piscina.';
  
  return genMeta({
    title,
    description,
    path: '/servicios/piscinas/guia-valvulas',
    locale
  });
}

export default async function ValveGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";

  const title = locale === 'en' ? 'Valve Position Guide' : 'Guía de Posiciones de Válvulas';
  const description = locale === 'en' 
    ? 'Detailed reference table to properly configure your pool filter multiport valve for different operations.' 
    : 'Tabla de referencia detallada para configurar correctamente la válvula selectora del filtro de su piscina para diferentes operaciones.';

  return (
    <ServicePageLayout
      title={title}
      description={description}
      image="/filtroencobertizo.jpeg"
      features={[]} // No features for this page
      locale={locale}
    >
      <ValvePositionsTable locale={locale} />
    </ServicePageLayout>
  );
}