"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ServicePageLayoutProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  locale: string;
  galleryImages?: GalleryImage[];
}

export default function ServicePageLayout({ 
  title, 
  description, 
  image, 
  features,
  locale,
  galleryImages 
}: ServicePageLayoutProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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


      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
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
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
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

      {/* Gallery Section */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="section-padding bg-secondary-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-center mb-4">
                {locale === 'en' ? 'Our Work' : 'Nuestros Trabajos'}
              </h2>
              <p className="text-center text-secondary-600 text-lg mb-12 max-w-2xl mx-auto">
                {locale === 'en' 
                  ? 'Real photos from our completed projects' 
                  : 'Fotos reales de nuestros trabajos realizados'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                    onClick={() => setSelectedImage(img.src)}
                  >
                    <Image 
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image 
                  src={selectedImage}
                  alt="Vista ampliada"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
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
              {locale === 'en' ? 'Need This Service?' : '¿Necesitas Este Servicio?'}
            </h2>
            <p className="text-xl mb-8 text-secondary-600">
              {locale === 'en' 
                ? 'Get in touch for a free, no-obligation quote. Available 24/7 for emergencies.' 
                : 'Contáctanos para un presupuesto gratuito sin compromiso. Disponibles 24/7 para urgencias.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+34677133242"
                className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold hover:from-orange-700 hover:to-orange-600 active:from-orange-800 active:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {locale === 'en' ? 'Call Now' : 'Llamar Ahora'}
              </a>
              <Link 
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-secondary-900 text-white font-semibold hover:bg-secondary-800 active:bg-secondary-950 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-700 focus:ring-offset-2"
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
