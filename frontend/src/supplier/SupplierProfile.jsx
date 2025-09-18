
import React, { useContext, useState } from "react";
import { SupplierContext } from "../Context/SupplierContext";
import axios from "axios";
import { toast } from "react-toastify";

const SupplierProfile = () => {

  const { supplierData, backendUrl, getSupplierAuthState } = useContext(SupplierContext);

  // Local state for edit mode and form fields
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: supplierData?.name || "",
    businessName: supplierData?.businessName || "",
    phone: supplierData?.phone || "",
  });
  const email = supplierData?.email || "Edit your email here";
  const rating = supplierData?.rating || 4.8;
  const verified = supplierData?.isAccountVerified ?? true;
  const displayName = supplierData?.name || "Name not set";

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        backendUrl + "/api/supplier/update-profile",
        {
          name: form.name,
          businessName: form.businessName,
          phone: form.phone,
        },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
        getSupplierAuthState();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-12 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-4xl text-white font-bold">
              {displayName ? displayName[0] : "S"}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              {displayName}
              {verified && (
                <span className="text-green-400 text-sm font-semibold ml-2">&#10003; Verified</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-white font-semibold">{rating}</span>
            </div>
          </div>
        </div>
        {!editMode ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        ) : null}
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
        <div>
          <label className="block text-gray-400 mb-1">Full Name</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={email} disabled />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Phone</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Business Name</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        {editMode && (
          <div className="col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
              onClick={() => {
                setEditMode(false);
                setForm({
                  name: supplierData?.name || "",
                  businessName: supplierData?.businessName || "",
                  phone: supplierData?.phone || "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SupplierProfile;
