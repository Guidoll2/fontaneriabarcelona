"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageWrapper from "./ImageWrapper";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  img: string;
  href?: string;
  icon?: React.ReactNode;
  locale?: string;
}

export default function ServiceCard({ title, description, img, href, icon, locale = "es" }: ServiceCardProps) {
  const content = (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="card card-hover h-full cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image 
          src={img} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Icon Badge */}
        {icon && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
            {icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="text-secondary-600 leading-relaxed line-clamp-3">
          {description}
        </p>
        
        {href && (
          <div className="flex items-center gap-2 text-primary-600 font-semibold pt-2 group-hover:gap-3 transition-all">
            <span>{locale === 'en' ? 'Learn more' : locale === 'ca' ? 'Veure més' : 'Ver más'}</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        )}
      </div>
    </motion.article>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
