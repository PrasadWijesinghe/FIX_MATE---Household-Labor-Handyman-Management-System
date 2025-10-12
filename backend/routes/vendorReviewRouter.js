import express from 'express';
<<<<<<< HEAD
import { addVendorReview, getVendorReviews, getUserVendorReviews, editVendorReview, deleteVendorReview, addOrUpdateReply, deleteReply } from '../controllers/vendorReviewController.js';
import userAuth from '../middleware/userAuth.js';
import vendorAuth from '../middleware/vendorAuth.js';
=======
import { addVendorReview, getVendorReviews, getUserVendorReviews, editVendorReview, deleteVendorReview } from '../controllers/vendorReviewController.js';
import userAuth from '../middleware/userAuth.js';
>>>>>>> 148ae8f2edf656df542a86c2cbdd8179c617aa0f

const vendorReviewRouter = express.Router();

// Add a new vendor review (requires authentication)
vendorReviewRouter.post('/add', userAuth, addVendorReview);

// Get reviews for a specific vendor
vendorReviewRouter.get('/vendor/:vendorId', getVendorReviews);

// Get reviews by a specific user
vendorReviewRouter.get('/user/:userId', getUserVendorReviews);

// Edit a vendor review (requires authentication)
vendorReviewRouter.put('/:reviewId', userAuth, editVendorReview);

// Delete a vendor review (requires authentication)
vendorReviewRouter.delete('/:reviewId', userAuth, deleteVendorReview);

<<<<<<< HEAD
// Vendor can add/update a reply to a review (vendor must be authenticated)
vendorReviewRouter.post('/:reviewId/reply', vendorAuth, addOrUpdateReply);

// Vendor can delete their reply
vendorReviewRouter.delete('/:reviewId/reply', vendorAuth, deleteReply);

=======
>>>>>>> 148ae8f2edf656df542a86c2cbdd8179c617aa0f
export default vendorReviewRouter;