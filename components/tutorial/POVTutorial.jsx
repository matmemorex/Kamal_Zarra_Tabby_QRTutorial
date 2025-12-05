import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import PhoneFrame from './PhoneFrame';
import TutorialTextContent from './TutorialTextContent';

/**
 * POV Tutorial Component
 * - Scroll-controlled tutorial using anime.js timeline
 * - Steps change based on scroll position
 * - Uses seek() method to sync animations with scroll
 */
export default function POVTutorial({ steps = [] }) {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize timeline and scroll handler
  useEffect(() => {
    if (!steps.length || !containerRef.current) return;

    // Create master timeline with autoplay: false
    const masterTimeline = anime.timeline({
      autoplay: false,
      easing: 'easeOutCubic',
    });

    // Calculate timing for each step
    const stepDuration = 2000; // Duration for each step transition
    const textElementDelay = 300; // Delay between text elements within a step
    const phoneDelay = 200; // Delay for phone content
    const stepTransitionDuration = 400; // Duration for step fade in/out

    // Set initial state: hide all steps and text elements
    steps.forEach((step, stepIndex) => {
      // Hide step containers and set pointer-events to none
      const stepContainers = containerRef.current.querySelectorAll(`[data-step="${stepIndex}"]`);
      stepContainers.forEach((el) => {
        anime.set(el, { opacity: 0 });
        el.style.pointerEvents = 'none';
        el.style.visibility = stepIndex === 0 ? 'visible' : 'hidden';
      });

      // Hide text elements within each step
      const textElements = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"] [data-text-element]`
      );
      textElements.forEach((el) => {
        anime.set(el, { opacity: 0, y: 30 });
      });

      // Hide phone content
      const phoneContent = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"][data-phone-content]`
      );
      phoneContent.forEach((el) => {
        anime.set(el, { opacity: 0, scale: 0.9 });
      });

      // Initialize phone text to empty for step 1
      if (stepIndex === 1) {
        const phoneTextElements = containerRef.current.querySelectorAll(
          `[data-step="${stepIndex}"][data-phone-content] [data-phone-text]`
        );
        phoneTextElements.forEach((el) => {
          el.textContent = '';
        });
      }

      // Initialize OTP text and boxes for step 2
      if (stepIndex === 2) {
        const otpTextElement = containerRef.current.querySelector(
          `[data-step="${stepIndex}"][data-phone-content] #otpText`
        );
        if (otpTextElement) {
          otpTextElement.textContent = '------';
        }
        
        // Clear all OTP boxes
        for (let i = 1; i <= 6; i++) {
          const box = containerRef.current.querySelector(
            `[data-step="${stepIndex}"][data-phone-content] #d${i}`
          );
          if (box) {
            box.textContent = '';
            box.classList.remove('filled', 'bg-beige-200', 'border-beige-500');
          }
        }
      }
    });

    // Add animations for each step
    steps.forEach((step, stepIndex) => {
      const stepStartTime = stepIndex * stepDuration;
      
      // Hide previous step containers before showing current one
      if (stepIndex > 0) {
        const prevStepContainers = containerRef.current.querySelectorAll(`[data-step="${stepIndex - 1}"]`);
        prevStepContainers.forEach((el) => {
          // Fade out previous step at the start of current step
          masterTimeline.add(
            {
              targets: el,
              opacity: [1, 0],
              duration: stepTransitionDuration,
              easing: 'easeInCubic',
              complete: () => {
                el.style.pointerEvents = 'none';
                el.style.visibility = 'hidden';
              },
            },
            stepStartTime
          );
        });
      }

      // Animate current step container appearing
      const stepContainers = containerRef.current.querySelectorAll(`[data-step="${stepIndex}"]`);
      stepContainers.forEach((el) => {
        // Show and enable pointer events, then fade in
        el.style.visibility = 'visible';
        masterTimeline.add(
          {
            targets: el,
            opacity: [0, 1],
            duration: stepTransitionDuration,
            easing: 'easeOutCubic',
            begin: () => {
              el.style.pointerEvents = 'auto';
            },
          },
          stepStartTime + stepTransitionDuration / 2
        );
      });

      // Animate text elements sequentially within each step
      const textElementOrder = ['icon', 'title', 'description', 'details-container'];
      let textElementTime = stepStartTime + 200; // Start text animations slightly after container

      // Icon animation
      const iconElements = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"] [data-text-element="icon"]`
      );
      iconElements.forEach((el) => {
        masterTimeline.add(
          {
            targets: el,
            opacity: [0, 1],
            y: [30, 0],
            duration: 600,
            easing: 'easeOutCubic',
          },
          textElementTime
        );
      });
      textElementTime += textElementDelay;

      // Title animation
      const titleElements = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"] [data-text-element="title"]`
      );
      titleElements.forEach((el) => {
        masterTimeline.add(
          {
            targets: el,
            opacity: [0, 1],
            y: [30, 0],
            duration: 600,
            easing: 'easeOutCubic',
          },
          textElementTime
        );
      });
      textElementTime += textElementDelay;

      // Description animation
      const descriptionElements = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"] [data-text-element="description"]`
      );
      descriptionElements.forEach((el) => {
        masterTimeline.add(
          {
            targets: el,
            opacity: [0, 1],
            y: [30, 0],
            duration: 600,
            easing: 'easeOutCubic',
          },
          textElementTime
        );
      });
      textElementTime += textElementDelay;

      // Details container animation
      const detailsContainers = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"] [data-text-element="details-container"]`
      );
      detailsContainers.forEach((el) => {
        masterTimeline.add(
          {
            targets: el,
            opacity: [0, 1],
            y: [30, 0],
            duration: 600,
            easing: 'easeOutCubic',
          },
          textElementTime
        );
      });
      textElementTime += textElementDelay;

      // Animate individual detail items sequentially
      if (step.details) {
        step.details.forEach((detail, detailIndex) => {
          const detailElements = containerRef.current.querySelectorAll(
            `[data-step="${stepIndex}"] [data-text-element="detail-${detailIndex}"]`
          );
          detailElements.forEach((el) => {
            masterTimeline.add(
              {
                targets: el,
                opacity: [0, 1],
                x: [-20, 0],
                duration: 500,
                easing: 'easeOutCubic',
              },
              textElementTime + detailIndex * 150
            );
          });
        });
        textElementTime += step.details.length * 150;
      }

      // Indicator animation
      const indicatorElements = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"] [data-text-element="indicator"]`
      );
      indicatorElements.forEach((el) => {
        masterTimeline.add(
          {
            targets: el,
            opacity: [0, 1],
            y: [20, 0],
            duration: 500,
            easing: 'easeOutCubic',
          },
          textElementTime
        );
      });

      // Animate phone content
      const phoneContent = containerRef.current.querySelectorAll(
        `[data-step="${stepIndex}"][data-phone-content]`
      );
      phoneContent.forEach((el) => {
        masterTimeline.add(
          {
            targets: el,
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 700,
            easing: 'easeOutCubic',
          },
          stepStartTime + phoneDelay
        );
      });

      // Add typing animation for phone number (step index 1 - "Enter Phone Number")
      if (stepIndex === 1) {
        const phoneNumber = '12-3456789';
        const phoneTextElements = containerRef.current.querySelectorAll(
          `[data-step="${stepIndex}"][data-phone-content] [data-phone-text]`
        );
        
        phoneTextElements.forEach((phoneTextElement) => {
          // Initialize phone text to empty
          phoneTextElement.textContent = '';
          
          // Add typing animation using custom object animation
          masterTimeline.add(
            {
              targets: { chars: 0 },
              chars: phoneNumber.length,
              round: 1,
              duration: 700,
              easing: 'linear',
              update: (anim) => {
                const count = Math.floor(anim.animations[0].currentValue);
                if (phoneTextElement) {
                  phoneTextElement.textContent = phoneNumber.substring(0, count);
                }
              },
            },
            stepStartTime + phoneDelay + 500 // Start after phone content appears
          );
        });
      }

      // Add OTP typing animation (step index 2 - "Verify OTP")
      if (stepIndex === 2) {
        const otpCode = '738294';
        const otpTextElement = containerRef.current.querySelector(
          `[data-step="${stepIndex}"][data-phone-content] #otpText`
        );
        
        // Initialize OTP text and boxes
        if (otpTextElement) {
          otpTextElement.textContent = '------';
        }
        
        // Clear all OTP boxes
        for (let i = 1; i <= 6; i++) {
          const box = containerRef.current.querySelector(
            `[data-step="${stepIndex}"][data-phone-content] #d${i}`
          );
          if (box) {
            box.textContent = '';
            box.classList.remove('filled');
          }
        }

        // First: Show OTP in WhatsApp message with dashes
        if (otpTextElement) {
          masterTimeline.add(
            {
              targets: { chars: 0 },
              chars: 6,
              round: 1,
              duration: 100,
              easing: 'linear',
              update: (anim) => {
                const count = Math.floor(anim.animations[0].currentValue);
                if (otpTextElement) {
                  // Show dashes for unrevealed, digits for revealed
                  const display = otpCode.substring(0, count) + '------'.substring(count);
                  otpTextElement.textContent = display;
                }
              },
            },
            stepStartTime + phoneDelay + 500 // Start after phone content appears
          );
        }

        // Second: Fill the input boxes one by one from left to right
        masterTimeline.add(
          {
            targets: { filled: 0 },
            filled: 6,
            round: 1,
            duration: 480, // 80ms per digit × 6 digits
            easing: 'linear',
            update: (anim) => {
              const count = Math.floor(anim.animations[0].currentValue);
              
              // Update each box based on current count
              for (let i = 1; i <= 6; i++) {
                const box = containerRef.current.querySelector(
                  `[data-step="${stepIndex}"][data-phone-content] #d${i}`
                );
                if (box) {
                  if (i <= count) {
                    box.textContent = otpCode[i - 1];
                    box.classList.add('filled');
                    box.classList.add('bg-beige-200');
                    box.classList.add('border-beige-500');
                  } else {
                    box.textContent = '';
                    box.classList.remove('filled');
                    box.classList.remove('bg-beige-200');
                    box.classList.remove('border-beige-500');
                  }
                }
              }
            },
          },
          stepStartTime + phoneDelay + 600 // Start after WhatsApp message (100ms + 500ms delay)
        );
      }
    });

    // Store timeline reference
    timelineRef.current = masterTimeline;

    // Scroll handler
    function onScroll() {
      const scrollTop = window.scrollY;
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const containerTop = scrollContainer.offsetTop;
      const containerHeight = scrollContainer.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress relative to container (0 to 1)
      // When scrollTop reaches containerTop, progress starts
      // When scrollTop reaches containerTop + containerHeight - viewportHeight, progress ends
      const scrollStart = containerTop;
      const scrollEnd = containerTop + containerHeight - viewportHeight;
      const scrollRange = scrollEnd - scrollStart;
      
      let scrollProgress = 0;
      if (scrollRange > 0) {
        scrollProgress = Math.max(0, Math.min(1, (scrollTop - scrollStart) / scrollRange));
      }

      // Update current step based on scroll progress
      const stepIndex = Math.floor(scrollProgress * steps.length);
      const clampedStepIndex = Math.max(0, Math.min(steps.length - 1, stepIndex));
      
      // Ensure only the current step is visible
      steps.forEach((step, idx) => {
        const stepContainers = containerRef.current?.querySelectorAll(`[data-step="${idx}"]`);
        stepContainers?.forEach((el) => {
          if (idx === clampedStepIndex) {
            el.style.visibility = 'visible';
            el.style.pointerEvents = 'auto';
          } else {
            el.style.visibility = 'hidden';
            el.style.pointerEvents = 'none';
          }
        });
      });

      // Seek timeline to scroll position
      if (masterTimeline.duration) {
        masterTimeline.seek(scrollProgress * masterTimeline.duration);
      }

      setCurrentStep((prevStep) => {
        if (clampedStepIndex !== prevStep) {
          return clampedStepIndex;
        }
        return prevStep;
      });
    }

    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (masterTimeline) {
        masterTimeline.pause();
      }
    };
  }, [steps]);

  return (
    <div 
      ref={scrollContainerRef}
      className="scroll-container relative"
      style={{ height: `${steps.length * 700}vh` }} // 700vh per step for smooth scrolling
    >
      {/* Fixed Viewport - Content stays fixed while scrolling */}
      <div 
        ref={containerRef}
        className="fixed-viewport fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 overflow-hidden z-20"
      >
        <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 gap-8 lg:gap-12">
          {/* Tutorial Text - Beside Phone (Left Side on desktop, Top on mobile) */}
          <div className="flex-1 max-w-lg lg:pr-8 z-10 order-2 lg:order-1 relative h-full">
            {steps.map((step, index) => (
              <div
                key={index}
                data-step={index}
                className="absolute inset-0 flex items-center justify-center h-full"
              >
                <div className="w-full">
                  <TutorialTextContent
                    step={step}
                    stepIndex={index}
                    currentStep={currentStep}
                    totalSteps={steps.length}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Static Phone Frame - Center/Right */}
          <PhoneFrame className="w-full max-w-sm flex-shrink-0 relative z-10 order-1 lg:order-2">
            {/* Content inside phone changes per step */}
            {steps.map((step, index) => (
              <div
                key={index}
                data-step={index}
                data-phone-content
                className="absolute inset-0 h-full w-full"
              >
                {step?.povComponent || (
                  <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
                    <div className="text-6xl mb-4">{step?.icon || '📱'}</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      {step?.title || 'Step ' + (index + 1)}
                    </h2>
                    <p className="text-gray-600 text-base text-center">
                      {step?.description || 'POV Content'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </PhoneFrame>

          {/* Progress Indicator - Outside Phone */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'w-8 bg-beige-700' : 'w-2 bg-beige-400'
                }`}
                style={{
                  opacity: index === currentStep ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
