import express from 'express';
import { addVendorReview, getVendorReviews, getUserVendorReviews, editVendorReview, deleteVendorReview } from '../controllers/vendorReviewController.js';
import userAuth from '../middleware/userAuth.js';

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

export default vendorReviewRouter;