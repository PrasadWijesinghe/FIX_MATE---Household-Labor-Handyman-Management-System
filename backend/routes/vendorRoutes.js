import express from 'express';
import vendorAuth from '../middleware/vendorAuth.js';
import {
	registerVendor,
	loginVendor,
	logoutVendor,
	getVendorData
} from '../controllers/vendorContoller.js';

const vendorRouter = express.Router();

vendorRouter.post('/register', registerVendor);
vendorRouter.post('/login', loginVendor);
vendorRouter.post('/logout', logoutVendor);
vendorRouter.get('/data', vendorAuth, getVendorData);

export default vendorRouter;
