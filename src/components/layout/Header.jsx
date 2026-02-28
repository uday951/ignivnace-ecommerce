import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#111827] text-white">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden p-1 hover:text-[#FF6A00] transition"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="text-2xl font-bold tracking-tight">
            IGNIVANCE<span className="text-[#FF6A00]">.</span>
          </Link>
        </div>

        {/* Search Bar - Desktop hidden on mobile */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div className="flex w-full">
            <select className="bg-gray-100 text-gray-800 px-3 py-2 rounded-l-md border-r outline-none text-sm">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
            </select>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full px-4 py-2 text-gray-900 outline-none"
            />
            <button className="bg-[#FF6A00] px-6 py-2 rounded-r-md hover:bg-[#e65c00] transition flex items-center justify-center">
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex flex-col">
            <span className="text-xs text-gray-300">Hello, {user ? user.name : 'Sign in'}</span>
            {user ? (
              <button onClick={logout} className="font-semibold text-sm hover:text-[#FF6A00]">Log out</button>
            ) : (
              <Link to="/login" className="font-semibold text-sm hover:text-[#FF6A00]">Account & Lists</Link>
            )}
          </div>
          
          <Link to="/dashboard" className="hidden md:flex flex-col hover:text-[#FF6A00]">
            <span className="text-xs text-gray-300">Returns</span>
            <span className="font-semibold text-sm">& Orders</span>
          </Link>

          <Link to="/cart" className="flex items-center relative hover:text-[#FF6A00] transition">
            <div className="relative">
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6A00] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:block ml-2 font-semibold">Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="flex w-full">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full px-4 py-2 text-gray-900 rounded-l-md outline-none"
          />
          <button className="bg-[#FF6A00] px-4 py-2 rounded-r-md hover:bg-[#e65c00] transition flex items-center justify-center">
            <Search size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="bg-gray-800 px-4 py-2 hidden md:flex items-center space-x-6 text-sm">
        <button className="flex items-center hover:border-white border border-transparent p-1 rounded font-medium">
          <Menu size={16} className="mr-1" /> All
        </button>
        <Link to="/products" className="hover:border-white border border-transparent p-1 rounded">Today's Deals</Link>
        <Link to="/products" className="hover:border-white border border-transparent p-1 rounded">Customer Service</Link>
        <Link to="/products" className="hover:border-white border border-transparent p-1 rounded">Registry</Link>
        <Link to="/products" className="hover:border-white border border-transparent p-1 rounded">Gift Cards</Link>
        <Link to="/products" className="hover:border-white border border-transparent p-1 rounded">Sell</Link>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white text-gray-900 h-full shadow-xl">
            <div className="bg-[#111827] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User size={24} />
                <span className="font-bold text-lg">Hello, {user ? user.name : 'Sign in'}</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <h3 className="font-bold text-lg mb-4">Trending</h3>
              <ul className="space-y-4">
                <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link></li>
                <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>New Releases</Link></li>
                <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Movers & Shakers</Link></li>
              </ul>
              <div className="border-t my-4"></div>
              <h3 className="font-bold text-lg mb-4">Shop By Department</h3>
              <ul className="space-y-4">
                <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Electronics</Link></li>
                <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Computers</Link></li>
                <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Smart Home</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
