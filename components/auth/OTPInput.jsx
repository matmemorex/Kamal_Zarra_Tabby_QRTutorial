import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OTPInput({ onComplete, loading, onResend }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;
    
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
    
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
          Masukkan Kod OTP
        </label>
        <div className="flex gap-3 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="w-14 h-16 text-center text-2xl font-bold border-2 border-beige-300 rounded-xl focus:border-beige-600 focus:outline-none focus:ring-2 focus:ring-beige-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-white"
            />
          ))}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mt-3 text-center"
          >
            {error}
          </motion.p>
        )}
      </div>
      
      <div className="text-center space-y-3">
        {timeLeft > 0 ? (
          <p className="text-sm text-gray-600">
            Kod akan tamat dalam: <span className="font-semibold text-beige-700">{formatTime(timeLeft)}</span>
          </p>
        ) : (
          <p className="text-sm text-red-600 font-semibold">
            Kod telah tamat tempoh
          </p>
        )}
        
        {onResend && (
          <button
            onClick={onResend}
            disabled={timeLeft > 0 || loading}
            className="text-beige-700 hover:text-beige-800 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Hantar semula OTP
          </button>
        )}
      </div>
    </motion.div>
  );
}

