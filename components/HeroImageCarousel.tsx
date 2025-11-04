"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/piscinalista.jpeg",
  "/bachaoro.jpeg",
  "/piscinaslista2.jpeg",
  "/calderamodificada.png",
  "/bachabaño.jpeg"
];

export default function HeroImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 opacity-20 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96] // Smooth professional easing
          }}
          className="absolute inset-0"
        >
          <Image 
            src={images[currentIndex]} 
            alt="" 
            fill 
            className="object-cover"
            priority={currentIndex === 0}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-sky-50/90 to-cyan-50/85" />
    </div>
  );
}
