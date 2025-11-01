"use client";
import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    }
  }
};

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  once?: boolean;
}

export function MotionWrapper({ 
  children, 
  className,
  variants = defaultVariants,
  once = true
}: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}