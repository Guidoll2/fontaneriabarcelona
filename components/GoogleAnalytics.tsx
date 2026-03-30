'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  if (!measurementId && !googleAdsId) {
    return null;
  }

  const configLines = [];
  if (measurementId) {
    configLines.push(`gtag('config', '${measurementId}', { page_path: window.location.pathname });`);
  }
  if (googleAdsId) {
    // Importante: Ads necesita su propia línea de config para habilitar el remarketing y conversiones
    configLines.push(`gtag('config', '${googleAdsId}');`);
  }

  const primaryId = googleAdsId || measurementId;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${configLines.join('\n            ')}
          `,
        }}
      />
    </>
  );
}

// Función helper base
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

/**
 * ESPECÍFICO PARA GOOGLE ADS
 * Dispara la conversión cuando el formulario se envía con éxito.
 * El 'send_to' debe ser: ID_DE_ADS/LABEL_DE_CONVERSION
 */
export const trackGadsConversion = () => {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = "AQUÍ_EL_LABEL_QUE_TE_DIO_GOOGLE"; // Ej: "abCDeFGhiJklMnOpqR"

  if (typeof window !== 'undefined' && (window as any).gtag && googleAdsId) {
    (window as any).gtag('event', 'conversion', {
      'send_to': `${googleAdsId}/${conversionLabel}`,
    });
  }
};

export const trackPhoneCall = (source: string) => {
  trackEvent('phone_call', {
    event_category: 'engagement',
    event_label: source,
    value: 1,
  });
};

export const trackFormSubmission = (formType: string) => {
  // 1. Seguimos trackeando en Analytics (GA4)
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: formType,
    value: 1,
  });

  // 2. DISPARAMOS LA CONVERSIÓN DE ADS (La que optimiza tus 100€)
  if (formType === 'cloradores') {
    trackGadsConversion();
  }
};