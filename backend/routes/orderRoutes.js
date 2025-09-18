import express from 'express';
import { createOrder, getOrdersByVendor, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();


router.post('/', createOrder);


router.get('/vendor/:vendorId', getOrdersByVendor);

export default router;

router.patch('/:orderId/status', updateOrderStatus);


router.delete('/:orderId', deleteOrder);
