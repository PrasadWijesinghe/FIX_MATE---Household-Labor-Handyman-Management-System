import express from 'express';
import vendorAuth from '../middleware/vendorAuth.js';
import upload from '../middleware/vendorUpload.js';
import {
	registerVendor,
	loginVendor,
	logoutVendor,
	getVendorData,
	updateVendorProfile,
	getVendorsByCategory,
	getVendorById
} from '../controllers/vendorContoller.js';

const vendorRouter = express.Router();


vendorRouter.post('/register', registerVendor);
vendorRouter.post('/login', loginVendor);
vendorRouter.post('/logout', logoutVendor);
vendorRouter.get('/data', vendorAuth, getVendorData);
// Update vendor profile
vendorRouter.put('/profile', vendorAuth, upload, updateVendorProfile);

// Get all vendors by category (public route)
vendorRouter.get('/category/:category', getVendorsByCategory);
// Get a single vendor by ID (public route)
vendorRouter.get('/category/vendor/:id', getVendorById);

export default vendorRouter;
