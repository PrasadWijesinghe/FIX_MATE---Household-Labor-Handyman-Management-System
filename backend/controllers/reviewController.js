import reviewModel from '../models/reviewModel.js';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';

// Add a new review
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; // Get userId from authenticated user

    // Validate input
    if (!productId || !rating || !comment) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: 'Product not found' });
    }

    // Get user name
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Check if user already reviewed this product
    const existingReview = await reviewModel.findOne({ userId, productId });
    if (existingReview) {
      return res.json({ success: false, message: 'You have already reviewed this product' });
    }

    // Create new review
    const newReview = new reviewModel({
      userId,
      productId,
      rating: Number(rating),
      comment: comment.trim(),
      userName: user.name
    });

    await newReview.save();

    res.json({ success: true, message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await reviewModel.find({ productId })
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user's reviews
const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await reviewModel.find({ userId })
      .populate('productId', 'name imageUrl')
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Edit a review
const editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id; // Get userId from authenticated user

    // Validate input
    if (!rating || !comment) {
      return res.json({ success: false, message: 'Rating and comment are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.json({ success: false, message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.userId.toString() !== userId) {
      return res.json({ success: false, message: 'Not authorized to edit this review' });
    }

    // Update the review
    review.rating = Number(rating);
    review.comment = comment.trim();
    await review.save();

    res.json({ success: true, message: 'Review updated successfully', review });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id; // Get userId from authenticated user

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.json({ success: false, message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.userId.toString() !== userId) {
      return res.json({ success: false, message: 'Not authorized to delete this review' });
    }

    await reviewModel.findByIdAndDelete(reviewId);
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addReview, getProductReviews, getUserReviews, editReview, deleteReview };