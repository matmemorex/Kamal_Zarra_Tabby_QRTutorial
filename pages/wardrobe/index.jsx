import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';

export default function WardrobePage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchWardrobe();
  }, []);
  
  const fetchWardrobe = async () => {
    try {
      const result = await api.getWardrobe();
      setData(result);
    } catch (error) {
      if (error.status === 401) {
        router.push('/auth/phone');
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
        <Loading size="lg" />
      </div>
    );
  }
  
  if (!data) return null;
  
  const { products } = data;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg text-white p-6"
      >
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-white hover:bg-white/20"
          >
            ←
          </Button>
          <h1 className="text-2xl font-bold">Digital Wardrobe</h1>
        </div>
      </motion.div>
      
      {/* Products List */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {products && products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product, index) => (
              <ScrollReveal
                key={product.id}
                direction="up"
                delay={index * 0.1}
                ease="inOut(3)"
                duration={0.7}
                className="bg-white rounded-3xl p-6 shadow-2xl"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-beige-700 font-semibold mb-4">{product.variant}</p>
                
                {product.warranty && (
                  <div className="p-4 bg-blue-50 rounded-xl mb-4">
                    <p className="text-sm text-gray-600 mb-1">Waranti</p>
                    <p className="font-semibold text-gray-900">
                      {product.warranty.status === 'active' ? '✅ Aktif' : '❌ Tamat'}
                    </p>
                    {product.warranty.expiresAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Tamat: {formatDate(product.warranty.expiresAt)}
                      </p>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  Didaftar: {formatDate(product.registeredAt)}
                </p>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-8 text-center"
          >
            <div className="text-6xl mb-4">👗</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tiada Produk Lagi</h3>
            <p className="text-gray-600 mb-6">
              Daftar produk pertama anda dengan mengimbas kod QR!
            </p>
            <Button onClick={() => router.push('/')} variant="primary">
              Imbas QR Code
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

