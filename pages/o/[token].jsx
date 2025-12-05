import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import BenefitsList from '@/components/product/BenefitsList';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { easings } from '@/hooks/useScrollAnimation';
import api from '@/lib/api';

export default function QRLandingPage() {
  const router = useRouter();
  const { token } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!token) return;
    fetchProduct();
  }, [token]);
  
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(token);
      
      if (!data.success) {
        setError(data.error || 'Produk tidak dijumpai');
        return;
      }
      
      setProduct(data.product);
    } catch (err) {
      setError(err.message || 'Gagal memuatkan produk');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('productToken', token);
    }
    router.push('/auth/phone');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <Loading size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ralat</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/')} variant="primary">
            Kembali ke Laman Utama
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 p-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-white mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Selamat Datang!</h1>
            <p className="text-xl opacity-90">Tabby Loyalty</p>
          </motion.div>
          
          {/* Product Card */}
          <ScrollReveal
            direction="up"
            delay={0.2}
            ease="inOut(3)"
            duration={0.8}
          >
            <ProductCard product={product} />
          </ScrollReveal>
          
          {/* Benefits */}
          <ScrollReveal
            direction="up"
            delay={0.1}
            ease="inOut(3)"
            duration={0.8}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl"
          >
            <h3 className="font-bold text-xl mb-4 text-gray-900">Daftar & Dapat:</h3>
            <BenefitsList
              points={product?.pointsValue}
              entries={product?.luckyDrawEntries}
            />
          </ScrollReveal>
          
          {/* CTA Button */}
          <ScrollReveal
            direction="up"
            delay={0.2}
            ease="inOut(3)"
            duration={0.8}
          >
            <Button
              onClick={handleRegister}
              className="w-full"
              size="lg"
            >
              Daftar dengan Nombor Telefon
            </Button>
          </ScrollReveal>
        </motion.div>
      </div>
    </div>
  );
}

