import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
const LoginPage = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if loginId and password match
    if (loginId === 'admin' && password === 'password') {
      // Successful login, navigate to /admin
      navigate('/admin', { state: {input:true } });
    } else {
      // Invalid credentials, show error and navigate to homepage
      setError(true);
      setTimeout(() => {
        setError(false);
        navigate('/')
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="w-4/5 mx-auto">
      <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-center text-orange-500">Notices</h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={()=>navigate('/')}
          >
            General Notices
          </button>
        </div>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Login ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-4"
            >
              Login
            </button>
          </div>
        </form>
        {error && (
          <div className="bg-red-500 text-white font-semibold py-2 px-4 rounded mt-4">
            Invalid credentials. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
