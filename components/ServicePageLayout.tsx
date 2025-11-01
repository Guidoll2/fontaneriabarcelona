"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServicePageLayoutProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  locale: string;
}

export default function ServicePageLayout({ 
  title, 
  description, 
  image, 
  features,
  locale 
}: ServicePageLayoutProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="relative container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-secondary-300 hover:text-white transition-colors mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {locale === 'en' ? 'Back to Home' : 'Volver al Inicio'}
            </Link>
            <h1 className="mb-6 text-gray-100">{title}</h1>
            <p className="text-xl text-secondary-200 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-large"
          >
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-center mb-12">
                {locale === 'en' ? 'What We Offer' : 'Qué Ofrecemos'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-6 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-secondary-900 mb-1">
                        {feature}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">
              {locale === 'en' ? 'Need This Service?' : '¿Necesitas Este Servicio?'}
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              {locale === 'en' 
                ? 'Get in touch for a free, no-obligation quote. Available 24/7 for emergencies.' 
                : 'Contáctanos para un presupuesto gratuito sin compromiso. Disponibles 24/7 para urgencias.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+34677133242"
                className="btn-accent btn-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {locale === 'en' ? 'Call Now' : 'Llamar Ahora'}
              </a>
              <Link 
                href={`/${locale}/contacto`}
                className="btn-secondary btn-lg"
              >
                {locale === 'en' ? 'Request Quote' : 'Pedir Presupuesto'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
