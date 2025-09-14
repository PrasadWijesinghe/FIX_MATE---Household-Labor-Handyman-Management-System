import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp';
import Register from './pages/Register';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import ResendOtp from './pages/ResendOtp';
import AdminDashboard from './admin/AdminDashboard';
import DashboardMain from './admin/DashboardMain';
import Users from './admin/Users';
import Vendors from './admin/Vendors';
import Suppliers from './admin/Suppliers';
import Products from './admin/Products';
import Services from './admin/Services';
import VendorDashboard from './vendor/VendorDashboard';
<<<<<<< HEAD
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';

=======
import SupplierDashboard from './supplier/SupplierDashboard';
>>>>>>> 79f409618789639b7f30a96ab1adcad8b0f8b566

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resend-otp" element={<ResendOtp />} />

<<<<<<< HEAD
  <Route path="/signup" element={<SignUp />} />
  <Route path="/register" element={<Register/>} />
  <Route path="/email-verify" element={<EmailVerify />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  
=======
        <Route path="/vendor" element={<VendorDashboard />}>
          <Route index element={<DashboardMain />} />
          <Route path="orders" element={<div className='p-8 text-white text-xl'>Available Orders Page</div>} />
          <Route path="ongoing" element={<div className='p-8 text-white text-xl'>Ongoing Orders Page</div>} />
          <Route path="previous" element={<div className='p-8 text-white text-xl'>Previous Orders Page</div>} />
          <Route path="revenue" element={<div className='p-8 text-white text-xl'>Revenue Page</div>} />
          <Route path="profile" element={<div className='p-8 text-white text-xl'>Profile Page</div>} />
        </Route>
>>>>>>> 79f409618789639b7f30a96ab1adcad8b0f8b566

        <Route path="/supplier" element={<SupplierDashboard />}>
          <Route index element={<div className='p-8 text-white text-xl'>Supplier Dashboard Home</div>} />
          <Route path="orders" element={<div className='p-8 text-white text-xl'>Orders</div>} />
          <Route path="previous" element={<div className='p-8 text-white text-xl'>Previous Orders</div>} />
          <Route path="availableProducts" element={<div className='p-8 text-white text-xl'>Products</div>} />
          <Route path="addProducts" element={<div className='p-8 text-white text-xl'>Add New Products</div>} />
          <Route path="revenue" element={<div className='p-8 text-white text-xl'>Revenue</div>} />
          <Route path="profile" element={<div className='p-8 text-white text-xl'>Profile</div>} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardMain />} />
          <Route path="users" element={<Users />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;