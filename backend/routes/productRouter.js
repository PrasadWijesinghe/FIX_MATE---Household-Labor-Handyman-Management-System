import express from "express";
import supplierAuth from "../middleware/supplierAuth.js";
import multer from "multer";
import { addProduct, getSupplierProducts, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/supplier/products
router.post("/products", supplierAuth, upload.single("image"), addProduct);

// GET /api/supplier/products (only products for logged-in supplier)
router.get("/products", supplierAuth, getSupplierProducts);

// DELETE /api/supplier/products/:id
router.delete("/products/:id", supplierAuth, deleteProduct);

export default router;
