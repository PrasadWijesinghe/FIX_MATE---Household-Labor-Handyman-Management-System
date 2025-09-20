import mongoose from 'mongoose';

const supplyOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products', // match productModel registration
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'suppliers', // match supplierModel registration
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // match userModel registration
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'Online Payment'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SupplyOrder = mongoose.model('SupplyOrder', supplyOrderSchema);
export default SupplyOrder;
