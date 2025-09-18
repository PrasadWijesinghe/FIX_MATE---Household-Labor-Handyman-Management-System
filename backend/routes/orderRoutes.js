import express from 'express';
import { createOrder, getOrdersByVendor, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders for a vendor
router.get('/vendor/:vendorId', getOrdersByVendor);

export default router;

// Update order status (accept, mark as ongoing/done)
router.patch('/:orderId/status', updateOrderStatus);

// Delete order (reject)
router.delete('/:orderId', deleteOrder);
