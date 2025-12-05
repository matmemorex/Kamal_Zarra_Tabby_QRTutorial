import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Tutorial Text Content - Displays beside the phone
 * Animations are handled by anime.js in parent component
 */
export default function TutorialTextContent({ step, stepIndex, currentStep, totalSteps }) {
  const iconRef = useRef(null);
  
  if (!step) return null;

  // Animate icon floating effect (only when this step is active)
  useEffect(() => {
    if (iconRef.current && stepIndex === currentStep) {
      const floatAnimation = anime({
        targets: iconRef.current,
        translateY: [0, -10, 0],
        duration: 2000,
        easing: 'easeInOutQuad',
        loop: true,
      });
      
      return () => {
        floatAnimation.pause();
      };
    }
  }, [stepIndex, currentStep]);

  return (
    <div className="text-white flex flex-col items-center justify-center text-center w-full">
      {/* Icon */}
      <div 
        ref={iconRef}
        data-text-element="icon"
        className="text-5xl lg:text-6xl mb-4 lg:mb-6"
      >
        {step.icon || '📚'}
      </div>

      {/* Title */}
      <h3 
        data-text-element="title"
        className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 drop-shadow-lg leading-tight"
      >
        {step.title}
      </h3>

      {/* Description */}
      <p 
        data-text-element="description"
        className="text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 leading-relaxed drop-shadow-md"
      >
        {step.text}
      </p>

      {/* Details List */}
      {step.details && (
        <div 
          data-text-element="details-container"
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full"
        >
          <ul className="space-y-4 text-left">
            {step.details.map((detail, i) => (
              <li
                key={i}
                data-text-element={`detail-${i}`}
                className="flex items-start gap-3 text-white/90 text-base lg:text-lg"
              >
                <span className="text-beige-300 text-2xl font-bold">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step Indicator */}
      <div 
        data-text-element="indicator"
        className="mt-8 flex items-center gap-2 w-full"
      >
        <span className="text-white/70 text-sm serif">
          Step {stepIndex + 1} of {totalSteps}
        </span>
        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-beige-300 rounded-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

