import { motion } from 'framer-motion';

/**
 * Phone Frame Component
 * Displays content inside a realistic phone mockup
 */
export default function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Screen Bezel */}
        <div className="bg-black rounded-[2.5rem] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
          
          {/* Screen */}
          <div className="relative bg-white rounded-[2rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-900 to-gray-800 z-20 flex items-center justify-between px-6 text-white text-xs">
              <div className="flex items-center gap-1">
                <span>9:41</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="w-6 h-3 border border-white rounded-sm">
                  <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="h-full pt-12 overflow-hidden relative">
              {children}
            </div>
            
            {/* Home Indicator (for iPhone) */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Volume Buttons */}
        <div className="absolute left-0 top-24 w-1 h-12 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute left-0 top-40 w-1 h-12 bg-gray-800 rounded-l-lg"></div>
        
        {/* Power Button */}
        <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-r-lg"></div>
      </div>
    </div>
  );
}

