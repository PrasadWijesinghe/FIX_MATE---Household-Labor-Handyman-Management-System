
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!['pending', 'ongoing', 'done', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel.findByIdAndDelete(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
import orderModel from '../models/orderModel.js';

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const createOrder = async (req, res) => {
  try {
    const { vendorId, vendorName, userId, name, phone, email, address, date, notes } = req.body;
    if (!vendorId || !userId || !name || !phone || !email || !address || !date) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const order = new orderModel({ vendorId, vendorName, userId, name, phone, email, address, date, notes });
    await order.save();
    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getOrdersByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const orders = await orderModel.find({ vendorId }).sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
