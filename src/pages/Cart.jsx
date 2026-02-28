import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-3xl font-bold mb-6 pb-4 border-b">Shopping Cart</h1>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Your IGNIVANCE Cart is empty.</h2>
                <Link to="/products" className="text-blue-600 hover:text-[#FF6A00] font-medium hover:underline">
                  Shop today's deals
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b last:border-0 last:pb-0">
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 flex items-center justify-center p-2 rounded border">
                      <img src={item.images[0]} alt={item.title} className="max-h-full object-contain mix-blend-multiply" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="text-lg font-medium text-gray-900 line-clamp-2 hover:text-[#FF6A00] hover:underline">
                              {item.title}
                            </h3>
                          </Link>
                          <span className="text-lg font-bold">
                            ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-green-600 mb-2">In Stock</p>
                        <p className="text-sm text-gray-500 mb-4">Eligible for FREE Shipping</p>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <select 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="border border-gray-300 rounded shadow-sm px-2 py-1 outline-none focus:ring-1 focus:ring-[#FF6A00] bg-gray-50"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                          ))}
                        </select>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-blue-600 hover:text-[#FF6A00] hover:underline flex items-center space-x-1"
                        >
                           <Trash2 size={16} />
                           <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {cart.length > 0 && (
              <div className="text-right mt-6">
                 <p className="text-xl font-medium">
                   Subtotal ({cartCount} item{cartCount > 1 ? 's' : ''}): <span className="font-bold">${cartTotal.toFixed(2)}</span>
                 </p>
              </div>
            )}
          </div>
        </div>

        {/* Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-24">
              <div className="mb-4">
                <span className="flex items-center text-green-700 text-sm font-medium mb-1">
                  <span className="bg-green-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs mr-2">✓</span>
                  Part of your order qualifies for FREE Delivery.
                </span>
              </div>
              
              <h3 className="text-lg font-medium mb-6 mt-4">
                Subtotal ({cartCount} item{cartCount > 1 ? 's' : ''}): <br/>
                <span className="text-2xl font-bold block mt-1">${cartTotal.toFixed(2)}</span>
              </h3>
              
              <Link to="/checkout" className="block w-full">
                <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-3 px-4 font-medium transition shadow-sm">
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
