import { useState } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { dummyProducts } from '../services/dummyData';

const Products = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredProducts = filter === 'All' 
    ? dummyProducts 
    : dummyProducts.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filter */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Category</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {['All', 'Electronics', 'Fashion', 'Appliances', 'Mobiles'].map(cat => (
                  <li key={cat}>
                    <label className="flex items-center space-x-2 cursor-pointer hover:text-[#FF6A00]">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={filter === cat}
                        onChange={() => setFilter(cat)}
                        className="text-[#FF6A00] focus:ring-[#FF6A00]" 
                      />
                      <span>{cat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Customer Reviews</h4>
              <ul className="space-y-2 text-sm text-yellow-500">
                <li><button className="flex items-center hover:text-[#FF6A00]">⭐⭐⭐⭐ & Up</button></li>
                <li><button className="flex items-center hover:text-[#FF6A00]">⭐⭐⭐ & Up</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <span className="font-medium text-gray-700">1-{filteredProducts.length} of {dummyProducts.length} results</span>
            <select className="border-gray-300 rounded-md text-sm outline-none px-2 py-1 shadow-sm border focus:border-[#FF6A00]">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Avg. Customer Review</option>
            </select>
          </div>
          
          <div className="bg-transparent rounded-lg">
             <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
