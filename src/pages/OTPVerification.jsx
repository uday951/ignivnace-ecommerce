import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length > 3) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Link to="/" className="text-3xl font-bold tracking-tight mb-6">
        IGNIVANCE<span className="text-[#FF6A00]">.</span>
      </Link>

      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-medium mb-4 text-gray-900">Authentication required</h1>
        <p className="text-sm text-gray-700 mb-4">
          For your security, we need to verify your identity. We've sent a 6-digit code to your email.
        </p>
        
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Enter OTP</label>
            <input 
              required
              type="text" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 text-center tracking-widest text-lg font-bold outline-none focus:ring-1 focus:ring-[#FF6A00] focus:border-[#FF6A00]" 
              placeholder="000000"
            />
          </div>
          <button type="submit" className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-2 font-medium shadow-sm transition-transform active:scale-95">
            Submit code
          </button>
        </form>

        <p className="text-xs text-blue-600 hover:text-[#FF6A00] hover:underline mt-4 cursor-pointer text-center">
          Resend code
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
