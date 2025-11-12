"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product, useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  locale?: string;
}

export default function ProductCard({ product, locale = "es" }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    window.location.href = `/${locale}/checkout`;
  };

  const getLabels = (locale: string) => {
    if (locale === 'en') return {
      installation: 'Installation included',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      added: 'Added to cart!'
    };
    if (locale === 'ca') return {
      installation: 'Instal·lació inclosa',
      addToCart: 'Afegir al Carret',
      buyNow: 'Comprar Ara',
      added: 'Afegit al carret!'
    };
    return {
      installation: 'Instalación incluida',
      addToCart: 'Agregar al Carrito',
      buyNow: 'Comprar Ahora',
      added: '¡Agregado al carrito!'
    };
  };

  const labels = getLabels(locale);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative h-full group"
    >
      {/* Glass Card Effect */}
      <div className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/20">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
            unoptimized
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" />
          
          {/* Installation Badge */}
          {product.installationIncluded && (
            <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-semibold text-white">
                  {labels.installation}
                </span>
              </div>
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
            <span className="text-2xl font-bold text-primary-600">
              €{product.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-secondary-600 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-secondary btn-sm flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {labels.addToCart}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 btn-primary btn-sm flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {labels.buyNow}
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {labels.added}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}
