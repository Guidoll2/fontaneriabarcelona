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
    configLines.push(`gtag('config', '${googleAdsId}');`);
  }

  // Use GA measurement ID or Ads ID for the script src
  const primaryId = measurementId || googleAdsId;

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

// Función helper para trackear eventos personalizados
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Función para trackear llamadas telefónicas
export const trackPhoneCall = (source: string) => {
  trackEvent('phone_call', {
    event_category: 'engagement',
    event_label: source,
    value: 1,
  });
};

// Función para trackear envíos de formulario
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: formType,
    value: 1,
  });
};
