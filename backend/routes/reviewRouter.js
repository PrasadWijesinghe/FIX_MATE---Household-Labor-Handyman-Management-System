import express from 'express';
import { addReview, getProductReviews, getUserReviews, editReview, deleteReview } from '../controllers/reviewController.js';
import userAuth from '../middleware/userAuth.js';

const reviewRouter = express.Router();

// Add a new review (requires authentication)
reviewRouter.post('/add', userAuth, addReview);

// Get reviews for a specific product
reviewRouter.get('/product/:productId', getProductReviews);

// Get reviews by a specific user
reviewRouter.get('/user/:userId', getUserReviews);

// Edit a review (requires authentication)
reviewRouter.put('/:reviewId', userAuth, editReview);

// Delete a review (requires authentication)
reviewRouter.delete('/:reviewId', userAuth, deleteReview);

export default reviewRouter;