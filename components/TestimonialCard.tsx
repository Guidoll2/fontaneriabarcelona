"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialCardProps {
  author: string;
  text: string;
  rating?: number;
  image?: string;
}

export default function TestimonialCard({ author, text, rating = 5, image }: TestimonialCardProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="card p-8 h-full flex flex-col"
    >
      {/* Quote Icon */}
      <div className="text-primary-500 mb-4">
        <svg className="w-10 h-10 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Text */}
      <p className="text-secondary-700 leading-relaxed mb-6 flex-grow italic">
        "{text}"
      </p>

      {/* Footer with Rating and Author */}
      <div className="border-t border-secondary-100 pt-4 space-y-2">
        {/* Star Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-secondary-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Author */}
        <cite className="text-secondary-900 font-semibold not-italic flex items-center gap-3">
          {image ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-100">
              <Image 
                src={image}
                alt={author}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
              {author.charAt(0).toUpperCase()}
            </div>
          )}
          {author}
        </cite>
      </div>
    </motion.blockquote>
  );
}
