"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackPhoneCall } from "./GoogleAnalytics";

const menuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
};

const menuItemVariants = {
  closed: { x: -20, opacity: 0 },
  open: { x: 0, opacity: 1 }
};

export default function Header({ locale }: { locale?: string }) {
  const pathname = usePathname() || "/";
  const currentLocale = locale || "es";
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangMenuOpen && !target.closest('.language-switcher')) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'ca', name: 'Català' }
  ];

  const getMenuLabel = (locale: string) => {
    if (locale === 'en') return { fontaneria: 'Plumbing', piscinas: 'Pools', calderas: 'Boilers' };
    if (locale === 'ca') return { fontaneria: 'Fontaneria', piscinas: 'Piscines', calderas: 'Calderes' };
    return { fontaneria: 'Fontanería', piscinas: 'Piscinas', calderas: 'Calderas' };
  };

  const labels = getMenuLabel(currentLocale);

  const menuItems = [
    { href: `/servicios/fontaneria`, label: labels.fontaneria },
    { href: `/servicios/piscinas`, label: labels.piscinas },
    { href: `/servicios/calderas`, label: labels.calderas },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      hasScrolled 
        ? "bg-white/98 backdrop-blur-md shadow-soft border-b border-secondary-100" 
        : "bg-white"
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Brand */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-3 group">
            <motion.div 
              className="relative w-12 h-12 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }} 
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image 
                src="/logo.jpeg" 
                alt="Fontanería Logo" 
                width={48}
                height={48}
                className="object-cover" 
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-secondary-900 group-hover:text-primary-600 transition-colors">
                Fontanería en Barcelona
              </span>
              <span className="text-xs text-secondary-500 hidden sm:block">
                {currentLocale === 'en' ? '24/7 Emergency Service' : currentLocale === 'ca' ? 'Urgències 24h' : 'Urgencias 24h'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname.includes(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${currentLocale}${item.href}`}
                  className={`px-4 py-2 rounded-lg font-medium transition-all relative group ${
                    isActive 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                  }`}
                >
                  {item.label}
                  <span className={`absolute inset-x-4 bottom-1 h-0.5 bg-primary-600 transform transition-transform origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Phone + Lang + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Phone (hidden on mobile) */}
            <motion.a 
              href="tel:+34677133242"
              onClick={() => trackPhoneCall('header_desktop')}
              className="hidden sm:flex items-center gap-2 text-secondary-700 hover:text-primary-600 font-semibold transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden md:inline">677 133 242</span>
            </motion.a>
            
            {/* WhatsApp Button (desktop only) */}
            <motion.a
              href="https://wa.me/34677133242"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-green-400 hover:bg-[#6bc4af] text-white shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </motion.a>

            {/* Language Switcher */}
            <div className="relative language-switcher">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="text-sm font-medium px-3 py-2 border-2 border-secondary-200 rounded-lg hover:bg-secondary-50 hover:border-secondary-300 transition-all flex items-center gap-1"
                aria-label="Select language"
              >
                {currentLocale.toUpperCase()}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-secondary-200 overflow-hidden z-50">
                  {languages.map((lang) => {
                    const langPath = pathname.replace(`/${currentLocale}`, `/${lang.code}`);
                    return (
                      <Link
                        key={lang.code}
                        href={langPath}
                        className={`block px-4 py-2 text-sm hover:bg-secondary-50 transition-colors ${
                          currentLocale === lang.code ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-secondary-700'
                        }`}
                        onClick={() => setIsLangMenuOpen(false)}
                      >
                        {lang.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden pt-4 pb-2 border-t border-secondary-100 mt-4"
            >
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive = pathname.includes(item.href);
                  return (
                    <motion.div key={item.href} variants={menuItemVariants}>
                      <Link
                        href={`/${currentLocale}${item.href}`}
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                          isActive 
                            ? 'bg-primary-50 text-primary-700' 
                            : 'text-secondary-700 hover:bg-secondary-50'
                        }`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={menuItemVariants} className="pt-2 space-y-2">
                  <motion.a
                    href="https://wa.me/34677133242"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold bg-[#7dd3c0] hover:bg-[#6bc4af] text-white shadow-sm hover:shadow-md transition-all"
                    onClick={closeMenu}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </motion.a>
                  <a
                    href="tel:+34677133242"
                    className="btn-secondary w-full text-center"
                    onClick={() => {
                      trackPhoneCall('header_mobile');
                      closeMenu();
                    }}
                  >
                    📞 677 133 242
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
