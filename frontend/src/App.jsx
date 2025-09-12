import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import DashboardMain from './admin/DashboardMain';
import Users from './admin/Users';
import Vendors from './admin/Vendors';
import Suppliers from './admin/Suppliers';
import Products from './admin/Products';
import Services from './admin/Services';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardMain />} />
          <Route path="users" element={<Users />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
