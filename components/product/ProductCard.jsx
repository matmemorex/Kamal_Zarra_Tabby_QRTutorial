import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  if (!product) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="bg-white rounded-3xl p-6 shadow-2xl overflow-hidden"
    >
      {product.image && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-beige-50 to-beige-100"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
        <p className="text-lg text-beige-700 font-semibold mb-4">{product.variant}</p>
        
        {product.category && (
          <span className="inline-block px-3 py-1 bg-beige-100 text-beige-700 rounded-full text-sm font-medium mb-4">
            {product.category}
          </span>
        )}
        
        {product.retailPrice && (
          <p className="text-3xl font-bold text-gray-900">
            RM {product.retailPrice.toFixed(2)}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

