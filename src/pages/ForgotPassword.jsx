import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Link to="/" className="text-3xl font-bold tracking-tight mb-6">
        IGNIVANCE<span className="text-[#FF6A00]">.</span>
      </Link>

      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-medium mb-4 text-gray-900">Password assistance</h1>
        
        {submitted ? (
          <div className="text-green-700 font-medium">
            <p className="mb-4">We've sent an email with instructions to reset your password.</p>
            <Link to="/login" className="text-blue-600 hover:text-[#FF6A00] hover:underline">Return to sign in</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-700 mb-4">Enter the email address or mobile phone number associated with your IGNIVANCE account.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">Email or mobile number</label>
                <input 
                  required
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#FF6A00] focus:border-[#FF6A00]" 
                />
              </div>
              <button type="submit" className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-2 font-medium shadow-sm transition-transform active:scale-95">
                Continue
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
