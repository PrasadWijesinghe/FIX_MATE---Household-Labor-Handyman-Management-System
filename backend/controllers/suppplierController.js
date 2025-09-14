import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supplierModel from '../models/supplierModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/EmailTemplate.js';


export const getSupplierData = async (req, res) => {
	try {
		const supplierId = req.user.id;
		const supplier = await supplierModel.findById(supplierId);
		if (!supplier) {
			return res.json({ success: false, message: 'Supplier Not Found' });
		}
		res.json({
			success: true,
			supplierData: {
				name: supplier.name,
				email: supplier.email,
				isAccountVerified: supplier.isAccountVerified
			}
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};


export const registerSupplier = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.json({ success: false, message: 'Missing Details' });
	}
	try {
		const existingSupplier = await supplierModel.findOne({ email });
		if (existingSupplier) {
			return res.json({ success: false, message: 'Supplier Already Exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const supplier = new supplierModel({ name, email, password: hashedPassword });
		await supplier.save();
		const token = jwt.sign({ id: supplier._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		res.cookie('supplier_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
	
		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: 'Welcome To FIX-MATE (Supplier)',
			text: `Your supplier account has been created.\nEmail: ${email}`
		};
		await transporter.sendMail(mailOptions);
		return res.json({ success: true });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};


export const loginSupplier = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.json({ success: false, message: 'Email and password are required' });
	}
	try {
		const supplier = await supplierModel.findOne({ email });
		if (!supplier) {
			return res.json({ success: false, message: 'Invalid Supplier Email' });
		}
		const isMatch = await bcrypt.compare(password, supplier.password);
		if (!isMatch) {
			return res.json({ success: false, message: 'Invalid Supplier Password' });
		}
		const token = jwt.sign({ id: supplier._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		res.cookie('supplier_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
		return res.json({ success: true });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

export const logoutSupplier = async (req, res) => {
	try {
		res.clearCookie('supplier_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
		});
		return res.json({ success: true, message: 'Logged Out' });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};


export const sendSupplierVerifyOtp = async (req, res) => {
	try {
		const supplierId = req.user.id;
		const supplier = await supplierModel.findById(supplierId);
		if (supplier.isAccountVerified) {
			return res.json({ success: false, message: 'Account Already Verified' });
		}
		const otp = String(Math.floor(100000 + Math.random() * 900000));
		supplier.verifyOtp = otp;
		supplier.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
		await supplier.save();
		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: supplier.email,
			subject: 'Supplier Account Verification OTP',
			html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", supplier.email)
		};
		await transporter.sendMail(mailOptions);
		res.json({ success: true, message: 'Verification OTP sent to your email' });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};


export const verifySupplierEmail = async (req, res) => {
	const { otp } = req.body;
	const supplierId = req.user.id;
	if (!otp) {
		return res.json({ success: false, message: 'Missing Details' });
	}
	try {
		const supplier = await supplierModel.findById(supplierId);
		if (!supplier) {
			return res.json({ success: false, message: 'Supplier Not Found' });
		}
		if (supplier.verifyOtp === '' || supplier.verifyOtp !== otp) {
			return res.json({ success: false, message: 'Invalid OTP' });
		}
		if (supplier.verifyOtpExpireAt < Date.now()) {
			return res.json({ success: false, message: 'OTP is Expired' });
		}
		supplier.isAccountVerified = true;
		supplier.verifyOtp = '';
		supplier.verifyOtpExpireAt = 0;
		await supplier.save();
		return res.json({ success: true, message: 'Email Verified Successfully' });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};


export const sendSupplierResetOtp = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.json({ success: false, message: 'Email is Required' });
	}
	try {
		const supplier = await supplierModel.findOne({ email });
		if (!supplier) {
			return res.json({ success: false, message: 'Supplier not Found' });
		}
		const otp = String(Math.floor(100000 + Math.random() * 900000));
		supplier.resetOtp = otp;
		supplier.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
		await supplier.save();
		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: supplier.email,
			subject: 'Supplier Password Reset OTP',
			html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", supplier.email)
		};
		await transporter.sendMail(mailOptions);
		return res.json({ success: true, message: 'OTP has been sent to your email' });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};


export const resetSupplierPassword = async (req, res) => {
	const { email, otp, newPassword } = req.body;
	if (!email || !otp || !newPassword) {
		return res.json({ success: false, message: 'Email, OTP and new Password Required' });
	}
	try {
		const supplier = await supplierModel.findOne({ email });
		if (!supplier) {
			return res.json({ success: false, message: 'Supplier Not Available' });
		}
		if (supplier.resetOtp === '' || supplier.resetOtp !== otp) {
			return res.json({ success: false, message: 'Invalid OTP' });
		}
		if (supplier.resetOtpExpireAt < Date.now()) {
			return res.json({ success: false, message: 'OTP expired' });
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		supplier.password = hashedPassword;
		supplier.resetOtp = '';
		supplier.resetOtpExpireAt = 0;
		await supplier.save();
		return res.json({ success: true, message: 'Password has been changed successfully' });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};
