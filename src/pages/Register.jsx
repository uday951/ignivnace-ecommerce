import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    login({ id: 1, name, email });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Link to="/" className="text-3xl font-bold tracking-tight mb-6">
        IGNIVANCE<span className="text-[#FF6A00]">.</span>
      </Link>

      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-medium mb-4 text-gray-900">Create account</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Your name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and last name"
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#FF6A00] focus:border-[#FF6A00]" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Mobile number or email</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#FF6A00] focus:border-[#FF6A00]" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#FF6A00] focus:border-[#FF6A00]" 
            />
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-blue-500 mr-1 text-lg leading-none">ℹ</span> Passwords must be at least 6 characters.
            </p>
          </div>
          <button type="submit" className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-2 font-medium shadow-sm transition-transform active:scale-95">
            Verify email
          </button>
        </form>

        <p className="text-xs text-gray-700 mt-4 leading-relaxed">
          By creating an account, you agree to IGNIVANCE's <span className="text-blue-600 hover:text-[#FF6A00] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:text-[#FF6A00] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        <div className="mt-6 pt-4 border-t border-gray-300 text-sm">
          <p>
            Already have an account? 
            <Link to="/login" className="text-blue-600 hover:text-[#FF6A00] hover:underline ml-1 font-medium flex items-center inline-flex">
              Sign in <span>▶</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
