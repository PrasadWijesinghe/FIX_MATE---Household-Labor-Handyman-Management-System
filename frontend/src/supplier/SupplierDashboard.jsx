import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { SupplierContext, SupplierContextProvider } from "../Context/SupplierContext";

const SupplierDashboard = () => {
  const { supplierData } = useContext(SupplierContext);
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
       
        <div className="flex items-center justify-end h-20 px-8 bg-gray-800 border-b border-gray-700">
          {supplierData && (
            <div className="rounded-full bg-black text-white w-14 h-14 flex items-center justify-center font-bold text-2xl">
              {supplierData.name && supplierData.name[0] ? supplierData.name[0].toUpperCase() : "S"}
            </div>
          )}
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;

