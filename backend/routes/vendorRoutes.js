import express from 'express';
import vendorAuth from '../middleware/vendorAuth.js';
import upload from '../middleware/vendorUpload.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import {
	registerVendor,
	loginVendor,
	logoutVendor,
	getVendorData,
	updateVendorProfile,
	getVendorsByCategory,
	getVendorById,
	getAllVendors,
	deleteVendor,
<<<<<<< HEAD
	verifyVendor,
=======
    verifyVendor,
>>>>>>> 148ae8f2edf656df542a86c2cbdd8179c617aa0f
	adminBanVendorByEmail,
	adminUnbanVendorByEmail,
	adminSendVendorNotice,
	getMyVendorNotices,
	markVendorNoticeRead
<<<<<<< HEAD
=======

>>>>>>> 148ae8f2edf656df542a86c2cbdd8179c617aa0f
} from '../controllers/vendorContoller.js';

const vendorRouter = express.Router();

// Admin: Verify vendor
vendorRouter.put('/verify/:id', verifyVendor);

vendorRouter.get('/all', getAllVendors);

vendorRouter.delete('/:id', deleteVendor);


vendorRouter.post('/register', registerVendor);
vendorRouter.post('/login', loginVendor);
vendorRouter.post('/logout', logoutVendor);
vendorRouter.get('/data', vendorAuth, getVendorData);

vendorRouter.put('/profile', vendorAuth, upload, updateVendorProfile);


vendorRouter.get('/category/:category', getVendorsByCategory);

vendorRouter.get('/category/vendor/:id', getVendorById);

<<<<<<< HEAD
=======

>>>>>>> 148ae8f2edf656df542a86c2cbdd8179c617aa0f
// Admin ban/unban and notice
vendorRouter.post('/admin/ban', protect, admin, adminBanVendorByEmail);
vendorRouter.post('/admin/unban', protect, admin, adminUnbanVendorByEmail);
vendorRouter.post('/admin/notice', protect, admin, adminSendVendorNotice);

// Vendor notices
vendorRouter.get('/notices', vendorAuth, getMyVendorNotices);
vendorRouter.post('/notices/:id/read', vendorAuth, markVendorNoticeRead);

<<<<<<< HEAD
=======

>>>>>>> 148ae8f2edf656df542a86c2cbdd8179c617aa0f
export default vendorRouter;
