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
    // Configuración necesaria para habilitar remarketing y conversiones de Ads
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

// Función helper base para GA4
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

/**
 * ESPECÍFICO PARA GOOGLE ADS
 * Dispara la conversión cuando el formulario se envía con éxito.
 */
export const trackGadsConversion = () => {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL;

  if (typeof window !== 'undefined' && (window as any).gtag && googleAdsId && conversionLabel) {
    (window as any).gtag('event', 'conversion', {
      'send_to': `${googleAdsId}/${conversionLabel}`,
      'value': 1.0,
      'currency': 'EUR',
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
  // 1. Registro en Google Analytics 4
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: formType,
    value: 1,
  });

  // 2. Disparo de conversión en Google Ads (Optimización de campaña)
  if (formType === 'cloradores') {
    trackGadsConversion();
  }
};