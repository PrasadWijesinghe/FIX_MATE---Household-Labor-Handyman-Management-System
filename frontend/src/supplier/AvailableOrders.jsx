import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SupplierContext } from "../Context/SupplierContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AvailableOrders = () => {
  const { supplierData } = useContext(SupplierContext) || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!supplierData?._id) {
      console.log('No supplierData._id, skipping fetch. supplierData:', supplierData);
      return;
    }
    setLoading(true);
    try {
  const { data } = await axios.get(`/api/supply-orders/supplier/${supplierData._id}`);
      if (data.success) {
        // Debug: log all returned orders
        console.log('Fetched orders from backend:', data.orders);
        setOrders(
          (data.orders || []).filter(order => order.status === 'Pending')
        );
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [supplierData]);

  const handleAccept = (orderId) => {
    toast.info(
      <div>
        <div className="mb-2">Are you sure you want to accept this order?</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
            onClick={async () => {
              toast.dismiss();
              try {
                await axios.patch(`/api/supply-orders/${orderId}/status`, { status: 'Confirmed' });
                toast.success('Order accepted and moved to Previous Orders.');
                navigate('/supplier/previous');
              } catch {
                toast.error('Failed to accept order.');
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

  const handleReject = (orderId) => {
    toast.info(
      <div>
        <div className="mb-2">Are you sure you want to reject this order?</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            onClick={async () => {
              toast.dismiss();
              try {
                await axios.delete(`/api/supply-orders/${orderId}`);
                toast.success('Order rejected and removed.');
                fetchOrders();
              } catch {
                toast.error('Failed to reject order.');
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
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-4">Available Orders</h2>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No available orders.</div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1 text-gray-800">
                <div className="mb-2">
                  <span className="font-semibold">Customer:</span> <span className="ml-1">{order.name}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Phone:</span> <span className="ml-1">{order.phone}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span> <span className="ml-1">{order.email}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Address:</span> <span className="ml-1">{order.address}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Date:</span> <span className="ml-1">{order.date}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Product:</span> <span className="ml-1">{order.productId?.name || order.productName}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Amount:</span> <span className="ml-1">{order.amount || 1}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Total Price:</span> <span className="ml-1">${(order.amount || 1) * (order.productId?.price || 0)}</span>
                </div>
                {order.notes && (
                  <div className="mb-2">
                    <span className="font-semibold">Notes:</span> <span className="ml-1">{order.notes}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  onClick={() => handleAccept(order._id)}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  onClick={() => handleReject(order._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableOrders;

