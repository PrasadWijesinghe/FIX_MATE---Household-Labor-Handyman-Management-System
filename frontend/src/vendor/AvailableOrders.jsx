import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { VendorContext } from "../Context/VendorContext";
import { toast } from "react-toastify";

const AvailableOrders = () => {
  const { vendorData, backendUrl } = useContext(VendorContext) || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!vendorData?._id) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}/api/orders/vendor/${vendorData._id}`);
        if (data.success) {
          setOrders(data.orders.filter(order => order.status === 'pending'));
        } else {
          setOrders([]);
        }
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [vendorData]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No available orders.</div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div><span className="font-semibold">Customer:</span> {order.name}</div>
                <div><span className="font-semibold">Phone:</span> {order.phone}</div>
                <div><span className="font-semibold">Email:</span> {order.email}</div>
                <div><span className="font-semibold">Address:</span> {order.address}</div>
                <div><span className="font-semibold">Date:</span> {order.date}</div>
                {order.notes && <div><span className="font-semibold">Notes:</span> {order.notes}</div>}
              </div>
              <div className="flex gap-2">
                {/* Accept/Reject buttons will be added in next step */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableOrders;
