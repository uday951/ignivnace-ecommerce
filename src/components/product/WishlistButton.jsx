import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

const WishlistButton = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className={`p-2 rounded-full absolute top-2 right-2 bg-white shadow-md transition-transform hover:scale-110 z-10 ${
        isWished ? 'text-red-500' : 'text-gray-400'
      }`}
    >
      <Heart size={20} fill={isWished ? 'currentColor' : 'none'} />
    </button>
  );
};

export default WishlistButton;
