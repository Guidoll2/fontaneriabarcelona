"use client";
import { motion } from "framer-motion";
import { trackPhoneCall } from "./GoogleAnalytics";
import { usePathname } from "next/navigation";

interface EmergencyButtonProps {
  locale: string;
}

export default function EmergencyButton({ locale }: EmergencyButtonProps) {
  const pathname = usePathname();
  
  // Ocultar el botón en páginas específicas
  const hideButton = pathname?.includes('/tienda') || pathname?.includes('/checkout') || pathname?.includes('/instalacion-clorador-salino');
  
  if (hideButton) {
    return null;
  }

  const buttonText = {
    es: "Emergencia 24h",
    en: "24h Emergency",
    ca: "Emergència 24h"
  };

  return (
    <motion.a
      href="tel:+34677133242"
      onClick={() => trackPhoneCall('emergency_button')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
      aria-label="Llamar servicio de emergencia"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
        
        {/* Main button */}
        <div className="relative bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3 flex-wrap sm:flex-nowrap max-w-[90vw] min-w-0">
          {/* Phone icon with animation */}
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
            />
          </svg>
          
          {/* Text */}
          <span className="font-bold text-sm sm:text-base whitespace-normal sm:whitespace-nowrap">
            {buttonText[locale as keyof typeof buttonText] || buttonText.es}
          </span>
          
          {/* Emergency badge */}
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 sm:-top-1 sm:-right-1 sm:translate-x-0 sm:-translate-y-0 bg-yellow-400 text-red-900 text-xs font-black px-2 py-0.5 rounded-full animate-bounce shadow-lg">
            SOS
          </span>
        </div>
      </div>
    </motion.a>
  );
}
