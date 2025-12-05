import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { easings } from '@/hooks/useScrollAnimation';
import PhoneFrame from './PhoneFrame';
import TutorialTextContent from './TutorialTextContent';

/**
 * POV Tutorial Component
 * - POV section auto-plays through different states
 * - Tutorial text follows scroll position
 * - Scroll up/down controls the tutorial progression
 */
export default function POVTutorial({ steps = [] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Transform scroll progress to step index
  const stepProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, steps.length - 1]
  );

  // Auto-play POV transitions
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % steps.length;
        return next;
      });
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  // Sync POV with scroll
  useEffect(() => {
    const unsubscribe = stepProgress.on('change', (latest) => {
      const stepIndex = Math.round(latest);
      if (stepIndex !== currentStep && stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        setIsAutoPlaying(false); // Pause autoplay when user scrolls
      }
    });

    return () => unsubscribe();
  }, [stepProgress, currentStep, steps.length]);

  // Resume autoplay after scroll stops
  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 5000); // Resume after 5 seconds of no scroll

      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying]);

  const currentStepData = steps[currentStep] || steps[0];

  return (
    <div ref={containerRef} className="relative" style={{ height: `${steps.length * 100}vh` }}>
      {/* POV Section - Static Phone with Changing Content */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 overflow-hidden z-20">
        <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 gap-8 lg:gap-12">
          {/* Tutorial Text - Beside Phone (Left Side on desktop, Top on mobile) */}
          <div className="flex-1 max-w-lg lg:pr-8 z-10 order-2 lg:order-1">
            <TutorialTextContent
              step={currentStepData}
              currentStep={currentStep}
              totalSteps={steps.length}
            />
          </div>

          {/* Static Phone Frame - Center/Right */}
          <PhoneFrame className="w-full max-w-sm flex-shrink-0 relative z-10 order-1 lg:order-2">
            {/* Content inside phone changes per sequence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 1.2,
                  ease: easings.inOut(3),
                }}
                className="h-full w-full"
              >
                {currentStepData?.povComponent || (
                  <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
                    <div className="text-6xl mb-4">{currentStepData?.icon || '📱'}</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      {currentStepData?.title || 'Step ' + (currentStep + 1)}
                    </h2>
                    <p className="text-gray-600 text-base text-center">
                      {currentStepData?.description || 'POV Content'}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>

          {/* Progress Indicator - Outside Phone */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? 'w-8 bg-beige-700' : 'w-2 bg-beige-400'
                }`}
                initial={false}
                animate={{
                  width: index === currentStep ? 32 : 8,
                  opacity: index === currentStep ? 1 : 0.5,
                }}
                transition={{ duration: 0.3, ease: easings.inOut(3) }}
              />
            ))}
          </div>

          {/* Autoplay Indicator - Outside Phone */}
          <div className="absolute top-8 right-8 z-30">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              {isAutoPlaying ? (
                <span className="text-2xl">⏸️</span>
              ) : (
                <span className="text-2xl">▶️</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for scroll height - Tutorial text is now beside phone */}
      <div style={{ height: `${(steps.length - 1) * 100}vh` }}></div>
    </div>
  );
}
