import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, User, MapPin, Heart } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'Your Orders', icon: Package },
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'address', label: 'Your Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-bold">
        Please sign in to view your dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 text-left px-4 py-4 text-sm font-medium border-b last:border-b-0 transition ${activeTab === tab.id ? 'bg-[#FF6A00] text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF6A00]'}`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[400px]">
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
                <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg">You have no pending orders.</p>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
                <div className="max-w-md">
                   <div className="mb-4">
                     <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                     <input type="text" className="w-full border rounded p-2 text-gray-900 bg-gray-50" defaultValue={user.name} />
                   </div>
                   <div className="mb-4">
                     <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                     <input type="email" className="w-full border rounded p-2 text-gray-900 bg-gray-50" defaultValue={user.email} />
                   </div>
                   <button className="bg-[#FF6A00] text-white px-4 py-2 rounded font-bold hover:bg-[#e65c00]">
                     Save Changes
                   </button>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                    <span className="text-4xl leading-none mb-2">+</span>
                    <span className="font-bold">Add Address</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
                <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                  <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg">Your wishlist is currently empty.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
