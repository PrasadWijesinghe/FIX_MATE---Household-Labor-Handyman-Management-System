import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const DeliveryRegister = () => {
  const [form, setForm] = useState({
    name: '',
    rate: '',
    operatingArea: '',
    islandWide: false,
    phone: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + '/api/delivery/register',
        {
          name: form.name,
          rate: form.rate,
          operatingArea: form.islandWide ? 'Island Wide' : form.operatingArea,
          phone: form.phone,
          email: form.email,
          password: form.password
        },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/deliverylogin');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-white px-2">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/')} 
          className="mb-3 text-green-600 hover:underline flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-2">
          FixMate
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Register as a Delivery Driver
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Delivery Rate (USD per delivery)</label>
            <input
              type="number"
              name="rate"
              min="0"
              value={form.rate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter your delivery rate"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Operating Area</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                name="islandWide"
                checked={form.islandWide}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-600">Island Wide Service</label>
            </div>
            {!form.islandWide && (
              <input
                type="text"
                name="operatingArea"
                value={form.operatingArea}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Enter your operating area (e.g., Colombo, Kandy, Galle)"
                required={!form.islandWide}
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
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
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition mt-2"
          >
            Register as Delivery Driver
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/deliverylogin">
          <span className="text-green-600 hover:underline cursor-pointer">
            Sign in here
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DeliveryRegister;
