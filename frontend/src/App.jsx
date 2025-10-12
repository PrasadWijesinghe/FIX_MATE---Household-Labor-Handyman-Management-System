<<<<<<< HEAD
import SupplyStore from './pages/SupplyStore';
import ProductCardDynamic from './pages/ProductCardDynamic';
import UserProfile from './pages/UserProfile';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ServiceBookingPage from './pages/ServiceBookingPage';
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
import DeliveryDrivers from './admin/DeliveryDrivers';
import Adminlogin from './admin/Adminlogin';
import VendorDashboard from './vendor/VendorDashboard';
import VendorProfile from './vendor/Profile';
import VendorAvailableOrders from './vendor/AvailableOrders';
import SupplierAvailableOrders from './supplier/AvailableOrders';
import SupplierPreviousOrders from './supplier/PreviousOrders';
import SupplierWaitingOrders from './supplier/WaitingOrders';
import OngoingOrders from './vendor/OngoingOrders';
import PreviousOrders from './vendor/PreviousOrders';
import Revenue from './vendor/Revenue';
import VendorReviews from './vendor/Reviews';
import SupplierReviews from './supplier/Reviews';
import SupplierRevenue from './supplier/Revenue';
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

import DeliveryLogin from './delivery/DeliveryLogin';
import DeliveryRegister from './delivery/DeliveryRegister';
import DeliveryDashboard from './delivery/DeliveryDashboard';
import DeliveryContextProvider from './Context/DeliveryContext';
import DeliveryAvailableOrders from './delivery/AvailableOrders';
import DeliveryOngoingOrders from './delivery/OngoingOrders';
import DeliveryPreviousOrders from './delivery/PreviousOrders';
import DeliveryRevenue from './delivery/Revenue';
import DeliveryProfile from './delivery/Profile';
import DeliveryNotices from './delivery/Notices';
import VendorNotices from './vendor/Notices';
import SupplierNotices from './supplier/Notices';

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
  <Route path="/supplystore" element={<SupplyStore />} />
  <Route path="/product/:id" element={<ProductCardDynamic />} />
  <Route path="/booking" element={<BookingPage />} />
  <Route path="/payment" element={<PaymentPage />} />
  <Route path="/service-booking" element={<ServiceBookingPage />} />
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
          <Route index element={<VendorAvailableOrders />} />
          <Route path="orders" element={<VendorAvailableOrders />} />
          <Route path="ongoing" element={<OngoingOrders />} />
          <Route path="previous" element={<PreviousOrders />} />
          <Route path="notices" element={<VendorNotices />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="reviews" element={<VendorReviews />} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>

        <Route path="/supplierlogin" element={<SupplierLogin />} />
        <Route path="/supplierregister" element={<SupplierRegister />} />

        <Route path="/deliverylogin" element={<DeliveryLogin />} />
        <Route path="/deliveryregister" element={<DeliveryRegister />} />

        <Route path="/supplier" element={
          <SupplierContextProvider>
            <SupplierDashboard />
          </SupplierContextProvider>
        }>
          <Route index element={<SupplierAvailableOrders />} />
          <Route path="orders" element={<SupplierAvailableOrders />} />
          <Route path="waiting" element={<SupplierWaitingOrders />} />
          <Route path="previous" element={<SupplierPreviousOrders />} />
          <Route path="notices" element={<SupplierNotices />} />
          <Route path="availableProducts" element={<AvailableProducts />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="revenue" element={<SupplierRevenue />} />
          <Route path="reviews" element={<SupplierReviews />} />
          <Route path="profile" element={<SupplierProfile />} />
        </Route>

        <Route path="/delivery" element={
          <DeliveryContextProvider>
            <DeliveryDashboard />
          </DeliveryContextProvider>
        }>
          <Route index element={<DeliveryAvailableOrders />} />
          <Route path="orders" element={<DeliveryAvailableOrders />} />
          <Route path="ongoing" element={<DeliveryOngoingOrders />} />
          <Route path="previous" element={<DeliveryPreviousOrders />} />
          <Route path="notices" element={<DeliveryNotices />} />
          <Route path="revenue" element={<DeliveryRevenue />} />
          <Route path="profile" element={<DeliveryProfile />} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardMain />} />
          <Route path="users" element={<Users />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="products" element={<Products />} />
          <Route path="delivery-drivers" element={<DeliveryDrivers />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </div>
  );
};
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
>>>>>>> 148ae8f2edf656df542a86c2cbdd8179c617aa0f

export default App;