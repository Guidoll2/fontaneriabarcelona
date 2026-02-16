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
      image: "/caldera-optimized.jpg",
      description: "Caldera de gas de condensación de alta eficiencia. Perfecta para viviendas de hasta 150m². Bajo consumo y mínimas emisiones.",
      installationIncluded: true
    },
    {
      id: "2",
      name: "Caldera de Condensación 30kW",
      price: 1450,
      image: "/caldera-optimized.jpg",
      description: "Ideal para espacios más grandes. Sistema de modulación inteligente que optimiza el consumo energético.",
      installationIncluded: true
    },
    {
      id: "3",
      name: "Caldera Mixta 24kW",
      price: 1350,
      image: "/caldera-optimized.jpg",
      description: "Calefacción y agua caliente sanitaria instantánea. Diseño compacto perfecto para cualquier espacio.",
      installationIncluded: true
    },
    {
      id: "4",
      name: "Caldera de Bajo NOx 28kW",
      price: 1550,
      image: "/caldera-optimized.jpg",
      description: "Tecnología de bajas emisiones. Certificación energética A. Control remoto vía WiFi incluido.",
      installationIncluded: true
    },
    {
      id: "5",
      name: "Caldera Estanca 20kW",
      price: 1100,
      image: "/caldera-optimized.jpg",
      description: "Seguridad garantizada con cámara estanca. Ideal para apartamentos y espacios reducidos.",
      installationIncluded: true
    },
    {
      id: "6",
      name: "Caldera Premium 35kW",
      price: 1800,
      image: "/caldera-optimized.jpg",
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

      {/* Dudas y Consultas Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-white/20">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                {locale === 'en' ? 'Questions or Concerns?' : locale === 'ca' ? 'Dubtes o Consultes?' : '¿Dudas o Consultas?'}
              </h2>
              
              <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
                {locale === 'en' 
                  ? 'Our team of experts is ready to help you choose the perfect boiler for your needs. Contact us and we will advise you without obligation.'
                  : locale === 'ca'
                  ? 'El nostre equip d\'experts està preparat per ajudar-te a escollir la caldera perfecta per a les teves necessitats. Contacta\'ns i t\'assessorarem sense compromís.'
                  : 'Nuestro equipo de expertos está listo para ayudarte a elegir la caldera perfecta para tus necesidades. Contáctanos y te asesoraremos sin compromiso.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/34677133242"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {locale === 'en' ? 'WhatsApp' : 'WhatsApp'}
                </motion.a>

                <motion.a
                  href="tel:+34677133242"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  677 133 242
                </motion.a>

                <motion.a
                  href={`/${locale}/contacto`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {locale === 'en' ? 'Contact' : locale === 'ca' ? 'Contacte' : 'Contacto'}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
