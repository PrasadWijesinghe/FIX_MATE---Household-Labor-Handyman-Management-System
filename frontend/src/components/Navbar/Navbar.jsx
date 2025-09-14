import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const { userData, isLoggedin, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="py-5 flex justify-between items-center px-10 bg-white shadow-md">
      
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src={assets.logo} alt="logo" className="w-24" />
      </div>

      
      <ul className="flex list-none gap-5 text-black text-xs">
        <li onClick={() => setMenu("home")}
            className={`cursor-pointer pb-0.5 transition-all ${menu === "home" ? "border-b-2 border-blue-600" : "hover:border-b-2 hover:border-blue-600"}`}>HOME</li>
        <li onClick={() => setMenu("about")}
            className={`cursor-pointer pb-0.5 transition-all ${menu === "about" ? "border-b-2 border-blue-600" : "hover:border-b-2 hover:border-blue-600"}`}>ABOUT</li>
        <li onClick={() => setMenu("services")}
            className={`cursor-pointer pb-0.5 transition-all ${menu === "services" ? "border-b-2 border-blue-600" : "hover:border-b-2 hover:border-blue-600"}`}>SERVICES</li>
        <li onClick={() => setMenu("store")}
            className={`cursor-pointer pb-0.5 transition-all ${menu === "store" ? "border-b-2 border-blue-600" : "hover:border-b-2 hover:border-blue-600"}`}>STORE</li>
        <li onClick={() => setMenu("contact")}
            className={`cursor-pointer pb-0.5 transition-all ${menu === "contact" ? "border-b-2 border-blue-600" : "hover:border-b-2 hover:border-blue-600"}`}>CONTACT</li>
      </ul>

     
      {isLoggedin && userData ? (
        <div className='relative group'>
          <div className='rounded-full bg-black text-white w-14 h-14 flex items-center justify-center font-bold text-2xl transition-all duration-200 cursor-pointer'>
            {userData.name && userData.name[0] ? userData.name[0].toUpperCase() : "U"}
          </div>
          <div className='absolute hidden group-hover:block top-full right-0 mt-2 z-10 bg-white text-black rounded shadow-lg'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className='px-2 py-1 hover:bg-gray-200 cursor-pointer'>Verify Email</li>
              )}
              <li onClick={logout} className='px-2 py-1 hover:bg-gray-200 cursor-pointer pr-10'>Log Out</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          
          <Link to="/signup">
            <button className="bg-blue-600 text-white text-xs border border-blue-600 px-5 py-2 rounded-full cursor-pointer transition hover:bg-black hover:text-white">
              GET STARTED
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar;
