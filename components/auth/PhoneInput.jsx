import { useState } from 'react';
import { motion } from 'framer-motion';
import { validatePhone } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function PhoneInput({ onSubmit, loading }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^\d-]/g, '');
    setPhone(value);
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!phone.trim()) {
      setError('Sila masukkan nombor telefon');
      return;
    }
    
    if (!validatePhone(phone)) {
      setError('Format nombor telefon tidak sah');
      return;
    }
    
    try {
      await onSubmit(phone);
    } catch (err) {
      setError(err.message || 'Ralat berlaku. Sila cuba lagi.');
    }
  };
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombor Telefon
        </label>
        <div className="flex gap-3">
          <div className="bg-gradient-to-br from-beige-500 to-beige-700 text-white px-4 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center min-w-[80px]">
            +60
          </div>
          <input
            type="tel"
            value={phone}
            onChange={handleChange}
            placeholder="12-3456789"
            className="flex-1 px-4 py-4 border-2 border-beige-200 rounded-xl focus:border-beige-500 focus:outline-none focus:ring-2 focus:ring-beige-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={loading}
            autoFocus
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-2 flex items-center gap-2"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </motion.p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Kami akan menghantar kod OTP melalui WhatsApp
        </p>
      </div>
      
      <Button
        type="submit"
        loading={loading}
        className="w-full"
        size="lg"
      >
        Hantar OTP
      </Button>
    </motion.form>
  );
}

