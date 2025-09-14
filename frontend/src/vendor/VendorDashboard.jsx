import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { VendorContext } from "../Context/VendorContext";

const VendorDashboard = () => {
  const { vendorData } = useContext(VendorContext) || {};
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-end h-20 px-8 bg-gray-800 border-b border-gray-700 gap-4">
          <span className="text-lg font-semibold">
            Hey{vendorData && vendorData.name ? `, ${vendorData.name}` : ''}
          </span>
          <div className="rounded-full bg-black text-white w-14 h-14 flex items-center justify-center font-bold text-2xl">
            {vendorData && vendorData.name && vendorData.name[0]
              ? vendorData.name[0].toUpperCase()
              : "V"}
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
