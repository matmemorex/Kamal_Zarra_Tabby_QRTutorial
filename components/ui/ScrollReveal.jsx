import { motion } from 'framer-motion';
import { useScrollAnimation, easings } from '@/hooks/useScrollAnimation';

/**
 * ScrollReveal component - Animates elements as they scroll into view
 * Similar to animejs onScroll({ sync: true })
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  ease = 'inOut(3)',
  direction = 'up',
  distance = 30,
  className = '',
  ...props
}) {
  const { ref, isInView } = useScrollAnimation();

  // Parse ease function
  let easingValue = [0.42, 0, 0.58, 1]; // default
  if (ease === 'inOut(3)') {
    easingValue = easings.inOut(3);
  } else if (typeof ease === 'string' && ease.startsWith('inOut')) {
    const match = ease.match(/inOut\((\d+)\)/);
    if (match) {
      easingValue = easings.inOut(parseInt(match[1]));
    }
  } else if (Array.isArray(ease)) {
    easingValue = ease;
  }

  // Direction variants
  const directionVariants = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    fade: { x: 0, y: 0 },
  };

  const variant = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...variant,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
      } : {
        opacity: 0,
        ...variant,
      }}
      transition={{
        duration,
        delay,
        ease: easingValue,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

