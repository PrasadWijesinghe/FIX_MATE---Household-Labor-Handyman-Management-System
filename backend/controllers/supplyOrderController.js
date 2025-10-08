// Update supply order details
export const updateSupplyOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updateFields = {};
    const allowedFields = ['address', 'notes', 'amount', 'date'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });
    const updatedOrder = await SupplyOrder.findByIdAndUpdate(orderId, updateFields, { new: true });
    if (!updatedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update supply order', error: error.message });
  }
};
import SupplyOrder from '../models/supplyOrderModel.js';

// Create a new supply order
export const createSupplyOrder = async (req, res) => {
  try {
    const {
      productId,
      productName,
      supplierId,
      userId,
      name,
      phone,
      email,
      address,
      date,
      notes,
      amount,
      paymentMethod,
      paymentStatus,
      paymentIntentId
    } = req.body;

    if (!productId || !productName || !supplierId || !userId || !name || !phone || !email || !address || !date || !paymentMethod || !amount) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    const newOrder = new SupplyOrder({
      productId,
      productName,
      supplierId,
      userId,
      name,
      phone,
      email,
      address,
      date,
      notes,
      amount,
      paymentMethod,
      paymentStatus: paymentStatus || (paymentMethod === 'Cash on Delivery' ? 'pending' : 'paid'),
      paymentIntentId
    });
    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.log('Supply order creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create supply order', error: error.message });
  }
};

// Get all supply orders (admin)
export const getAllSupplyOrders = async (req, res) => {
  try {
    const orders = await SupplyOrder.find().populate('productId supplierId userId');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch supply orders', error: error.message });
  }
};

// Get supply orders by user
export const getSupplyOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await SupplyOrder.find({ userId }).populate('productId supplierId userId');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user supply orders', error: error.message });
  }
};

// Get supply orders by supplier
export const getSupplyOrdersBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const orders = await SupplyOrder.find({ supplierId })
      .populate({ path: 'productId', model: 'products' })
      .populate({ path: 'supplierId', model: 'suppliers' })
      .populate({ path: 'userId', model: 'users' });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch supplier supply orders', error: error.message });
  }
};

// Update supply order status
export const updateSupplyOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await SupplyOrder.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error: error.message });
  }
};

// Delete supply order
export const deleteSupplyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await SupplyOrder.findByIdAndDelete(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order', error: error.message });
  }
};
