import Modal from "../ui/Modal";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const QuickViewModal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick View">
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50 rounded-xl border">
          <img src={product.images[0]} alt={product.title} className="max-h-64 object-contain mix-blend-multiply" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h2>
          <div className="text-[#FF6A00] flex mb-2">
            {'★'.repeat(Math.round(product.rating))} {/* Replace with RatingStars later */}
          </div>
          <p className="text-2xl font-bold mb-4">${(product.price * (1 - product.discount/100)).toFixed(2)}</p>
          <p className="text-sm text-gray-600 mb-6 line-clamp-3">{product.description}</p>
          
          <div className="mt-auto space-y-3">
            <button
              onClick={() => { addToCart(product); onClose(); }}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-3 font-semibold shadow-sm transition"
            >
              Add to Cart
            </button>
            <Link to={`/product/${product.id}`} className="block">
              <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg py-3 font-medium transition text-center">
                View Full Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
