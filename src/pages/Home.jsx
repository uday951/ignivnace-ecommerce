import { dummyProducts } from '../services/dummyData';
import ProductGrid from '../components/product/ProductGrid';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-[#111827] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Banner" 
            className="w-full h-[500px] object-cover opacity-60 mix-blend-overlay"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
              Shop Smart. <span className="text-[#FF6A00]">Live Better.</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-300 mb-8">
              Discover unparalleled premium tech and elegant fashion delivered right to your doorstep. IGNIVANCE offers the ultimate shopping experience.
            </p>
            <button className="bg-[#FF6A00] hover:bg-[#e65c00] text-white px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Shop Deals of the Day
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto -mt-32 relative z-30 mb-20 px-4 sm:px-0">
        
        {/* Categories Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {['Electronics', 'Fashion', 'Appliances', 'Mobiles'].map((category, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={category} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
              <div className="bg-gray-50 h-32 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-400 font-medium">Explore {category}</span>
              </div>
              <span className="text-sm font-semibold text-blue-600 hover:text-[#FF6A00] hover:underline">
                Shop now
              </span>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
          <ProductGrid products={dummyProducts.slice(0, 5)} title="Featured Products" />
        </div>

        {/* Deals of the Day */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
          <ProductGrid products={dummyProducts.filter(p => p.discount > 0).slice(0, 5)} title="Deals of the Day" />
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#111827] py-16 text-center text-white border-b-8 border-[#FF6A00]">
        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-400 mb-6">Get the latest updates on new products and upcoming sales.</p>
        <div className="max-w-md mx-auto flex">
          <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 rounded-l-md text-gray-900 outline-none" />
          <button className="bg-[#FF6A00] px-6 py-3 rounded-r-md font-bold hover:bg-[#e65c00] transition">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
