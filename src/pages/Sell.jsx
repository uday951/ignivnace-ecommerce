import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';

const Sell = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
       <div className="bg-[#111827] text-white p-12 text-center rounded-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FF6A00]"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Become an IGNIVANCE Partner</h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-8">Reach millions of customers, build your brand, and dramatically increase your sales when you sell with IGNIVANCE.</p>
          <button className="bg-[#FF6A00] hover:bg-[#e65c00] transition px-8 py-4 font-bold rounded-full text-lg shadow-xl shadow-orange-500/20">Sign up to selling</button>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {['Access to Prime Customers', 'Global Fulfillment Network', 'Robust Ad Services'].map((f, i) => (
             <div key={i} className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center hover:border-[#FF6A00] transition-colors">
                 <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-gray-400 mb-4">{i + 1}</div>
                 <h3 className="text-lg font-bold mb-2">{f}</h3>
                 <p className="text-sm text-gray-600">Join the world's most trusted online marketplace and gain immediate access to these benefits.</p>
             </div>
          ))}
       </div>

       <EmptyState 
         title="No Selling Accounts linked" 
         desc="You currently do not have a Seller Central account tied to this email."
         actionText="Open Dashboard"
         actionLink="/dashboard"
       />
    </div>
  );
};

export default Sell;
