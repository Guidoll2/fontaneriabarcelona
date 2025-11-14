"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ValveGuideCTAProps {
  locale: string;
}

export default function ValveGuideCTA({ locale }: ValveGuideCTAProps) {
  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 via-white to-secondary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-secondary-100"
        >
          <h2 className="mb-6 text-secondary-900">
            {locale === 'en' ? 'Need Help with Valve Configuration?' : '¿Necesitas Ayuda con la Configuración de Válvulas?'}
          </h2>
          <p className="text-xl mb-8 text-secondary-600">
            {locale === 'en' 
              ? 'Check our detailed valve position guide for proper pool filter setup.' 
              : 'Consulta nuestra guía detallada de posiciones de válvulas para una correcta configuración del filtro de piscina.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/servicios/piscinas/guia-valvulas`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 active:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {locale === 'en' ? 'View Valve Guide' : 'Ver Guía de Válvulas'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}