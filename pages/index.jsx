import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-8xl mb-6"
        >
          👗
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold mb-4"
        >
          Tabby Loyalty
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl opacity-90 mb-8"
        >
          Daftar produk anda dan kumpul points!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Button
            onClick={() => router.push('/dashboard')}
            size="lg"
            className="w-full"
          >
            Masuk ke Dashboard
          </Button>
          
          <Button
            onClick={() => router.push('/tutorial')}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            📚 Lihat Tutorial
          </Button>
          
          <p className="text-sm opacity-75">
            Imbas kod QR pada produk Tabby anda untuk mula
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

