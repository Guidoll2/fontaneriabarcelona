"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageWrapperProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function ImageWrapper({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  onClick,
}: ImageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading && !error && (
          <motion.div
            key="loading"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-secondary-100 animate-pulse"
          />
        )}
      </AnimatePresence>

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={90}
        className={`duration-700 ease-in-out ${
          isLoading
            ? "scale-105 blur-lg grayscale"
            : "scale-100 blur-0 grayscale-0"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        onClick={onClick}
        sizes={fill ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-50 text-secondary-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}