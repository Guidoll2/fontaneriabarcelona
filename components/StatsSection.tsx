"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatBarProps {
  icon: React.ReactNode;
  title: string;
  percentage: number;
  color: string;
  delay: number;
}

function StatBar({ icon, title, percentage, color, delay }: StatBarProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000; // 2 segundos

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function para animación suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * percentage));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, percentage]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${color === 'sky' ? 'bg-sky-100' : color === 'orange' ? 'bg-orange-100' : color === 'cyan' ? 'bg-cyan-100' : 'bg-red-100'}`}>
            <div className={`w-6 h-6 ${color === 'sky' ? 'text-sky-600' : color === 'orange' ? 'text-orange-600' : color === 'cyan' ? 'text-cyan-600' : 'text-red-600'}`}>
              {icon}
            </div>
          </div>
          <h3 className="text-lg font-bold text-secondary-900">{title}</h3>
        </div>
        <div className={`text-3xl font-bold ${color === 'sky' ? 'text-sky-600' : color === 'orange' ? 'text-orange-600' : color === 'cyan' ? 'text-cyan-600' : 'text-red-600'}`}>
          {count}%
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="relative h-4 bg-secondary-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 2, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
          className={`h-full rounded-full ${
            color === 'sky' 
              ? 'bg-gradient-to-r from-sky-500 to-sky-600' 
              : color === 'orange' 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
              : color === 'cyan' 
              ? 'bg-gradient-to-r from-cyan-500 to-cyan-600' 
              : 'bg-gradient-to-r from-red-500 to-red-600'
          } shadow-lg`}
        >
          {/* Brillo animado */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>

      {/* Texto descriptivo */}
      <p className="text-sm text-secondary-600">
        {color === 'sky' && 'Clientes satisfechos con nuestros servicios de fontanería'}
        {color === 'orange' && 'Instalaciones y reparaciones de calderas exitosas'}
        {color === 'cyan' && 'Piscinas mantenidas y reparadas con excelencia'}
        {color === 'red' && 'Emergencias atendidas en menos de 2 horas'}
      </p>
    </motion.div>
  );
}

export default function StatsSection({ locale }: { locale: string }) {
  const stats = [
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: locale === 'en' ? 'Plumbing' : locale === 'ca' ? 'Fontaneria' : 'Fontanería',
      percentage: 96,
      color: 'sky',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      title: locale === 'en' ? 'Boilers' : locale === 'ca' ? 'Calderes' : 'Calderas',
      percentage: 94,
      color: 'orange',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: locale === 'en' ? 'Pools' : locale === 'ca' ? 'Piscines' : 'Piscinas',
      percentage: 98,
      color: 'cyan',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: locale === 'en' ? 'Emergencies' : locale === 'ca' ? 'Emergències' : 'Emergencias',
      percentage: 99,
      color: 'red',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            {locale === 'en' ? 'Our Track Record' : locale === 'ca' ? 'El Nostre Historial' : 'Nuestros Resultados'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary-600 max-w-2xl mx-auto"
          >
            {locale === 'en' 
              ? 'Satisfaction rates across all our services' 
              : locale === 'ca'
              ? 'Taxes de satisfacció en tots els nostres serveis'
              : 'Índices de satisfacción en todos nuestros servicios'}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {stats.map((stat, index) => (
            <StatBar
              key={index}
              icon={stat.icon}
              title={stat.title}
              percentage={stat.percentage}
              color={stat.color}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-secondary-700 mb-4">
            {locale === 'en' 
              ? 'Join thousands of satisfied customers' 
              : locale === 'ca'
              ? 'Uneix-te a milers de clients satisfets'
              : 'Únete a miles de clientes satisfechos'}
          </p>
          <a 
            href="tel:+34677133242" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 active:bg-sky-800 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {locale === 'en' ? 'Call Now' : locale === 'ca' ? 'Trucar Ara' : 'Llamar Ahora'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
