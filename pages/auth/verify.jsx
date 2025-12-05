import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import OTPInput from '@/components/auth/OTPInput';
import Button from '@/components/ui/Button';
import api from '@/lib/api';
import { normalizePhone } from '@/lib/utils';

export default function VerifyPage() {
  const router = useRouter();
  const { phone } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!phone) {
      router.push('/auth/phone');
    }
  }, [phone, router]);
  
  const handleVerify = async (otp) => {
    try {
      setLoading(true);
      setError('');
      
      const productToken = typeof window !== 'undefined' 
        ? sessionStorage.getItem('productToken') 
        : null;
      
      const normalizedPhone = normalizePhone(phone);
      const data = await api.verifyOTP(normalizedPhone, otp, productToken);
      
      if (data.success) {
        // Clear product token
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('productToken');
        }
        
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Kod OTP tidak sah. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResend = async () => {
    try {
      setLoading(true);
      setError('');
      await api.sendOTP(phone);
    } catch (err) {
      setError(err.message || 'Gagal menghantar OTP. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!phone) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sahkan Kod OTP
          </h1>
          <p className="text-gray-600">
            Kod telah dihantar ke WhatsApp anda
          </p>
          <p className="text-sm text-beige-700 font-semibold mt-2">
            {phone}
          </p>
        </motion.div>
        
        <OTPInput
          onComplete={handleVerify}
          loading={loading}
          onResend={handleResend}
        />
        
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center"
          >
            {error}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/auth/phone')}
            size="sm"
          >
            ← Tukar nombor telefon
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

