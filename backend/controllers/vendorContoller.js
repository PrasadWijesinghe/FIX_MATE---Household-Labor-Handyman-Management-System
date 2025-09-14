import vendorModel from '../models/vendorModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const getVendorData = async (req, res) => {
	try {
		const vendorId = req.user.id;
		const vendor = await vendorModel.findById(vendorId);
		if (!vendor) {
			return res.json({ success: false, message: 'Vendor not found' });
		}
		res.json({
			success: true,
			vendorData: {
				_id: vendor._id,
				name: vendor.name,
				category: vendor.category,
				hourlyRate: vendor.hourlyRate,
				email: vendor.email,
				isAccountVerified: vendor.isAccountVerified
			}
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};


export const registerVendor = async (req, res) => {
	const { name, category, hourlyRate, email, password } = req.body;
	if (!name || !category || !hourlyRate || !email || !password) {
		return res.json({ success: false, message: 'Missing Details' });
	}
	try {
		const existingVendor = await vendorModel.findOne({ email });
		if (existingVendor) {
			return res.json({ success: false, message: 'Vendor already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const vendor = new vendorModel({ name, category, hourlyRate, email, password: hashedPassword });
		await vendor.save();
		const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		res.cookie('vendor_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
		return res.json({ success: true });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};


export const loginVendor = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.json({ success: false, message: 'Email and password are required' });
	}
	try {
		const vendor = await vendorModel.findOne({ email });
		if (!vendor) {
			return res.json({ success: false, message: 'Vendor not found' });
		}
		const isMatch = await bcrypt.compare(password, vendor.password);
		if (!isMatch) {
			return res.json({ success: false, message: 'Invalid credentials' });
		}
		const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		res.cookie('vendor_token', token, {
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

// Logout vendor
export const logoutVendor = async (req, res) => {
	try {
		res.clearCookie('vendor_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
		});
		return res.json({ success: true, message: 'Logged Out' });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};
