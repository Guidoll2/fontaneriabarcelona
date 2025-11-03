"use client";
import { use } from "react";
import { getDict } from "../../lib/i18n";
import ServiceCard from "../../components/ServiceCard";
import TestimonialCard from "../../components/TestimonialCard";
import BudgetForm from "../../components/BudgetForm";
import Image from "next/image";
import { localBusinessJsonLd } from "../../lib/seo";
import { motion } from "framer-motion";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = use(params);
  const locale = localeParam || "es";
  const dict = getDict(locale as string);

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
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative z-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-30 z-0">
          <Image 
            src="/Fontanero-1.jpeg" 
            alt="" 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 via-secondary-900/80 to-secondary-900/60" />
        </div>

        <div className="relative z-10 container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-6 lg:space-y-8">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-accent-500/30 border border-accent-400/40 backdrop-blur-md px-4 py-2 rounded-full text-accent-200 font-medium shadow-lg"
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
                className="text-balance text-gray-200 drop-shadow-lg"
              >
                {dict.home.headline}
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-secondary-100 leading-relaxed max-w-xl drop-shadow-md"
              >
                {dict.home.sub}
              </motion.p>

              {/* Benefits List with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-2xl"
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "✓", text: locale === 'en' ? '24/7 Emergency Service' : 'Servicio de Urgencias 24h' },
                    { icon: "✓", text: locale === 'en' ? 'Fast Response' : 'Respuesta Rápida' },
                    { icon: "✓", text: locale === 'en' ? 'Competitive Prices' : 'Precios Competitivos' },
                    { icon: "✓", text: locale === 'en' ? 'Quality Guaranteed' : 'Calidad Garantizada' },
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                        {benefit.icon}
                      </span>
                      <span className="font-semibold text-white drop-shadow-md">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a 
                  href="tel:+34677133242" 
                  className="btn-accent btn-lg group shadow-xl hover:shadow-2xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {dict.home.cta_call}
                </a>
                <a 
                  href={`#contact`}
                  className="btn-secondary btn-lg shadow-xl hover:shadow-2xl"
                >
                  {dict.home.cta_quote}
                </a>
              </motion.div>
            </div>

            {/* Hero Image/Stats Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:flex flex-col gap-6"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10 h-[400px]">
                <Image 
                  src="/Fontanero-1.jpeg" 
                  alt={locale === 'en' ? 'Professional plumbing services' : 'Servicios profesionales de fontanería'} 
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              
              {/* Stats Card Below Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-xl shadow-2xl p-6 border-4 border-accent-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-primary-600">24/7</p>
                    <p className="text-secondary-600 font-medium">
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
                ? 'Professional solutions for all your plumbing and pool needs' 
                : 'Soluciones profesionales para todas tus necesidades de fontanería y piscinas'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{locale === 'en' ? 'Service Areas' : locale === 'ca' ? 'Zones de Servei' : 'Zonas de Servicio'}</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'We provide plumbing and pool services throughout Terrassa and the greater Barcelona region' 
                : locale === 'ca'
                ? 'Oferim serveis de fontaneria i piscines a Terrassa i la regió de Barcelona'
                : 'Ofrecemos servicios de fontanería y piscinas en Terrassa y la comarca de Barcelona'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.coverage?.zones?.map((zone: { name: string; cities: string }, idx: number) => (
              <div key={idx} className="card p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-secondary-900 mb-3">{zone.name}</h3>
                    <p className="text-sm text-secondary-600 leading-relaxed">{zone.cities}</p>
                  </div>
                </div>
              </div>
            ))}
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

      {/* Why Choose Us Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{dict.home.benefits.title}</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Experience and professionalism you can trust' 
                : 'Experiencia y profesionalidad en la que puedes confiar'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: dict.home.benefits.response,
                desc: locale === 'en' ? 'We respond quickly to your emergencies' : 'Respondemos rápidamente a tus urgencias'
              },
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: dict.home.benefits.pricing,
                desc: locale === 'en' ? 'Clear pricing with no hidden fees' : 'Precios claros sin cargos ocultos'
              },
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: dict.home.benefits.quality,
                desc: locale === 'en' ? 'All work comes with warranty' : 'Todos los trabajos con garantía'
              },
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: dict.home.benefits.experience,
                desc: locale === 'en' ? 'Professional and certified team' : 'Equipo profesional y certificado'
              },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-secondary-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{locale === 'en' ? 'What Our Clients Say' : 'Lo Que Dicen Nuestros Clientes'}</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Real feedback from satisfied customers' 
                : 'Opiniones reales de clientes satisfechos'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              author="María García, Badalona" 
              text={locale === 'en' 
                ? "Fast and professional service. They fixed my leak the same morning!" 
                : "Servicio rápido y profesional. ¡Solucionaron mi fuga la misma mañana!"}
              rating={5}
              image="/Fontanero-maletin.jpeg"
            />
            <TestimonialCard 
              author="Jordi Martínez, Barcelona" 
              text={locale === 'en' 
                ? "Great price and clean work. Highly recommended!" 
                : "Buen precio y trabajo limpio. ¡Muy recomendables!"}
              rating={5}
            />
            <TestimonialCard 
              author="Carmen López, Sant Cugat" 
              text={locale === 'en' 
                ? "Excellent pool maintenance service. Very professional and reliable." 
                : "Excelente servicio de mantenimiento de piscina. Muy profesionales y confiables."}
              rating={5}
            />
          </div>
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
                src="/maletin.jpeg"
                alt={locale === 'en' ? 'Our professional team' : 'Nuestro equipo profesional'}
                fill
                className="object-cover"
                unoptimized
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
