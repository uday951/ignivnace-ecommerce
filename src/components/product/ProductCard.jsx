import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import WishlistButton from './WishlistButton';
import QuickViewModal from './QuickViewModal';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-gray-300 group relative"
      >
        <WishlistButton product={product} />

        <div className="relative bg-white pt-4 pb-2 px-4 flex justify-center items-center h-48 sm:h-56 overflow-hidden">
          <Link to={`/product/${product.id}`} className="absolute inset-0 z-0"></Link>
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 z-0"
          />
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
              {product.discount}% OFF
            </span>
          )}
          
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <button
               onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsQuickViewOpen(true); }}
               className="bg-white text-gray-900 rounded-full px-4 py-2 font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all pointer-events-auto hover:bg-[#FF6A00] hover:text-white"
            >
               <Eye size={18} /> Quick View
            </button>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-1 z-10 bg-white">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-gray-900 font-medium text-sm sm:text-base line-clamp-2 hover:text-[#FF6A00] transition-colors">
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
            <span className="text-xs text-blue-600 ml-1 hover:underline cursor-pointer">{product.rating}</span>
          </div>

          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-lg font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="mt-auto pt-4 relative z-20">
            <AddToCartButton product={product} />
          </div>
        </div>
      </motion.div>

      <QuickViewModal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} product={product} />
    </>
  );
};

export default ProductCard;
