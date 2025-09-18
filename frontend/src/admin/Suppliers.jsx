import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/supplier/all');
      if (data.success) {
        setSuppliers(data.suppliers);
      } else {
        setSuppliers([]);
      }
    } catch {
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleRemove = (supplierId) => {
    toast.info(
      <div>
        <div className="mb-2">Are you sure you want to remove this supplier?</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            onClick={async () => {
              toast.dismiss();
              try {
                await axios.delete(`/api/supplier/${supplierId}`);
                toast.success('Supplier removed.');
                fetchSuppliers();
              } catch {
                toast.error('Failed to remove supplier.');
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
      <h2 className="text-2xl font-bold mb-6">Suppliers Management</h2>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : suppliers.length === 0 ? (
        <div className="text-gray-400">No suppliers found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Verified</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{supplier.name}</td>
                  <td className="px-4 py-2">{supplier.email}</td>
                  <td className="px-4 py-2">{supplier.isAccountVerified ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                      onClick={() => handleRemove(supplier._id)}
                    >
                      Remove
                    </button>
                    {!supplier.isAccountVerified && (
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                        onClick={() => {
                          toast.info(
                            <div>
                              <div className="mb-2">Are you sure you want to verify this supplier?</div>
                              <div className="flex gap-2 justify-end">
                                <button
                                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                  onClick={async () => {
                                    toast.dismiss();
                                    try {
                                      await axios.put(`/api/supplier/verify/${supplier._id}`);
                                      toast.success('Supplier verified.');
                                      fetchSuppliers();
                                    } catch {
                                      toast.error('Failed to verify supplier.');
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

export default Suppliers;
