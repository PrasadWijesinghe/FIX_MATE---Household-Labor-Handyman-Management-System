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
	getVendorById,
	getAllVendors,
	deleteVendor
} from '../controllers/vendorContoller.js';

const vendorRouter = express.Router();

vendorRouter.get('/all', getAllVendors);

vendorRouter.delete('/:id', deleteVendor);


vendorRouter.post('/register', registerVendor);
vendorRouter.post('/login', loginVendor);
vendorRouter.post('/logout', logoutVendor);
vendorRouter.get('/data', vendorAuth, getVendorData);

vendorRouter.put('/profile', vendorAuth, upload, updateVendorProfile);


vendorRouter.get('/category/:category', getVendorsByCategory);

vendorRouter.get('/category/vendor/:id', getVendorById);

export default vendorRouter;
