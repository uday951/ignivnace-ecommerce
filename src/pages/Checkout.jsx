import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', address: '', city: '', zip: '', cardName: '', cardNumber: '', expiry: '', cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/dashboard');
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 flex-col">
        <h2 className="text-2xl font-bold mb-4">You have no items in checkout.</h2>
        <Link to="/products" className="text-white bg-[#FF6A00] px-6 py-2 rounded font-bold hover:bg-[#e65c00]">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 pb-4 border-b">
        <Link to="/" className="text-3xl font-bold tracking-tight">
          IGNIVANCE<span className="text-[#FF6A00]">.</span>
        </Link>
        <span className="text-2xl text-gray-700 font-medium">Checkout (<span className="text-blue-600">{cartCount} items</span>)</span>
        <div className="w-10"></div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Side - Forms */}
        <div className="flex-1 space-y-6">
          
          {/* Shipping Address */}
          <div className={`bg-white p-6 rounded-xl border ${step === 1 ? 'border-[#FF6A00] shadow-md' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold flex items-center ${step === 1 ? 'text-[#FF6A00]' : 'text-gray-900'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white ${step === 1 ? 'bg-[#FF6A00]' : 'bg-gray-500'}`}>1</span>
                Shipping address
              </h2>
              {step > 1 && <button onClick={() => setStep(1)} className="text-blue-600 text-sm hover:underline">Change</button>}
            </div>
            
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4 pl-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none" />
                  </div>
                </div>
                <button type="submit" className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-2 px-6 font-medium mt-4 shadow-sm">
                  Use this address
                </button>
              </form>
            )}
            {step > 1 && (
              <div className="pl-11 text-sm text-gray-700 pb-2">
                <p>{formData.fullName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.zip}</p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className={`bg-white p-6 rounded-xl border ${step === 2 ? 'border-[#FF6A00] shadow-md' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold flex items-center ${step === 2 ? 'text-[#FF6A00]' : 'text-gray-900'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white ${step === 2 ? 'bg-[#FF6A00]' : 'bg-gray-400'}`}>2</span>
                Payment method
              </h2>
              {step > 2 && <button onClick={() => setStep(2)} className="text-blue-600 text-sm hover:underline">Change</button>}
            </div>
            
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="space-y-4 pl-11">
                <div className="border border-green-500 rounded-lg p-4 bg-green-50 mb-4 border-l-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" checked readOnly className="text-green-600" />
                    <span className="font-bold text-gray-900">Credit or debit card</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
                  <input required name="cardName" value={formData.cardName} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                  <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] outline-none" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration date</label>
                    <input required name="expiry" value={formData.expiry} onChange={handleInputChange} type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input required name="cvv" value={formData.cvv} onChange={handleInputChange} type="text" placeholder="123" className="w-full border border-gray-300 rounded p-2 focus:ring-[#FF6A00] outline-none" />
                  </div>
                </div>

                <div className="pt-4 border-t mt-6">
                  <button type="submit" className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-3 px-8 font-bold text-lg shadow-md w-full sm:w-auto transition-transform active:scale-95">
                    Place your order
                  </button>
                  <p className="text-xs text-gray-500 mt-2">By placing your order, you agree to IGNIVANCE's privacy notice and conditions of use.</p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6 text-sm">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total before tax:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax:</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-[#B12704] text-xl font-bold">
                <span>Order total:</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
