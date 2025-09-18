// Admin: Get all products with supplier info
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).populate('supplier', 'name');
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete any product by ID
export const adminDeleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    // Remove image from Cloudinary if present
    if (product.imagePublicId) {
      try {
        await cloudinary.v2.uploader.destroy(product.imagePublicId);
      } catch (err) {}
    }
    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSupplierProducts = async (req, res) => {
  try {
    const supplierId = req.user.id;
    const products = await productModel.find({ supplier: supplierId }).sort({ createdAt: -1 });
    return res.json({ success: true, products });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

import productModel from "../models/productModel.js";
import supplierModel from "../models/supplierModel.js";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

export const deleteProduct = async (req, res) => {
  try {
    const supplierId = req.user.id;
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    if (product.supplier.toString() !== supplierId) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    // Remove image from Cloudinary if present
    if (product.imagePublicId) {
      try {
        await cloudinary.v2.uploader.destroy(product.imagePublicId);
      } catch (err) {
        // Ignore image deletion errors
      }
    }
    await product.deleteOne();
    return res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const supplierId = req.user.id;
    if (!name || !price || !description) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    let imageUrl = "";
    let imagePublicId = "";
    if (req.file) {
      // Upload image to Cloudinary
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const result = await streamUpload();
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }
    const product = new productModel({
      name,
      price,
      description,
      imageUrl,
      imagePublicId,
      supplier: supplierId
    });
    await product.save();
    return res.json({ success: true, product });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
