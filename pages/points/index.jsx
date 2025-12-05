import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import api from '@/lib/api';
import { formatNumber, formatDate } from '@/lib/utils';

export default function PointsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPoints();
  }, []);
  
  const fetchPoints = async () => {
    try {
      const result = await api.getPoints();
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
  
  const { currentBalance, transactions } = data;
  
  const getSourceIcon = (source) => {
    const icons = {
      product_registration: '📦',
      profile_completion: '✅',
      referral: '👥',
      birthday_bonus: '🎂',
      review: '⭐',
      redemption: '🎁',
    };
    return icons[source] || '💰';
  };
  
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
          <h1 className="text-2xl font-bold">Points</h1>
        </div>
      </motion.div>
      
      {/* Balance Card */}
      <div className="max-w-md mx-auto px-6 mt-6">
        <ScrollReveal
          direction="up"
          delay={0.1}
          ease="inOut(3)"
          duration={0.8}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center mb-6"
        >
          <p className="text-gray-600 mb-2">Baki Semasa</p>
          <p className="text-5xl font-bold text-beige-700 mb-4">
            {formatNumber(currentBalance)}
          </p>
          <p className="text-sm text-gray-500">Points</p>
        </ScrollReveal>
        
        {/* Transactions */}
        <ScrollReveal
          direction="up"
          delay={0.2}
          ease="inOut(3)"
          duration={0.8}
          className="bg-white rounded-3xl p-6 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sejarah Transaksi</h2>
          
          {transactions && transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-beige-50 to-beige-100 rounded-xl"
                >
                  <div className="text-3xl">{getSourceIcon(transaction.source)}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{formatNumber(Math.abs(transaction.amount))}
                    </p>
                    <p className="text-xs text-gray-500">
                      Baki: {formatNumber(transaction.balanceAfter)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600">Tiada transaksi lagi</p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}

