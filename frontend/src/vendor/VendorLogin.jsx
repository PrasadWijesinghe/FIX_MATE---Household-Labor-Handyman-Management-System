import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const VendorLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-white px-2">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">
          FixMate
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Sign in to your account
        </p>

        <form className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your email"
              required
            />
          </div>

          
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your password"
              required
            />
          </div>

      
          <div className="flex items-center justify-between text-sm mt-1 mb-2">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

 
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/vendorregister">
          <span className="text-blue-600 hover:underline cursor-pointer">
            Sign up here
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VendorLogin
