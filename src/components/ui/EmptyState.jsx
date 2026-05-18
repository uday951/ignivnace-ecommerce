import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = ({ title = "No items found", desc = "Start exploring our collection.", actionText = "Go Shopping", actionLink = "/products" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border-2 border-dashed border-gray-300 bg-white">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <ShoppingCart size={48} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{desc}</p>
      {actionText && (
        <Link to={actionLink}>
          <button className="bg-[#FF6A00] hover:bg-[#e65c00] text-white px-6 py-2 rounded-lg font-bold transition shadow-sm">
            {actionText}
          </button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
