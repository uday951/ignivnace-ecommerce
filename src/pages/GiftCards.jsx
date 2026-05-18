import EmptyState from '../components/ui/EmptyState';

const GiftCards = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh]">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
         <h1 className="text-3xl font-bold mb-6 text-gray-900">IGNIVANCE Gift Cards</h1>
         <p className="max-w-xl mx-auto text-gray-600 mb-8">Give the gift of choice. IGNIVANCE gift cards are redeemable towards millions of items storewide.</p>
         
         <div className="flex justify-center gap-6 mb-12 flex-wrap">
            {['$25', '$50', '$100', 'Custom'].map((val) => (
              <div key={val} className="w-32 h-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-md flex items-center justify-center font-bold text-xl cursor-pointer hover:scale-105 transition-transform border-b-4 border-[#FF6A00]">
                 {val}
              </div>
            ))}
         </div>

         <EmptyState 
            title="Redeem a currently un-used Gift Card" 
            desc="Enter your claim code to apply the balance strictly to your account."
            actionText="Redeem Now"
            actionLink="#"
         />
      </div>
    </div>
  );
};

export default GiftCards;
