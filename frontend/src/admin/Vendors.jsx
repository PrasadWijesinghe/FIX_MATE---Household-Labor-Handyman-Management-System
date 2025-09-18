import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/vendor/all');
      if (data.success) {
        setVendors(data.vendors);
      } else {
        setVendors([]);
      }
    } catch {
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleRemove = (vendorId) => {
    toast.info(
      <div>
        <div className="mb-2">Are you sure you want to remove this vendor?</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            onClick={async () => {
              toast.dismiss();
              try {
                await axios.delete(`/api/vendor/${vendorId}`);
                toast.success('Vendor removed.');
                fetchVendors();
              } catch {
                toast.error('Failed to remove vendor.');
              }
            }}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-xs"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, closeButton: false, position: 'top-center' }
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Vendors Management</h2>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : vendors.length === 0 ? (
        <div className="text-gray-400">No vendors found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Hourly Rate</th>
                <th className="px-4 py-2 text-left">Verified</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(vendor => (
                <tr key={vendor._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{vendor.name}</td>
                  <td className="px-4 py-2">{vendor.email}</td>
                  <td className="px-4 py-2">{vendor.category}</td>
                  <td className="px-4 py-2">${vendor.hourlyRate}</td>
                  <td className="px-4 py-2">{vendor.isAccountVerified ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                      onClick={() => handleRemove(vendor._id)}
                    >
                      Remove
                    </button>
                    {!vendor.isAccountVerified && (
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                        onClick={() => {
                          toast.info(
                            <div>
                              <div className="mb-2">Are you sure you want to verify this vendor?</div>
                              <div className="flex gap-2 justify-end">
                                <button
                                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                  onClick={async () => {
                                    toast.dismiss();
                                    try {
                                      await axios.put(`/api/vendor/verify/${vendor._id}`);
                                      toast.success('Vendor verified.');
                                      fetchVendors();
                                    } catch {
                                      toast.error('Failed to verify vendor.');
                                    }
                                  }}
                                >
                                  Yes
                                </button>
                                <button
                                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-xs"
                                  onClick={() => toast.dismiss()}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>,
                            { autoClose: false, closeOnClick: false, closeButton: false, position: 'top-center' }
                          );
                        }}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vendors;
