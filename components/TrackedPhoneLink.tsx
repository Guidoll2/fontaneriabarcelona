'use client';

import { trackPhoneCall } from './GoogleAnalytics';

interface TrackedPhoneLinkProps {
  source: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedPhoneLink({ source, className, children }: TrackedPhoneLinkProps) {
  return (
    <a
      href="tel:+34677133242"
      className={className}
      onClick={() => {
        trackPhoneCall(source);
        // Also push to dataLayer for Google Ads conversion
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'phone_click',
            event_category: 'conversion',
            event_label: source,
            value: 1800,
            currency: 'EUR',
          });
        }
      }}
    >
      {children}
    </a>
  );
}
