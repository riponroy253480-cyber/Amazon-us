
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Correct credentials per user request
    if (username === 'Ripon123#@' && password === '258963@@$$') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 px-4 bg-white min-h-screen">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
        alt="Amazon" 
        className="w-28 mb-8"
      />
      <div className="border border-gray-300 rounded p-6 w-full max-w-sm">
        <h1 className="text-2xl font-medium mb-4">Sign in</h1>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Username</label>
            <input 
              type="text" 
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:border-yellow-600 focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:border-yellow-600 focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded shadow transition font-medium border border-yellow-500"
          >
            Continue
          </button>
        </form>
        <p className="text-xs mt-6 text-gray-600">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>
    </div>
  );
};

export default Login;
