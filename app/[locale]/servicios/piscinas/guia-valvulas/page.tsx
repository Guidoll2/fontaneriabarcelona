import { getDict } from "../../../../../lib/i18n";
import ServicePageLayout from "../../../../../components/ServicePageLayout";
import ValvePositionsTable from "../../../../../components/pools/ValvePositionsTable";
import { generateMetadata as genMeta } from "../../../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const vg = dict.valveGuide ?? {} as any;

  const title = dict.valveGuide?.metaTitle || 'Valve Position Guide - Pools';
  const description = dict.valveGuide?.metaDescription || 'Reference table to configure your pool filter multiport valve.';

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

  const dict = getDict(locale);
  const vg = dict.valveGuide ?? {} as any;
  const title = dict.valveGuide?.title || (locale === 'en' ? 'Valve Position Guide' : 'Guía de Posiciones de Válvulas');
  const description = dict.valveGuide?.description || (locale === 'en' ? 'Detailed reference table to properly configure your pool filter multiport valve for different operations.' : 'Tabla de referencia detallada para configurar correctamente la válvula selectora del filtro de su piscina para diferentes operaciones.');

  // Pass translated strings to the client component
  const translations: any = {
    title: vg.title || title,
    subtitle: vg.description || description,
    printLabel: vg.printLabel || (locale === 'en' ? 'Print / Save as PDF' : 'Imprimir / Guardar como PDF')
  };
  // include headers and rows for the client component only if present
  if (vg.headers) translations.headers = vg.headers;
  if (vg.rows) translations.rows = vg.rows;

  return (
    <ServicePageLayout
      title={title}
      description={description}
      image="/filtroencobertizo.jpeg"
      features={[]} // No features for this page
      locale={locale}
    >
      <ValvePositionsTable locale={locale} translations={translations} />
    </ServicePageLayout>
  );
}