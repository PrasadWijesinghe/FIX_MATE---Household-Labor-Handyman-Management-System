
import express from "express";
import supplierAuth from "../middleware/supplierAuth.js";
import multer from "multer";
import { addProduct, getSupplierProducts, deleteProduct, getAllProducts, adminDeleteProduct } from "../controllers/productController.js";

const router = express.Router();

// Admin: Get all products
router.get("/admin/all", getAllProducts);
// Admin: Delete any product
router.delete("/admin/:id", adminDeleteProduct);

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/products", supplierAuth, upload.single("image"), addProduct);


router.get("/products", supplierAuth, getSupplierProducts);


router.delete("/products/:id", supplierAuth, deleteProduct);

export default router;
