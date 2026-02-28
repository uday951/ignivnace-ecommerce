import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group"
    >
      <Link to={`/product/${product.id}`} className="relative bg-white pt-4 pb-2 px-4 flex justify-center items-center h-48 sm:h-56">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-900 font-medium text-sm sm:text-base line-clamp-2 hover:text-[#FF6A00]">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mt-2 space-x-1">
          <div className="flex text-[#FF6A00]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(product.rating) ? "text-[#FF6A00]" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-blue-600 ml-1">{product.rating}</span>
        </div>

        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-lg font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-2 px-4 text-sm font-medium transition flex items-center justify-center space-x-2 shadow-sm"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
