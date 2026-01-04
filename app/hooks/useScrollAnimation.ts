import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = "0px",
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
    ...(rootMargin && rootMargin !== "0px" ? { margin: rootMargin as any } : {}),
  });

  return { ref, isInView };
};

