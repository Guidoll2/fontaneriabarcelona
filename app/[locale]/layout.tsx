import "../../app/globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const dynamic = "force-static";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam || "es";
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-[60vh]">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
