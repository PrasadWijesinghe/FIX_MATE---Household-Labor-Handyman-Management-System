import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    
    name:{type:String, required: true},
    email:{type:String, required: true, unique: true},
    password:{type:String, required:true},
    verifyOtp:{type:String, default:''},
    verifyOtpExpireAt:{type:Number, default:0},
    isAccountVerified:{type:Boolean, default:false},
    resetOtp:{type:String, default:''},
    resetOtpExpireAt:{type:Number, default:0}

})

const supplierModel = mongoose.models.supplier || mongoose.model('suppliers', supplierSchema);

export default supplierModel;