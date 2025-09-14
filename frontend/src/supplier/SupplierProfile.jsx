import React, { useContext } from "react";
import { SupplierContext } from "../Context/SupplierContext";

const SupplierProfile = () => {
  const { supplierData } = useContext(SupplierContext);


  const data = {
    firstName: supplierData?.firstName || supplierData?.name?.split(" ")[0] || "first name",
    lastName: supplierData?.lastName || supplierData?.name?.split(" ")[1] || "last name",
    email: supplierData?.email || "Edit your email here",
    phone: supplierData?.phone || "Edit Your Phone Number here",
    businessName: supplierData?.businessName || "Edit your business name",
    rating: supplierData?.rating || 4.8,
    reviews: supplierData?.reviews || 127,
    verified: supplierData?.isAccountVerified ?? true,
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-12 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-4xl text-white font-bold">
              {data.firstName ? data.firstName[0] : "S"}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              {data.firstName} {data.lastName}
              {data.verified && (
                <span className="text-green-400 text-sm font-semibold ml-2">&#10003; Verified</span>
              )}
            </div>
            <div className="text-gray-400 text-sm">{data.role}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-white font-semibold">{data.rating}</span>
              <span className="text-gray-400 text-xs">({data.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
          Edit Profile
        </button>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-1">First Name</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={data.firstName} disabled />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Last Name</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={data.lastName} disabled />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={data.email} disabled />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Phone</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={data.phone} disabled />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Business Name</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={data.businessName} disabled />
        </div>
      </form>
    </div>
  );
};

export default SupplierProfile;
