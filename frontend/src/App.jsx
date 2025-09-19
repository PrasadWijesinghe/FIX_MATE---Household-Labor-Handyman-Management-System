import UserProfile from './pages/UserProfile';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp';
import Register from './pages/Register';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';

import AdminDashboard from './admin/AdminDashboard';
import DashboardMain from './admin/DashboardMain';
import Users from './admin/Users';
import Vendors from './admin/Vendors';
import Suppliers from './admin/Suppliers';
import Products from './admin/Products';
import Services from './admin/Services';
import Adminlogin from './admin/Adminlogin';
import VendorDashboard from './vendor/VendorDashboard';
import VendorProfile from './vendor/Profile';
import AvailableOrders from './vendor/AvailableOrders';
import OngoingOrders from './vendor/OngoingOrders';
import PreviousOrders from './vendor/PreviousOrders';
import { VendorContextProvider } from './Context/VendorContext';
import SupplierDashboard from './supplier/SupplierDashboard';
import { SupplierContextProvider } from './Context/SupplierContext';

import VendorLogin from './vendor/VendorLogin';
import VendorRegister from './vendor/VendorRegister';

import SupplierLogin from './supplier/SupplierLogin';
import SupplierRegister from './supplier/SupplierRegister';
import SupplierProfile from './supplier/SupplierProfile';
import AddProducts from './supplier/AddProducts';
import AvailableProducts from './supplier/AvailableProducts';

import AllServicesPage from './pages/Services/AllServicesPage';
import ServicesCard from './pages/Services/ServicesCard';
import VendorCard from './pages/Services/VendorCard';
import VendorsByCategory from './pages/Services/VendorsByCategory';
import VendorCardDynamic from './pages/Services/VendorCardDynamic';


const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
  <Routes>
  <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />

  <Route path='/AllServicesPage' element={<AllServicesPage />} />
  <Route path='/ServicesCard' element={<ServicesCard />} />
  <Route path='/VendorCard' element={<VendorCard />} />
  <Route path='/services/category/:category' element={<VendorsByCategory />} />
  <Route path='/services/category/vendor/:id' element={<VendorCardDynamic />} />


        <Route path="/vendorlogin" element={<VendorLogin />} />
        <Route path="/vendorregister" element={<VendorRegister />} />

        <Route path="/vendor" element={
          <VendorContextProvider>
            <VendorDashboard />
          </VendorContextProvider>
        }>
          <Route index element={<AvailableOrders />} />
          <Route path="orders" element={<AvailableOrders />} />
          <Route path="ongoing" element={<OngoingOrders />} />
          <Route path="previous" element={<PreviousOrders />} />
          <Route path="revenue" element={<div className='p-8 text-white text-xl'>Revenue Page</div>} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>

        <Route path="/supplierlogin" element={<SupplierLogin />} />
        <Route path="/supplierregister" element={<SupplierRegister />} />

        <Route path="/supplier" element={
          <SupplierContextProvider>
            <SupplierDashboard />
          </SupplierContextProvider>
        }>
          <Route index element={<div className='p-8 text-white text-xl'>Orders</div>} />
          <Route path="orders" element={<div className='p-8 text-white text-xl'>Orders</div>} />
          <Route path="previous" element={<div className='p-8 text-white text-xl'>Previous Orders</div>} />
          <Route path="availableProducts" element={<AvailableProducts />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="revenue" element={<div className='p-8 text-white text-xl'>Revenue</div>} />
          <Route path="profile" element={<SupplierProfile />} />
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