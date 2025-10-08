import express from 'express';
import {
  registerDelivery,
  loginDelivery,
  logoutDelivery,
  getDeliveryProfile,
  updateDeliveryProfile,
  getAllDeliveryDrivers
} from '../controllers/deliveryController.js';
import deliveryAuth from '../middleware/deliveryAuth.js';

const deliveryRouter = express.Router();

// Public routes
deliveryRouter.post('/register', registerDelivery);
deliveryRouter.post('/login', loginDelivery);
deliveryRouter.post('/logout', logoutDelivery);

// Protected routes (require authentication)
deliveryRouter.get('/profile', deliveryAuth, getDeliveryProfile);
deliveryRouter.put('/profile', deliveryAuth, updateDeliveryProfile);

// Admin routes
deliveryRouter.get('/admin/all', getAllDeliveryDrivers);

// Public routes for suppliers
deliveryRouter.get('/drivers', getAllDeliveryDrivers);

export default deliveryRouter;