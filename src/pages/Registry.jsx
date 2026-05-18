import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';

const Registry = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh]">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Wedding & Custom Registry</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition">
            <h2 className="text-xl font-bold mb-2 text-[#FF6A00]">Create a Registry</h2>
            <p className="text-gray-600 mb-4">Start your registry planning and prepare for your special event with IGNIVANCE's massive catalog of items.</p>
            <button className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-2 px-6 font-medium transition shadow-sm">
              Get Started
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition">
            <h2 className="text-xl font-bold mb-2 text-[#FF6A00]">Find a Registry</h2>
            <p className="text-gray-600 mb-4">Search for a friend or family member's registry using their name or specific registry ID.</p>
            <div className="flex">
               <input type="text" placeholder="Search by name" className="flex-1 border rounded-l-md px-3 py-2 outline-none" />
               <button className="bg-gray-800 text-white rounded-r-md px-4 font-bold">Search</button>
            </div>
          </div>
        </div>
        <EmptyState 
          title="Manage Your Registries" 
          desc="You currently do not have any active registries connected to your account."
          actionText="Explore Items"
          actionLink="/products"
        />
      </div>
    </div>
  );
};

export default Registry;
