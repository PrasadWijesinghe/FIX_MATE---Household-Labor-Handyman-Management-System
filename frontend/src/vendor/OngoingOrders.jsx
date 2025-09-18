import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { VendorContext } from "../Context/VendorContext";
import { toast } from "react-toastify";

const OngoingOrders = () => {
  const { vendorData, backendUrl } = useContext(VendorContext) || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!vendorData?._id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/orders/vendor/${vendorData._id}`);
      if (data.success) {
        setOrders(data.orders.filter(order => order.status === 'ongoing'));
      } else {
        setOrders([]);
      }
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [vendorData, backendUrl]);

  const handleMarkDone = (orderId) => {
    toast.info(
      <div>
        <div className="mb-2">Are you sure you want to mark this order as done?</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
            onClick={async () => {
              toast.dismiss();
              try {
                await axios.patch(`${backendUrl}/api/orders/${orderId}/status`, { status: 'done' });
                toast.success('Order marked as done.');
                fetchOrders();
              } catch {
                toast.error('Failed to mark as done.');
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
      <h2 className="text-xl font-semibold mb-4">Ongoing Orders</h2>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No ongoing orders.</div>
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
                {order.notes && (
                  <div className="mb-2">
                    <span className="font-semibold">Notes:</span> <span className="ml-1">{order.notes}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  onClick={() => handleMarkDone(order._id)}
                >
                  Mark as Done
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingOrders;
