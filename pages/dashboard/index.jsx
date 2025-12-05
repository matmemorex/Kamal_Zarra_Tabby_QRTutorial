import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import StatsCard from '@/components/dashboard/StatsCard';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import api from '@/lib/api';
import { formatNumber } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDashboard();
  }, []);
  
  const fetchDashboard = async () => {
    try {
      const result = await api.getDashboard();
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
  
  if (!data) {
    return null;
  }
  
  const { user, stats, recentProducts, activeDraws } = data;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg text-white p-6 pb-12"
      >
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Selamat datang, {user.fullName || user.phone}!
          </h1>
          <p className="opacity-90 text-lg">Tier: {stats.tier}</p>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="max-w-md mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ScrollReveal direction="up" delay={0.1} ease="inOut(3)" duration={0.6}>
            <StatsCard
              icon="⭐"
              label="Total Points"
              value={formatNumber(stats.totalPoints)}
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15} ease="inOut(3)" duration={0.6}>
            <StatsCard
              icon="👗"
              label="Produk"
              value={stats.productsOwned}
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2} ease="inOut(3)" duration={0.6}>
            <StatsCard
              icon="🎲"
              label="Lucky Draw"
              value={stats.luckyDrawEntries}
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.25} ease="inOut(3)" duration={0.6}>
            <StatsCard
              icon="🏆"
              label="Tier"
              value={stats.tier}
            />
          </ScrollReveal>
        </div>
        
        {/* Recent Products */}
        {recentProducts && recentProducts.length > 0 && (
          <ScrollReveal
            direction="up"
            delay={0.1}
            ease="inOut(3)"
            duration={0.8}
            className="bg-white rounded-3xl p-6 shadow-2xl mb-6"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900">Produk Terkini</h2>
            <div className="space-y-3">
              {recentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-beige-50 to-beige-100 rounded-xl"
                >
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.variant}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Didaftar: {new Date(product.registeredAt).toLocaleDateString('ms-MY')}
                  </p>
                </motion.div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.push('/wardrobe')}
            >
              Lihat Semua Produk →
            </Button>
          </ScrollReveal>
        )}
        
        {/* Active Draws */}
        {activeDraws && activeDraws.length > 0 && (
          <ScrollReveal
            direction="up"
            delay={0.2}
            ease="inOut(3)"
            duration={0.8}
            className="bg-white rounded-3xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900">Lucky Draw Aktif</h2>
            <div className="space-y-3">
              {activeDraws.map((draw, index) => (
                <motion.div
                  key={draw.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-beige-500 to-beige-600 rounded-xl text-white"
                >
                  <p className="font-bold text-lg mb-1">{draw.name}</p>
                  <p className="text-sm opacity-90">
                    Entri anda: {draw.myEntries} / {formatNumber(draw.totalEntries)} total
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        )}
        
        {/* Navigation */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push('/wardrobe')}
            className="w-full"
          >
            👗 Wardrobe
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/points')}
            className="w-full"
          >
            ⭐ Points
          </Button>
        </div>
      </div>
    </div>
  );
}

