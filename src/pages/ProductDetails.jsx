import { useParams } from 'react-router-dom';
import { ShoppingCart, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { dummyProducts } from '../services/dummyData';
import { useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);

  const product = dummyProducts.find(p => p.id === id);

  if (!product) return <div className="p-20 text-center text-2xl font-bold">Product not found.</div>;

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left: Images */}
        <div className="w-full md:w-1/2 flex gap-4">
          <div className="w-20 flex flex-col gap-2">
            {product.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${product.title} ${idx}`} 
                onClick={() => setActiveImg(idx)}
                className={`w-full h-20 object-cover rounded-md border-2 cursor-pointer ${activeImg === idx ? 'border-[#FF6A00]' : 'border-transparent hover:border-gray-300'}`}
              />
            ))}
          </div>
          <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden">
            <img 
              src={product.images[activeImg] || product.images[0]} 
              alt={product.title} 
              className="max-w-full max-h-[500px] object-contain hover:scale-110 transition-transform duration-500 cursor-zoom-in"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-blue-600 font-medium mb-4 hover:underline cursor-pointer">Visit the Store</p>
          
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex text-[#FF6A00]">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  className={i < Math.floor(product.rating) ? "text-[#FF6A00]" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-blue-600 hover:text-[#FF6A00] hover:underline cursor-pointer">{product.reviews.length} ratings</span>
          </div>

          <hr className="mb-4 border-gray-300" />
          
          <div className="mb-6">
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-medium text-red-600">-{product.discount}%</span>
              <span className="text-4xl font-bold text-gray-900">
                <span className="text-xl align-top">$</span>{discountedPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              List Price: <span className="line-through">${product.price.toFixed(2)}</span>
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 text-center bg-gray-50 p-2 rounded-lg border">
              <ShieldCheck className="mx-auto text-green-600 mb-1" size={24} />
              <span className="text-xs font-semibold text-blue-600">Secure transaction</span>
            </div>
            <div className="flex-1 text-center bg-gray-50 p-2 rounded-lg border">
              <Truck className="mx-auto text-blue-600 mb-1" size={24} />
              <span className="text-xs font-semibold text-blue-600">IGNIVANCE Delivered</span>
            </div>
            <div className="flex-1 text-center bg-gray-50 p-2 rounded-lg border">
              <RefreshCcw className="mx-auto text-purple-600 mb-1" size={24} />
              <span className="text-xs font-semibold text-blue-600">30-day Return</span>
            </div>
          </div>

          <hr className="mb-4 border-gray-300" />

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">About this item</h3>
            <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>
          </div>

          {/* Buying Actions */}
          <div className="mt-auto bg-white border border-gray-300 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-4 text-green-700">In Stock.</h3>
            
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-3 px-4 font-medium transition mb-3 flex items-center justify-center space-x-2"
            >
               <ShoppingCart size={20} />
               <span>Add to Cart</span>
            </button>
            <button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] rounded-full py-3 px-4 font-medium transition">
              Buy Now
            </button>

            <div className="mt-4 text-sm text-gray-600 flex justify-between">
              <span>Ships from</span>
              <span className="font-medium text-gray-900">IGNIVANCE</span>
            </div>
            <div className="mt-1 text-sm text-gray-600 flex justify-between">
              <span>Sold by</span>
              <span className="font-medium text-gray-900">IGNIVANCE Services LLC</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-16 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 border-b pb-4">Customer Reviews</h2>
        {product.reviews.map((rev, idx) => (
          <div key={idx} className="mb-6 pb-6 border-b last:border-0">
             <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                  {rev.user[0]}
                </div>
                <span className="font-medium text-gray-900">{rev.user}</span>
             </div>
             <div className="flex items-center mb-2">
                <div className="flex text-[#FF6A00]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < rev.rating ? "currentColor" : "none"} 
                      className={i < rev.rating ? "text-[#FF6A00]" : "text-gray-300"}
                    />
                  ))}
                </div>
             </div>
             <p className="text-gray-800">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
