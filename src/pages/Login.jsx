import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login logic
    login({ id: 1, name: 'John Doe', email });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Link to="/" className="text-3xl font-bold tracking-tight mb-6">
        IGNIVANCE<span className="text-[#FF6A00]">.</span>
      </Link>

      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-medium mb-4 text-gray-900">Sign in</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Email or mobile phone number</label>
            <input 
              required
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#FF6A00] focus:border-[#FF6A00]" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1 flex justify-between">
              Password
              <span className="text-blue-600 font-normal hover:text-[#FF6A00] hover:underline cursor-pointer">Forgot your password?</span>
            </label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#FF6A00] focus:border-[#FF6A00]" 
            />
          </div>
          <button type="submit" className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-2 font-medium shadow-sm transition-transform active:scale-95">
            Continue
          </button>
        </form>

        <p className="text-xs text-gray-700 mt-4 leading-relaxed">
          By continuing, you agree to IGNIVANCE's <span className="text-blue-600 hover:text-[#FF6A00] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:text-[#FF6A00] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        <div className="flex items-center mt-6">
          <div className="border-t border-gray-300 flex-1"></div>
          <span className="text-xs text-gray-500 px-2">New to IGNIVANCE?</span>
          <div className="border-t border-gray-300 flex-1"></div>
        </div>

        <Link to="/register">
          <button className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg py-2 font-medium mt-4 shadow-sm transition">
            Create your IGNIVANCE account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
