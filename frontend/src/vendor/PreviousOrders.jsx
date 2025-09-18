import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { VendorContext } from "../Context/VendorContext";

const PreviousOrders = () => {
  const { vendorData, backendUrl } = useContext(VendorContext) || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!vendorData?._id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/orders/vendor/${vendorData._id}`);
      if (data.success) {
        setOrders(data.orders.filter(order => order.status === 'done'));
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

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-4">Previous Orders</h2>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No previous orders.</div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousOrders;
