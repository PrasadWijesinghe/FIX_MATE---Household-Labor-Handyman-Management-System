import express from 'express';
import vendorAuth from '../middleware/vendorAuth.js';
import upload from '../middleware/vendorUpload.js';
import {
	registerVendor,
	loginVendor,
	logoutVendor,
	getVendorData,
	updateVendorProfile
} from '../controllers/vendorContoller.js';

const vendorRouter = express.Router();

vendorRouter.post('/register', registerVendor);
vendorRouter.post('/login', loginVendor);
vendorRouter.post('/logout', logoutVendor);
vendorRouter.get('/data', vendorAuth, getVendorData);
// Update vendor profile
vendorRouter.put('/profile', vendorAuth, upload, updateVendorProfile);

export default vendorRouter;
