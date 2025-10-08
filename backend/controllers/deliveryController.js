import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import deliveryModel from '../models/deliveryModel.js';

// Register a new delivery driver
const registerDelivery = async (req, res) => {
  try {
    const { name, rate, operatingArea, phone, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !rate || !operatingArea || !phone || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Check if email already exists
    const existingDelivery = await deliveryModel.findOne({ email });
    if (existingDelivery) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // Validate rate
    if (rate < 0) {
      return res.json({ success: false, message: "Rate must be a positive number" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new delivery driver
    const newDelivery = new deliveryModel({
      name,
      rate: Number(rate),
      operatingArea,
      phone,
      email,
      password: hashedPassword
    });

    const delivery = await newDelivery.save();

    // Generate JWT token
    const token = jwt.sign({ id: delivery._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie and send response
    res.cookie('delivery_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: "Delivery driver registered successfully",
      delivery: {
        id: delivery._id,
        name: delivery.name,
        email: delivery.email,
        rate: delivery.rate,
        operatingArea: delivery.operatingArea,
        phone: delivery.phone
      }
    });

  } catch (error) {
    console.error('Register delivery error:', error);
    res.json({ success: false, message: "Registration failed" });
  }
};

// Login delivery driver
const loginDelivery = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    // Find delivery driver by email
    const delivery = await deliveryModel.findOne({ email });
    if (!delivery) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, delivery.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: delivery._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie and send response
    res.cookie('delivery_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: "Login successful",
      delivery: {
        id: delivery._id,
        name: delivery.name,
        email: delivery.email,
        rate: delivery.rate,
        operatingArea: delivery.operatingArea,
        phone: delivery.phone,
        profileImageUrl: delivery.profileImageUrl,
        location: delivery.location,
        bio: delivery.bio,
        isAvailable: delivery.isAvailable,
        totalDeliveries: delivery.totalDeliveries
      }
    });

  } catch (error) {
    console.error('Login delivery error:', error);
    res.json({ success: false, message: "Login failed" });
  }
};

// Logout delivery driver
const logoutDelivery = async (req, res) => {
  try {
    res.clearCookie('delivery_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout delivery error:', error);
    res.json({ success: false, message: "Logout failed" });
  }
};

// Get delivery driver profile
const getDeliveryProfile = async (req, res) => {
  try {
    const delivery = await deliveryModel.findById(req.deliveryId).select('-password');
    if (!delivery) {
      return res.json({ success: false, message: "Delivery driver not found" });
    }

    res.json({
      success: true,
      delivery: {
        id: delivery._id,
        name: delivery.name,
        email: delivery.email,
        rate: delivery.rate,
        operatingArea: delivery.operatingArea,
        phone: delivery.phone,
        profileImageUrl: delivery.profileImageUrl,
        location: delivery.location,
        bio: delivery.bio,
        isAvailable: delivery.isAvailable,
        totalDeliveries: delivery.totalDeliveries,
        createdAt: delivery.createdAt
      }
    });
  } catch (error) {
    console.error('Get delivery profile error:', error);
    res.json({ success: false, message: "Failed to get profile" });
  }
};

// Update delivery driver profile
const updateDeliveryProfile = async (req, res) => {
  try {
    const { name, rate, operatingArea, phone, location, bio, isAvailable, profileImageUrl } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (rate) updateData.rate = Number(rate);
    if (operatingArea) updateData.operatingArea = operatingArea;
    if (phone) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
    if (profileImageUrl !== undefined) updateData.profileImageUrl = profileImageUrl;
    
    updateData.updatedAt = new Date();

    const delivery = await deliveryModel.findByIdAndUpdate(
      req.deliveryId,
      updateData,
      { new: true }
    ).select('-password');

    if (!delivery) {
      return res.json({ success: false, message: "Delivery driver not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      delivery: {
        id: delivery._id,
        name: delivery.name,
        email: delivery.email,
        rate: delivery.rate,
        operatingArea: delivery.operatingArea,
        phone: delivery.phone,
        profileImageUrl: delivery.profileImageUrl,
        location: delivery.location,
        bio: delivery.bio,
        isAvailable: delivery.isAvailable,
        totalDeliveries: delivery.totalDeliveries
      }
    });
  } catch (error) {
    console.error('Update delivery profile error:', error);
    res.json({ success: false, message: "Failed to update profile" });
  }
};

// Get all delivery drivers (for admin)
const getAllDeliveryDrivers = async (req, res) => {
  try {
    const deliveryDrivers = await deliveryModel.find({}).select('-password');
    res.json({
      success: true,
      deliveryDrivers,
      count: deliveryDrivers.length
    });
  } catch (error) {
    console.error('Get all delivery drivers error:', error);
    res.json({ success: false, message: "Failed to get delivery drivers" });
  }
};

export {
  registerDelivery,
  loginDelivery,
  logoutDelivery,
  getDeliveryProfile,
  updateDeliveryProfile,
  getAllDeliveryDrivers
};