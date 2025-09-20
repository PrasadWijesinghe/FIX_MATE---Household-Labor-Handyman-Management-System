import express from 'express';
import {
  createSupplyOrder,
  getAllSupplyOrders,
  getSupplyOrdersByUser,
  getSupplyOrdersBySupplier,
  updateSupplyOrderStatus,
  deleteSupplyOrder,
  updateSupplyOrderDetails
} from '../controllers/supplyOrderController.js';

const router = express.Router();

// Create a new supply order
router.post('/', createSupplyOrder);

// Get all supply orders (admin)
router.get('/', getAllSupplyOrders);

// Get supply orders by user
router.get('/user/:userId', getSupplyOrdersByUser);

// Get supply orders by supplier
router.get('/supplier/:supplierId', getSupplyOrdersBySupplier);

// Update supply order status
router.patch('/:orderId/status', updateSupplyOrderStatus);

// Update supply order details
router.put('/:orderId', updateSupplyOrderDetails);

// Delete supply order
router.delete('/:orderId', deleteSupplyOrder);

export default router;
