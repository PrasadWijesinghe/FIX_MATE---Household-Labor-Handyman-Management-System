import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import DashboardMain from './admin/DashboardMain';
import Users from './admin/Users';
import Vendors from './admin/Vendors';
import Suppliers from './admin/Suppliers';
import Products from './admin/Products';
import Services from './admin/Services';
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp' 

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<DashboardMain />} />
        <Route path="users" element={<Users />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
      </Route>
    </Routes>
  );
}

export default App;

