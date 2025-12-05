import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import PhoneInput from '@/components/auth/PhoneInput';
import Button from '@/components/ui/Button';
import api from '@/lib/api';

export default function PhonePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  
  const handleSubmit = async (phoneNumber) => {
    try {
      setLoading(true);
      await api.sendOTP(phoneNumber);
      setPhone(phoneNumber);
      router.push({
        pathname: '/auth/verify',
        query: { phone: phoneNumber }
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
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
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Masukkan Nombor Telefon
          </h1>
          <p className="text-gray-600">
            Kami akan menghantar kod OTP melalui WhatsApp
          </p>
        </motion.div>
        
        <PhoneInput onSubmit={handleSubmit} loading={loading} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            size="sm"
          >
            ← Kembali
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

