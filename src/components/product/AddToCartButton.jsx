import { useState } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/useToast';
import { flyToCart } from '../../utils/cartAnimations';

const AddToCartButton = ({ product, className, size = 'md' }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [status, setStatus] = useState('idle');

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== 'idle') return;

    setStatus('loading');

    setTimeout(() => {
      addToCart(product, false); // false to avoid default toast in context if needed
      setStatus('success');
      showToast('Product successfully added', 'success');
      flyToCart(e, product.images[0]);

      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 400); 
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      disabled={status !== 'idle'}
      className={`rounded-full py-2 px-4 shadow-sm text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
        status === 'success' 
          ? 'bg-[#22C55E] text-white border-[#22C55E]' 
          : 'bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border border-[#FCD200]'
      } ${className || (size === 'lg' ? 'w-full py-3 text-lg font-bold' : 'w-full')}`}
    >
      {status === 'idle' && (
        <>
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </>
      )}
      {status === 'loading' && (
        <>
           <Loader2 size={16} className="animate-spin" />
           <span>Adding...</span>
        </>
      )}
      {status === 'success' && (
        <>
           <Check size={16} />
           <span>✔ Added</span>
        </>
      )}
    </motion.button>
  );
};

export default AddToCartButton;
