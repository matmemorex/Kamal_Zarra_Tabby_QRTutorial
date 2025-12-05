import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Custom easing function: inOut(3)
 * Creates a smooth cubic in-out easing with 3 iterations
 */
export function inOutEasing(iterations = 3) {
  // Cubic bezier approximation for inOut(3)
  // This creates a smooth acceleration and deceleration
  return [0.42, 0, 0.58, 1]; // Standard ease-in-out
}

/**
 * Scroll-triggered animation hook
 * Similar to onScroll({ sync: true }) from animejs
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options.once !== false, // Only animate once by default
    amount: options.amount || 0.3, // Trigger when 30% visible
    margin: options.margin || '0px',
  });

  return {
    ref,
    isInView,
  };
}

/**
 * Custom easing presets
 */
export const easings = {
  inOut: (n = 3) => {
    // For n=3, use a more pronounced cubic ease
    if (n === 3) {
      return [0.65, 0, 0.35, 1]; // Stronger ease-in-out
    }
    // Default cubic ease-in-out
    return [0.42, 0, 0.58, 1];
  },
  inOutExpo: [0.87, 0, 0.13, 1],
  inOutQuad: [0.45, 0, 0.55, 1],
  inOutCubic: [0.65, 0, 0.35, 1],
};

