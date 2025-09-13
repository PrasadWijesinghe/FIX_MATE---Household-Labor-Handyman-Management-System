import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const SupplierDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SupplierDashboard;
