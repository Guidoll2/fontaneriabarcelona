"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZoneCardProps {
  zoneName: string;
  firstFourCities: string[];
  remainingCities: string[];
}

export default function ZoneCard({ zoneName, firstFourCities, remainingCities }: ZoneCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="flex-1">
          {/* Nombre de la zona destacado */}
          <h3 className="text-2xl font-bold text-sky-700 mb-4 tracking-tight">{zoneName}</h3>
          
          {/* Primeras 4 ciudades */}
          <ul className="space-y-2">
            {firstFourCities.map((city, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-secondary-700">
                <svg className="w-4 h-4 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {city}
              </li>
            ))}
          </ul>

          {/* Ciudades restantes con animación */}
          <AnimatePresence>
            {isExpanded && remainingCities.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 mt-2 overflow-hidden"
              >
                {remainingCities.map((city, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-secondary-700">
                    <svg className="w-4 h-4 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {city}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Botón para expandir/contraer si hay más ciudades */}
          {remainingCities.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              {isExpanded ? 'Ver menos' : `Ver ${remainingCities.length} más`}
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
