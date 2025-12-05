import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { easings } from '@/hooks/useScrollAnimation';

const benefits = [
  { icon: '⭐', label: 'Points' },
  { icon: '🛡️', label: 'Waranti Digital' },
  { icon: '🎲', label: 'Lucky Draw Entry' },
];

export default function BenefitsList({ points, entries }) {
  const items = [
    { icon: '⭐', text: `${points || 0} Points`, color: 'from-beige-400 to-beige-500' },
    { icon: '🛡️', text: 'Waranti Digital', color: 'from-beige-500 to-beige-600' },
    { icon: '🎲', text: `${entries || 0} Lucky Draw Entry`, color: 'from-beige-600 to-beige-700' },
  ];
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div ref={ref} className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{
            delay: index * 0.15,
            duration: 0.6,
            ease: easings.inOut(3),
          }}
          className={`flex items-center gap-4 p-4 bg-gradient-to-r ${item.color} rounded-xl text-white shadow-lg`}
        >
          <span className="text-3xl">{item.icon}</span>
          <span className="font-semibold text-lg">{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

