"use client";
import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import CartIcon from "@/components/CartIcon";
import { Product } from "@/lib/cart-context";

export default function TiendaPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = React.useState("es");

  React.useEffect(() => {
    params.then(p => setLocale(p.locale || "es"));
  }, [params]);

  const getContent = (locale: string) => {
    if (locale === 'en') return {
      title: 'Boiler Shop',
      subtitle: 'Professional boilers with installation included',
      description: 'Discover our selection of high-quality boilers. All our products include professional installation and warranty.',
      noProducts: 'No products available'
    };
    if (locale === 'ca') return {
      title: 'Botiga de Calderes',
      subtitle: 'Calderes professionals amb instal·lació inclosa',
      description: 'Descobreix la nostra selecció de calderes d\'alta qualitat. Tots els nostres productes inclouen instal·lació professional i garantia.',
      noProducts: 'No hi ha productes disponibles'
    };
    return {
      title: 'Tienda de Calderas',
      subtitle: 'Calderas profesionales con instalación incluida',
      description: 'Descubre nuestra selección de calderas de alta calidad. Todos nuestros productos incluyen instalación profesional y garantía.',
      noProducts: 'No hay productos disponibles'
    };
  };

  const content = getContent(locale);

  // Mock products - En producción esto vendría de una base de datos
  const products: Product[] = [
    {
      id: "1",
      name: "Caldera de Condensación 24kW",
      price: 1200,
      image: "/caldera.png",
      description: "Caldera de gas de condensación de alta eficiencia. Perfecta para viviendas de hasta 150m². Bajo consumo y mínimas emisiones.",
      installationIncluded: true
    },
    {
      id: "2",
      name: "Caldera de Condensación 30kW",
      price: 1450,
      image: "/caldera.png",
      description: "Ideal para espacios más grandes. Sistema de modulación inteligente que optimiza el consumo energético.",
      installationIncluded: true
    },
    {
      id: "3",
      name: "Caldera Mixta 24kW",
      price: 1350,
      image: "/caldera.png",
      description: "Calefacción y agua caliente sanitaria instantánea. Diseño compacto perfecto para cualquier espacio.",
      installationIncluded: true
    },
    {
      id: "4",
      name: "Caldera de Bajo NOx 28kW",
      price: 1550,
      image: "/caldera.png",
      description: "Tecnología de bajas emisiones. Certificación energética A. Control remoto vía WiFi incluido.",
      installationIncluded: true
    },
    {
      id: "5",
      name: "Caldera Estanca 20kW",
      price: 1100,
      image: "/caldera.png",
      description: "Seguridad garantizada con cámara estanca. Ideal para apartamentos y espacios reducidos.",
      installationIncluded: true
    },
    {
      id: "6",
      name: "Caldera Premium 35kW",
      price: 1800,
      image: "/caldera.png",
      description: "Modelo Premium con pantalla táctil LCD. Control inteligente de temperatura y conectividad Smart Home.",
      installationIncluded: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Floating Cart Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-24 right-6 z-40"
      >
        <CartIcon locale={locale} />
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-accent-500/10" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900">
              {content.title}
            </h1>
            <p className="text-xl text-secondary-600 font-medium">
              {content.subtitle}
            </p>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 pb-20">
        <div className="container-custom">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} locale={locale} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-secondary-500">{content.noProducts}</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900">
                {locale === 'en' ? 'Installation Included' : locale === 'ca' ? 'Instal·lació Inclosa' : 'Instalación Incluida'}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900">
                {locale === 'en' ? '2 Years Warranty' : locale === 'ca' ? '2 Anys de Garantia' : '2 Años de Garantía'}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900">
                {locale === 'en' ? 'Fast Delivery' : locale === 'ca' ? 'Enviament Ràpid' : 'Envío Rápido'}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900">
                {locale === 'en' ? 'Technical Support' : locale === 'ca' ? 'Suport Tècnic' : 'Soporte Técnico'}
              </h3>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
