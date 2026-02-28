import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="hover:bg-gray-700 bg-gray-800 text-center py-4 cursor-pointer transition">
        <a href="#" className="text-sm font-semibold">Back to top</a>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4">Get to Know Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">About IGNIVANCE</a></li>
            <li><a href="#" className="hover:underline">Investor Relations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Make Money with Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Sell products on IGNIVANCE</a></li>
            <li><a href="#" className="hover:underline">Sell on IGNIVANCE Business</a></li>
            <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">IGNIVANCE Payment Products</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Business Card</a></li>
            <li><a href="#" className="hover:underline">Shop with Points</a></li>
            <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Let Us Help You</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">IGNIVANCE and COVID-19</a></li>
            <li><a href="#" className="hover:underline">Your Account</a></li>
            <li><a href="#" className="hover:underline">Your Orders</a></li>
            <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
            <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 py-8 text-center">
        <div className="flex justify-center items-center space-x-8 mb-4">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            IGNIVANCE<span className="text-[#FF6A00]">.</span>
          </Link>
          <div className="border border-gray-500 rounded px-3 py-1 text-sm flex items-center">
            English
          </div>
          <div className="border border-gray-500 rounded px-3 py-1 text-sm flex items-center">
            $ USD
          </div>
        </div>
        <p className="text-sm text-gray-400">© 2026 IGNIVANCE. Shop Smart. Live Better.</p>
      </div>
    </footer>
  );
};

export default Footer;
