 "use client";
import React, { useEffect, useState, useRef } from "react";

interface ValvePositionsTableProps {
  locale: string;
  translations?: {
    title?: string;
    subtitle?: string;
    printLabel?: string;
    headers?: any;
    rows?: Array<any>;
  };
}

export default function ValvePositionsTable({ locale, translations }: ValvePositionsTableProps) {
  const title = translations?.title ?? (locale === 'en' ? 'Valve position guide' : 'Guía de posiciones de válvulas');
  const subtitle = translations?.subtitle ?? (locale === 'en' 
    ? 'Reference table to configure your pool filter multiport valve.' 
    : 'Tabla orientativa para configurar la válvula selectora del filtro de su piscina.');
  const printLabel = translations?.printLabel ?? (locale === 'en' ? 'Print / Save as PDF' : 'Imprimir / Guardar como PDF');
  // (printLabel now comes from translations prop)

  // Use translated rows if provided, otherwise fallback to built-in Spanish rows
  const headers = translations?.headers ?? {
    positionOf: 'Posición de:',
    selectorHeader: 'VÁLVULA SELECTORA\n(con motor parado)',
    valveWaitingHeader: 'VÁLVULA DE ESPERA',
    sumidero: 'SUMIDERO',
    skimmers: 'SKIMMERS',
    limpiafondos: 'LIMPIAFONDOS',
    retorno: 'RETORNO'
  };

  // Default status values for each row (so badges keep colors/text even when translations only provide label/selector)
  const defaultStatusRows = [
    { sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'CERRADA', retorno: 'ABIERTA' },
    { sumidero: 'CERRADA', skimmers: 'CERRADA', limpiafondos: 'ABIERTA', retorno: 'ABIERTA' },
    { sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'INDIFERENTE', retorno: 'ABIERTA' },
    { sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'INDIFERENTE', retorno: 'ABIERTA' },
    { sumidero: 'CERRADA', skimmers: 'CERRADA', limpiafondos: 'CERRADA', retorno: 'CERRADA' },
    { sumidero: 'ABIERTA', skimmers: 'CERRADA', limpiafondos: 'CERRADA', retorno: 'CERRADA' }
  ];

  const tableRows: Array<{ label: string; selector: string; sumidero?: string; skimmers?: string; limpiafondos?: string; retorno?: string }> = (translations?.rows && Array.isArray(translations.rows))
    ? translations.rows.map((r: any, i: number) => ({
        label: r.label,
        selector: r.selector,
        sumidero: r.sumidero ?? defaultStatusRows[i]?.sumidero,
        skimmers: r.skimmers ?? defaultStatusRows[i]?.skimmers,
        limpiafondos: r.limpiafondos ?? defaultStatusRows[i]?.limpiafondos,
        retorno: r.retorno ?? defaultStatusRows[i]?.retorno,
      }))
    : [
        { label: 'FILTRACIÓN O DEPURACIÓN', selector: 'FILTRACION', sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'CERRADA', retorno: 'ABIERTA' },
        { label: 'LIMPIEZA DE FONDOS', selector: 'FILTRACION O DESAGÜE', sumidero: 'CERRADA', skimmers: 'CERRADA', limpiafondos: 'ABIERTA', retorno: 'ABIERTA' },
        { label: 'LIMPIEZA DE FILTROS', selector: 'LAVADO', sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'INDIFERENTE', retorno: 'ABIERTA' },
        { label: 'ACLARADO DE FILTRO', selector: 'ENJUAGUE', sumidero: 'ABIERTA', skimmers: 'ABIERTA', limpiafondos: 'INDIFERENTE', retorno: 'ABIERTA' },
        { label: 'APERTURA DE PREFILTRO DE BOMPA', selector: 'CERRADA', sumidero: 'CERRADA', skimmers: 'CERRADA', limpiafondos: 'CERRADA', retorno: 'CERRADA' },
        { label: 'DESAGÜE POR BOMBEO', selector: 'DESAGÜE', sumidero: 'ABIERTA', skimmers: 'CERRADA', limpiafondos: 'CERRADA', retorno: 'CERRADA' },
      ];

  const StatusBadge = ({ status, label }: { status?: string | null; label?: string }) => {
    const statusClasses = {
      ABIERTA: 'bg-green-100 text-green-800 border-green-200',
      CERRADA: 'bg-rose-100 text-rose-800 border-rose-200',
      INDIFERENTE: 'bg-gray-100 text-gray-800 border-gray-200'
    } as Record<string, string>;
    const cls = status && typeof status === 'string' ? statusClasses[status] ?? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-gray-100 text-gray-800 border-gray-200';
    return (
      <span
        role="status"
        aria-label={label ? `${label}: ${status ?? ''}` : (status ?? '')}
        className={`status-badge inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold border ${cls}`}
      >
        {status ?? ''}
      </span>
    );
  };

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const announceRef = useRef<HTMLDivElement | null>(null);
  const printRef = useRef<HTMLDivElement | null>(null);

  // Print the table: open a new window with minimal styles and call window.print()
  const printTable = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Build a clean HTML table for printing (only desktop table, no mobile cards)
    const badgeStyle = (status?: string) => {
      const s = (status || '').toString().toLowerCase();
      if (s.includes('abi') || s.includes('open')) {
        return 'display:inline-block;padding:4px 8px;border-radius:9999px;font-size:11px;background:#dcfce7;color:#166534;border:1px solid #bbf7d0;';
      }
      if (s.includes('cerr') || s.includes('close') || s.includes('closed')) {
        return 'display:inline-block;padding:4px 8px;border-radius:9999px;font-size:11px;background:#ffe4e6;color:#831843;border:1px solid #fecaca;';
      }
      // indiferente / default
      return 'display:inline-block;padding:4px 8px;border-radius:9999px;font-size:11px;background:#f3f4f6;color:#374151;border:1px solid #e5e7eb;';
    };

    const style = `
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;padding:20px;color:#111827}
      h1{font-size:20px;margin-bottom:8px}
      p{margin:0 0 16px 0;color:#6b7280}
      table{width:100%;border-collapse:collapse;margin-bottom:12px}
      th,td{border:1px solid #e5e7eb;padding:8px;text-align:left;font-size:12px}
      th{background:#111827;color:#fff;font-weight:700}
      .small{font-size:11px;color:#6b7280}
      @media print{body{padding:0}}`;

    // Use headers and tableRows to build table HTML
    const hdr = headers as any;
    const rowsHtml = tableRows.map(r => `
      <tr>
        <td style="font-weight:600">${r.label}</td>
        <td style="text-align:center">${r.selector}</td>
        <td style="text-align:center"><span style="${badgeStyle(r.sumidero)}">${r.sumidero ?? ''}</span></td>
        <td style="text-align:center"><span style="${badgeStyle(r.skimmers)}">${r.skimmers ?? ''}</span></td>
        <td style="text-align:center"><span style="${badgeStyle(r.limpiafondos)}">${r.limpiafondos ?? ''}</span></td>
        <td style="text-align:center"><span style="${badgeStyle(r.retorno)}">${r.retorno ?? ''}</span></td>
      </tr>
    `).join('');

    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th rowspan="2">${hdr.positionOf}</th>
            <th rowspan="2">${hdr.selectorHeader.replace(/\\n/g, '<br/>')}</th>
            <th colspan="4">${hdr.valveWaitingHeader}</th>
          </tr>
          <tr>
            <th>${hdr.sumidero}</th>
            <th>${hdr.skimmers}</th>
            <th>${hdr.limpiafondos}</th>
            <th>${hdr.retorno}</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>${style}</style></head><body><h1>${title}</h1><p>${subtitle}</p>${tableHtml}</body></html>`;

    const w = window.open('', '_blank');
    if (!w) {
      alert('No se pudo abrir la ventana de impresión. Comprueba los bloqueadores de ventanas emergentes.');
      return;
    }
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
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

            {/* Printable content (table + mobile cards) */}
            <div ref={printRef}>
            {/* Desktop table: visible on md+ */}
            <div className="hidden md:block overflow-x-auto">
              <div className="min-w-full">
                <table className="w-full border-collapse border border-secondary-200 text-sm">
                  <thead>
                    <tr className="bg-secondary-900 text-white">
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-left font-semibold" rowSpan={2}>
                        {headers.positionOf}
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold" rowSpan={2}>
                        {headers.selectorHeader.split('\n').map((line: string, idx: number) => (
                          <React.Fragment key={idx}>{line}<br/></React.Fragment>
                        ))}
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold" colSpan={4}>
                        {headers.valveWaitingHeader}
                      </th>
                    </tr>
                    <tr className="bg-secondary-900 text-white">
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        {headers.sumidero}
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        {headers.skimmers}
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        {headers.limpiafondos}
                      </th>
                      <th className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center font-semibold">
                        {headers.retorno}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((r, i) => (
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
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.sumidero} label={`${headers.sumidero} ${r.sumidero ?? ''}`} /></td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.skimmers} label={`${headers.skimmers} ${r.skimmers ?? ''}`} /></td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.limpiafondos} label={`${headers.limpiafondos} ${r.limpiafondos ?? ''}`} /></td>
                        <td className="border border-secondary-200 px-1 md:px-2 lg:px-4 py-1 md:py-2 lg:py-3 text-center"><StatusBadge status={r.retorno} label={`${headers.retorno} ${r.retorno ?? ''}`} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Mobile stacked rows */}
            <div className="md:hidden mt-4 space-y-3">
              {tableRows.map((r, i) => (
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
                      <span className="text-secondary-600">{headers.sumidero}</span>
                      <StatusBadge status={r.sumidero} label={`${headers.sumidero} ${r.sumidero ?? ''}`} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-600">{headers.skimmers}</span>
                      <StatusBadge status={r.skimmers} label={`${headers.skimmers} ${r.skimmers ?? ''}`} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-600">{headers.limpiafondos}</span>
                      <StatusBadge status={r.limpiafondos} label={`${headers.limpiafondos} ${r.limpiafondos ?? ''}`} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-600">{headers.retorno}</span>
                      <StatusBadge status={r.retorno} label={`${headers.retorno} ${r.retorno ?? ''}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>{/* end printable content */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 no-print">
              <a
                href="#"
                onClick={printTable}
                aria-label={printLabel}
                className="inline-flex items-center justify-center px-4 md:px-6 lg:px-8 py-3 text-sm md:text-base lg:text-lg rounded-lg bg-secondary-900 text-white font-semibold hover:bg-secondary-800 active:bg-secondary-950 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-700 focus:ring-offset-2"
              >
                {printLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}