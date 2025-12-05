import { motion, AnimatePresence } from 'framer-motion';
import { easings } from '@/hooks/useScrollAnimation';

/**
 * Tutorial Text Content - Displays beside the phone
 */
export default function TutorialTextContent({ step, currentStep, totalSteps }) {
  if (!step) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{
          duration: 1.2,
          ease: easings.inOut(3),
        }}
        className="text-white"
      >
        {/* Icon */}
        <motion.div
          className="text-5xl lg:text-6xl mb-4 lg:mb-6"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: easings.inOut(3),
          }}
        >
          {step.icon || '📚'}
        </motion.div>

        {/* Title */}
        <h3 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 drop-shadow-lg leading-tight">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 leading-relaxed drop-shadow-md">
          {step.text}
        </p>

        {/* Details List */}
        {step.details && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: easings.inOut(3) }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
          >
            <ul className="space-y-4">
              {step.details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.1,
                    duration: 0.6,
                    ease: easings.inOut(3),
                  }}
                  className="flex items-start gap-3 text-white/90 text-base lg:text-lg"
                >
                  <span className="text-beige-300 text-2xl font-bold">→</span>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Step Indicator */}
        <div className="mt-8 flex items-center gap-2">
          <span className="text-white/70 text-sm">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-beige-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 1.2, ease: easings.inOut(3) }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

