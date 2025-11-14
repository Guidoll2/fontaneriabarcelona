 "use client";
import React, { useEffect, useState, useRef } from "react";

interface ValvePositionsTableProps {
  locale: string;
}

export default function ValvePositionsTable({ locale }: ValvePositionsTableProps) {
  const title = locale === 'en' ? 'Valve position guide' : 'Guía de posiciones de válvulas';
  const subtitle = locale === 'en' 
    ? 'Reference table to configure your pool filter multiport valve.' 
    : 'Tabla orientativa para configurar la válvula selectora del filtro de su piscina.';
  const viewPdf = locale === 'en' ? 'View PDF guide' : 'Ver guía en PDF';
  const downloadPdf = locale === 'en' ? 'Download PDF' : 'Descargar PDF';

  // Data-driven table rows so we can render desktop table and mobile cards easily
  const rows = [
    { label: 'FILTRACIÓN O DEPURACIÓN', selector: 'FILTRACION', sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'CERRADA', retorno: 'ABIERTA' },
    { label: 'LIMPIEZA DE FONDOS', selector: 'FILTRACION O DESAGÜE', sumidero: 'CERRADA', skimmers: 'CERRADA', limpiafondos: 'ABIERTA', retorno: 'ABIERTA' },
    { label: 'LIMPIEZA DE FILTROS', selector: 'LAVADO', sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'INDIFERENTE', retorno: 'ABIERTA' },
    { label: 'ACLARADO DE FILTRO', selector: 'ENJUAGUE', sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'INDIFERENTE', retorno: 'ABIERTA' },
    { label: 'APERTURA DE PREFILTRO DE BOMBA', selector: 'CERRADA', sumidero: 'CERRADA', skimmers: 'CERRADA', limpiafondos: 'CERRADA', retorno: 'CERRADA' },
    { label: 'DESAGÜE POR BOMBEO', selector: 'DESAGÜE', sumidero: 'ABIERTA', skimmers: 'CERRADA', limpiafondos: 'CERRADA', retorno: 'CERRADA' },
  ];

  const StatusBadge = ({ status, label }: { status: string; label?: string }) => {
    const statusClasses = {
      ABIERTA: 'bg-green-100 text-green-800 border-green-200',
      CERRADA: 'bg-rose-100 text-rose-800 border-rose-200',
      INDIFERENTE: 'bg-gray-100 text-gray-800 border-gray-200'
    } as Record<string, string>;
    const cls = statusClasses[status] ?? 'bg-gray-100 text-gray-800 border-gray-200';
    return (
      <span
        role="status"
        aria-label={label ? `${label}: ${status}` : status}
        className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold border ${cls}`}
      >
        {status}
      </span>
    );
  };

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const announceRef = useRef<HTMLDivElement | null>(null);

  const pdfHref = process.env.NEXT_PUBLIC_VALVE_GUIDE_URL || '/docs/guia-valvulas-piscina.pdf';

  const downloadPdfFile = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(pdfHref);
      if (!res.ok) throw new Error('Network response was not OK');
      const blob = await res.blob();
      const filename = pdfHref.split('/').pop() || 'guia-valvulas-piscina.pdf';
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      // fallback: open in new tab
      console.error('Download failed', err);
      window.open(pdfHref, '_blank', 'noopener');
    }
  };

  const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Scroll to anchor if URL contains hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      let el = document.getElementById(hash);
      if (!el) {
        el = document.querySelector(`[data-anchor="${hash}"]`);
      }
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedId(hash);
        setAnnouncement(`${el.getAttribute('data-label') ?? 'Fila'} seleccionada`);
      }
    }
  }, []);

  useEffect(() => {
    if (announcement && announceRef.current) {
      // clear for next announcement
      const id = setTimeout(() => setAnnouncement(''), 4000);
      return () => clearTimeout(id);
    }
  }, [announcement]);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Glass card wrapper */}
          <div className="bg-white/40 backdrop-blur-sm border border-secondary-100/60 rounded-2xl shadow-lg p-4 md:p-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-900 mb-4 text-center">
              {title}
            </h2>
            <p className="text-sm md:text-base text-secondary-600 text-center mb-6 md:mb-8">
              {subtitle}
            </p>

            {/* Screen reader announcement region */}
            <div ref={announceRef} aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>

            {/* Desktop table: visible on md+ */}
            <div className="hidden md:block overflow-x-auto">
              <div className="min-w-full">
                <table className="w-full border-collapse border border-secondary-200 text-sm">
                  <thead>
                    <tr className="bg-secondary-900 text-white">
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-left font-semibold" rowSpan={2}>
                        Posición de:
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold" rowSpan={2}>
                        VÁLVULA SELECTORA<br />(con motor parado)
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold" colSpan={4}>
                        VÁLVULA DE ESPERA
                      </th>
                    </tr>
                    <tr className="bg-secondary-900 text-white">
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        SUMIDERO
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        SKIMMERS
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        LIMPIAFONDOS
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        RETORNO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr
                        key={i}
                        id={`valve-${slug(r.label)}`}
                        data-label={r.label}
                        className={`bg-white hover:bg-secondary-50 transition-colors ${highlightedId === `valve-${slug(r.label)}` ? 'ring-2 ring-primary-500 bg-white/70' : ''}`}
                        tabIndex={0}
                        onClick={() => {
                          const id = `valve-${slug(r.label)}`;
                          window.location.hash = id;
                          const el = document.getElementById(id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            setHighlightedId(id);
                            setAnnouncement(`${r.label} seleccionada`);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const id = `valve-${slug(r.label)}`;
                            window.location.hash = id;
                            const el = document.getElementById(id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              setHighlightedId(id);
                              setAnnouncement(`${r.label} seleccionada`);
                            }
                          }
                        }}
                      >
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 font-medium">{r.label}</td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center">{r.selector}</td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.sumidero} label={`Sumidero ${r.sumidero}`} /></td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.skimmers} label={`Skimmers ${r.skimmers}`} /></td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.limpiafondos} label={`Limpiarfondos ${r.limpiafondos}`} /></td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.retorno} label={`Retorno ${r.retorno}`} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Mobile stacked rows */}
            <div className="md:hidden mt-4 space-y-3">
              {rows.map((r, i) => (
                <div
                  key={i}
                  data-anchor={`valve-${slug(r.label)}`}
                  data-label={r.label}
                  className={`bg-white/60 backdrop-blur-sm border border-secondary-100/50 rounded-lg p-4 shadow-sm ${highlightedId === `valve-${slug(r.label)}` ? 'ring-2 ring-primary-500 bg-white/70' : ''}`}
                  tabIndex={0}
                    onClick={() => {
                    const id = `valve-${slug(r.label)}`;
                    window.location.hash = id;
                    let el = document.getElementById(id);
                    if (!el) el = document.querySelector(`[data-anchor="${id}"]`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setHighlightedId(id);
                      setAnnouncement(`${r.label} seleccionada`);
                    }
                  }}
                      onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const id = `valve-${slug(r.label)}`;
                      window.location.hash = id;
                      let el = document.getElementById(id);
                      if (!el) el = document.querySelector(`[data-anchor="${id}"]`);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setHighlightedId(id);
                        setAnnouncement(`${r.label} seleccionada`);
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-secondary-900">{r.label}</div>
                    <div className="text-xs text-secondary-600">{r.selector}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-600">Sumidero</span>
                      <StatusBadge status={r.sumidero} label={`Sumidero ${r.sumidero}`} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-600">Skimmers</span>
                      <StatusBadge status={r.skimmers} label={`Skimmers ${r.skimmers}`} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-600">Limpiarfondos</span>
                      <StatusBadge status={r.limpiafondos} label={`Limpiarfondos ${r.limpiafondos}`} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-600">Retorno</span>
                      <StatusBadge status={r.retorno} label={`Retorno ${r.retorno}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={viewPdf}
                className="inline-flex items-center justify-center px-4 md:px-6 lg:px-8 py-3 text-sm md:text-base lg:text-lg rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 active:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {viewPdf}
              </a>
              <a
                href={pdfHref}
                onClick={downloadPdfFile}
                aria-label={downloadPdf}
                className="inline-flex items-center justify-center px-4 md:px-6 lg:px-8 py-3 text-sm md:text-base lg:text-lg rounded-lg bg-secondary-900 text-white font-semibold hover:bg-secondary-800 active:bg-secondary-950 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-700 focus:ring-offset-2"
              >
                {downloadPdf}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}