"use client";
import { use, useState, useEffect } from "react";
import { getDict } from "../../lib/i18n";
import ServiceCard from "../../components/ServiceCard";
import TestimonialCard from "../../components/TestimonialCard";
import BudgetForm from "../../components/BudgetForm";
import Image from "next/image";
import { localBusinessJsonLd } from "../../lib/seo";
import { motion, AnimatePresence } from "framer-motion";
import { trackPhoneCall } from "../../components/GoogleAnalytics";
import HeroImageCarousel from "../../components/HeroImageCarousel";
import ZoneCard from "../../components/ZoneCard";
import StatsSection from "../../components/StatsSection";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = use(params);
  const locale = localeParam || "es";
  const dict = getDict(locale as string);

  // Hero image carousel
  const heroImages = [
    { src: "/piscinalista.jpeg", alt: locale === 'en' ? 'Professional pool services' : 'Servicios profesionales de piscinas' },
    { src: "/camionetaplot2.png", alt: locale === 'en' ? 'Boiler installation and repair' : 'Instalación y reparación de calderas' },
    { src: "/caldera.png", alt: locale === 'en' ? 'Professional plumbing services' : 'Servicios profesionales de fontanería' }
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Service icons
  const serviceIcons = {
    fontaneria: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    piscinas: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    calderas: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative z-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Background Image Carousel with Overlay */}
        <HeroImageCarousel />

        <div className="relative z-10 container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/40 backdrop-blur-md px-4 py-2 rounded-full text-sky-700 font-medium shadow-lg"
              >
                <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {dict.home.benefits.response}
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-balance text-sky-900 drop-shadow-sm"
              >
                {dict.home.headline}
              </motion.h1>

              {/* Subheadline - Click to Zones */}
              <motion.a 
                href="#coverage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-cyan-900 leading-relaxed max-w-xl drop-shadow-sm inline-flex items-center gap-2 group cursor-pointer hover:text-sky-600 transition-colors duration-300"
              >
                <span>{dict.home.sub}</span>
                <svg 
                  className="w-6 h-6 text-sky-500 group-hover:translate-x-1 group-hover:text-sky-600 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>

              {/* Benefits List with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-lg border border-sky-200/60 rounded-2xl p-6 shadow-xl"
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "✓", text: locale === 'en' ? '24/7 Emergency Service' : 'Servicio de Urgencias 24h' },
                    { icon: "✓", text: locale === 'en' ? 'Fast Response' : 'Respuesta Rápida' },
                    { icon: "✓", text: locale === 'en' ? 'Competitive Prices' : 'Precios Competitivos' },
                    { icon: "✓", text: locale === 'en' ? 'Quality Guaranteed' : 'Calidad Garantizada' },
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                        {benefit.icon}
                      </span>
                      <span className="font-semibold text-cyan-900 drop-shadow-sm">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col gap-4 pt-4"
              >
                {/* Desktop Layout (lg): Call + WhatsApp side by side, Quote below */}
                <div className="hidden lg:flex flex-col gap-4">
                  <div className="flex gap-4">
                    <a 
                      href="tel:+34677133242" 
                      onClick={() => trackPhoneCall('hero_cta')}
                      className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 active:bg-sky-800 transition-all duration-200 shadow-xl hover:shadow-2xl group"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {dict.home.cta_call}
                    </a>
                    <a 
                      href="https://wa.me/34677133242?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20necesito%20informaci%C3%B3n%20sobre%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-green-400 text-white font-semibold hover:bg-green-500 active:bg-green-600 transition-all duration-200 shadow-xl hover:shadow-2xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                  <a 
                    href={`#contact`}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-white text-cyan-900 font-semibold border-2 border-sky-300 hover:bg-sky-50 hover:border-sky-400 active:bg-sky-100 transition-all duration-200 shadow-xl hover:shadow-2xl"
                  >
                    {dict.home.cta_quote}
                  </a>
                </div>

                {/* Tablet Layout (md-lg): Quote first, then Call + WhatsApp */}
                <div className="hidden sm:flex lg:hidden flex-col gap-4">
                  <a 
                    href={`#contact`}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-white text-cyan-900 font-semibold border-2 border-sky-300 hover:bg-sky-50 hover:border-sky-400 active:bg-sky-100 transition-all duration-200 shadow-xl hover:shadow-2xl"
                  >
                    {dict.home.cta_quote}
                  </a>
                  <div className="flex gap-4">
                    <a 
                      href="tel:+34677133242" 
                      onClick={() => trackPhoneCall('hero_cta')}
                      className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 active:bg-sky-800 transition-all duration-200 shadow-xl hover:shadow-2xl group flex-1"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {dict.home.cta_call}
                    </a>
                    <a 
                      href="https://wa.me/34677133242?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20necesito%20informaci%C3%B3n%20sobre%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-green-400 text-white font-semibold hover:bg-green-500 active:bg-green-600 transition-all duration-200 shadow-xl hover:shadow-2xl flex-1"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Mobile Layout: Call, WhatsApp, Quote stacked */}
                <div className="flex sm:hidden flex-col gap-4">
                  <a 
                    href="tel:+34677133242" 
                    onClick={() => trackPhoneCall('hero_cta')}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 active:bg-sky-800 transition-all duration-200 shadow-xl hover:shadow-2xl group"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {dict.home.cta_call}
                  </a>
                  <a 
                    href="https://wa.me/34677133242?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20necesito%20informaci%C3%B3n%20sobre%20sus%20servicios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-green-400 text-white font-semibold hover:bg-green-500 active:bg-green-600 transition-all duration-200 shadow-xl hover:shadow-2xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a 
                    href={`#contact`}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-white text-cyan-900 font-semibold border-2 border-sky-300 hover:bg-sky-50 hover:border-sky-400 active:bg-sky-100 transition-all duration-200 shadow-xl hover:shadow-2xl"
                  >
                    {dict.home.cta_quote}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Hero Image/Stats Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:flex flex-col gap-6"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-sky-200/50 h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative w-full h-full"
                  >
                    <Image 
                      src={heroImages[currentImageIndex].src}
                      alt={heroImages[currentImageIndex].alt}
                      fill
                      className="object-cover"
                      priority={currentImageIndex === 0}
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Stats Card Below Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-xl shadow-2xl p-6 border-4 border-sky-200/60"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-sky-50 rounded-lg p-4">
                    <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-sky-600">24/7</p>
                    <p className="text-cyan-900 font-medium">
                      {locale === 'en' ? 'Emergency Service' : 'Servicio de Urgencias'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{locale === 'en' ? 'Our Services' : 'Nuestros Servicios'}</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Professional solutions for all your plumbing, pool and boiler needs' 
                : 'Soluciones profesionales para todas tus necesidades de fontanería, piscinas y calderas'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ServiceCard 
              title={dict.services.fontaneria.title} 
              description={dict.services.fontaneria.desc} 
              img="/bachaoro.jpeg" 
              href={`/${locale}/servicios/fontaneria`}
              icon={serviceIcons.fontaneria}
              locale={locale}
            />
            <ServiceCard 
              title={dict.services.piscinas.title} 
              description={dict.services.piscinas.desc} 
              img="/piscinaslista3.jpeg" 
              href={`/${locale}/servicios/piscinas`}
              icon={serviceIcons.piscinas}
              locale={locale}
            />
            <ServiceCard 
              title={dict.services.calderas.title} 
              description={dict.services.calderas.desc} 
              img="/caldera.png" 
              href={`/${locale}/servicios/calderas`}
              icon={serviceIcons.calderas}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section id="coverage" className="section-padding bg-white scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{locale === 'en' ? 'Service Areas' : locale === 'ca' ? 'Zones de Servei' : 'Zonas de Servicio'}</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Professional plumbing, boiler and pool services in Barcelonès, Vallès Occidental, Vallès Oriental, Baix Llobregat, Bages and Maresme' 
                : locale === 'ca'
                ? 'Serveis professionals de fontaneria, calderes i piscines al Barcelonès, Vallès Occidental, Vallès Oriental, Baix Llobregat, Bages i Maresme'
                : 'Servicios profesionales de fontanería, calderas y piscinas en Barcelonès, Vallès Occidental, Vallès Oriental, Baix Llobregat, Bages y Maresme'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.coverage?.zones?.map((zone: { name: string; cities: string }, idx: number) => {
              const citiesArray = zone.cities.split(', ');
              const firstFourCities = citiesArray.slice(0, 4);
              const remainingCities = citiesArray.slice(4);
              
              return (
                <ZoneCard 
                  key={idx}
                  zoneName={zone.name}
                  firstFourCities={firstFourCities}
                  remainingCities={remainingCities}
                />
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-primary-50 rounded-xl p-6">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-secondary-900">
                  {locale === 'en' ? 'Not sure if we cover your area?' : locale === 'ca' ? 'No estàs segur si cobrim la teva zona?' : '¿No estás seguro si cubrimos tu zona?'}
                </p>
                <p className="text-secondary-600">
                  {locale === 'en' ? 'Call us and ask! We may service your location.' : locale === 'ca' ? "Truca'ns i pregunta! Potser donem servei a la teva ubicació." : '¡Llámanos y consulta! Podemos atender tu ubicación.'}
                </p>
              </div>
              <a href="tel:+34677133242" className="btn-primary whitespace-nowrap">
                {locale === 'en' ? 'Call Now' : locale === 'ca' ? 'Trucar Ara' : 'Llamar Ahora'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Nuestros Resultados */}
      <StatsSection locale={locale} />

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{locale === 'en' ? 'What Our Clients Say' : 'Lo Que Dicen Nuestros Clientes'}</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Real reviews from satisfied customers on Google Maps' 
                : 'Reseñas reales de clientes satisfechos en Google Maps'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <TestimonialCard 
              author="PedroJSkywalker" 
              text={locale === 'en' 
                ? "Adam is an excellent plumber, with a lot of experience and very professional in his treatment, as well as friendly and honest. He quickly solved my bathroom installations and for a fair price, not a single problem once he left everything finished. With people like him it is a pleasure to deal with." 
                : locale === 'ca'
                ? "L'Adam és un lampista excel·lent, amb molta experiència i molt correcte en el tracte a més d'agradable i sincer, ràpidament va solucionar les meves instal·lacions del bany i per un preu acord amb el treball, ni un sol problema un cop va deixar tot acabat. Amb persones com ell és un plaer tractar."
                : "Adam es un fontanero excelente, con mucha experiencia y muy correcto en el trato además de simpático y sincero, rápidamente solucionó mis instalaciones del cuarto de baño y por un precio acorde al trabajo, ni un solo problema una vez dejo todo terminado. Con personas como él es un placer tratar."}
              rating={5}
            />
            <TestimonialCard 
              author="Marçal B." 
              text={locale === 'en' 
                ? "100% recommended. He has been solving my plumbing problems for years (pipe leaks, electric water heater replacement, pool problems, etc.) and always in a very efficient and professional manner. He demonstrates great experience in every job he does, he's not expensive and you can count on him quickly. I wish there were more tradesmen like him!" 
                : locale === 'ca'
                ? "Recomanable al 100%. M'ha estat solucionant problemes de lampisteria durant anys (punxades a canonades, substitució de termo elèctric, problemes amb la piscina, etc) i sempre d'una manera molt resolutiva i professional. Demostra gran experiència en cada actuació que realitza, no és car i a més es pot quedar amb ell amb rapidesa. Ojalà més industrials així!"
                : "Recomendable al 100%. Me ha estado solucionando problemas de fontanería durante años (pinchazos en tuberías, sustitución de termo eléctrico, problemas con la piscina, etc) y siempre de una manera muy resolutiva y profesional. Demuestra gran experiencia en cada actuación que realiza, no es caro y además se puede quedar con él con rapidez. Ojalá más industriales así!"}
              rating={5}
            />
          </div>

          {/* Google Maps Review Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <a 
              href="https://share.google/Loj7ZpCRfaGazpoYz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-primary-300 rounded-xl hover:bg-primary-50 hover:border-primary-500 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                <path d="M12 6c-3.308 0-6 2.692-6 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
              <div className="text-left">
                <div className="font-bold text-secondary-900 group-hover:text-primary-700 transition-colors">
                  {locale === 'en' 
                    ? 'See All Reviews on Google Maps' 
                    : locale === 'ca'
                    ? 'Veure Totes les Ressenyes a Google Maps'
                    : 'Ver Todas las Reseñas en Google Maps'}
                </div>
                <div className="flex items-center gap-1 text-sm text-secondary-600">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-semibold text-secondary-900">5.0</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/adamback.png"
                alt={locale === 'en' ? 'Our professional team' : 'Nuestro equipo profesional'}
                fill
                className="object-cover"
                            />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                  {locale === 'en' ? 'Our Team' : 'Nuestro Equipo'}
                </span>
                <h2 className="mb-4">
                  {locale === 'en' 
                    ? 'Professionals You Can Trust' 
                    : 'Profesionales en los Que Puedes Confiar'}
                </h2>
                <p className="text-lg text-secondary-600">
                  {locale === 'en' 
                    ? 'Our team of certified technicians has years of experience in plumbing and pool maintenance. We are committed to providing quality work and exceptional customer service.' 
                    : 'Nuestro equipo de técnicos certificados cuenta con años de experiencia en fontanería y mantenimiento de piscinas. Estamos comprometidos con ofrecer trabajos de calidad y un servicio al cliente excepcional.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-secondary-900">
                      {locale === 'en' ? 'Certified' : 'Certificados'}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 ml-7">
                    {locale === 'en' ? 'Licensed professionals' : 'Profesionales homologados'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-secondary-900">
                      {locale === 'en' ? 'Fast Response' : 'Respuesta Rápida'}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 ml-7">
                    {locale === 'en' ? '24/7 availability' : 'Disponibilidad 24/7'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="font-semibold text-secondary-900">
                      {locale === 'en' ? 'Experience' : 'Experiencia'}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 ml-7">
                    {locale === 'en' ? '10+ years' : '+10 años'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-semibold text-secondary-900">
                      {locale === 'en' ? 'Warranty' : 'Garantía'}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 ml-7">
                    {locale === 'en' ? 'All work guaranteed' : 'Todos los trabajos'}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a href="tel:+34677133242" className="btn-primary inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {locale === 'en' ? 'Contact Our Team' : 'Contacta con Nuestro Equipo'}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact/Quote Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">{dict.contact.title}</h2>
              <p className="text-xl text-secondary-600">
                {dict.contact.intro}
              </p>
            </div>
            
            <BudgetForm locale={locale} />
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd({ locale })) }} 
      />
    </>
  );
}
