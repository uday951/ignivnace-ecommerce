import { useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cartCount } = useCart();
  const controls = useAnimation();

  useEffect(() => {
    const handleBounce = () => {
      controls.start({
        scale: [1, 1.2, 0.9, 1.1, 1],
        transition: { duration: 0.4 }
      });
    };

    document.addEventListener('cart-bounce', handleBounce);
    
    return () => {
      document.removeEventListener('cart-bounce', handleBounce);
    };
  }, [controls]);

  return (
    <Link to="/cart" className="flex items-center relative hover:text-[#FF6A00] transition" id="cart-icon-target">
      <motion.div animate={controls} className="relative flex items-center justify-center">
        <ShoppingCart size={28} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#FF6A00] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
             {cartCount}
          </span>
        )}
      </motion.div>
      <span className="hidden md:block ml-2 font-semibold">Cart</span>
    </Link>
  );
};

export default CartIcon;
