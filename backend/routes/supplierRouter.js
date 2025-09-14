import express from 'express';
import supplierAuth from '../middleware/supplierAuth.js';
import {
  getSupplierData,
  registerSupplier,
  loginSupplier,
  logoutSupplier,
  sendSupplierVerifyOtp,
  verifySupplierEmail,
  sendSupplierResetOtp,
  resetSupplierPassword
} from '../controllers/suppplierController.js';

const supplierRouter = express.Router();


    supplierRouter.post('/register', registerSupplier);
    supplierRouter.post('/login', loginSupplier);
    supplierRouter.post('/logout', logoutSupplier);
    supplierRouter.post('/send-verify-otp', supplierAuth, sendSupplierVerifyOtp);
    supplierRouter.post('/verify-account', supplierAuth, verifySupplierEmail);
    supplierRouter.post('/send-reset-otp', sendSupplierResetOtp);
    supplierRouter.post('/reset-password', resetSupplierPassword);
    supplierRouter.get('/data', supplierAuth, getSupplierData);

export default supplierRouter;
