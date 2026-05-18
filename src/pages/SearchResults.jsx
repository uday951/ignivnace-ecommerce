import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { dummyProducts } from '../services/dummyData';
import EmptyState from '../components/ui/EmptyState';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate remote search
    setTimeout(() => {
      const filtered = dummyProducts.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 600);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">
        {results.length} results for <span className="text-[#FF6A00]">"{query}"</span>
      </h2>
      
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <SkeletonLoader count={5} type="card" />
        </div>
      ) : results.length > 0 ? (
         <ProductGrid products={results} />
      ) : (
         <EmptyState 
            title="No Results Found" 
            desc={`We couldn't find any matches for "${query}". Try checking your spelling or using more general terms.`} 
            actionText="Clear Search"
         />
      )}
    </div>
  );
};

export default SearchResults;
