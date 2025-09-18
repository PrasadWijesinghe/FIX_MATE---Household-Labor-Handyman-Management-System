import vendorModel from '../models/vendorModel.js';


export const getAllVendors = async (req, res) => {
	try {
		const vendors = await vendorModel.find({}, 'name email category hourlyRate isAccountVerified');
		console.log('Fetched vendors:', vendors);
		res.json({ success: true, vendors });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};


export const deleteVendor = async (req, res) => {
	try {
		const { id } = req.params;
		const vendor = await vendorModel.findByIdAndDelete(id);
		if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
		res.json({ success: true, message: 'Vendor deleted' });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};

export const getVendorById = async (req, res) => {
	try {
		const { id } = req.params;
		const vendor = await vendorModel.findById(id);
		if (!vendor) {
			return res.status(404).json({ success: false, message: 'Vendor not found' });
		}
		return res.json({
			success: true,
			vendor: {
				_id: vendor._id,
				name: vendor.name,
				category: vendor.category,
				hourlyRate: vendor.hourlyRate,
				email: vendor.email,
				isAccountVerified: vendor.isAccountVerified,
				phone: vendor.phone || '',
				address: vendor.address || '',
				profileImageUrl: vendor.profileImageUrl || '',
				galleryImages: vendor.galleryImages || [],
				description: vendor.description || ''
			}
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const getVendorsByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		if (!category) {
			return res.status(400).json({ success: false, message: 'Category is required' });
		}
	
		const vendors = await vendorModel.find({ category: { $regex: `^${category}$`, $options: 'i' } });
		if (!vendors.length) {
			return res.json({ success: true, vendors: [] });
		}
	
		const vendorList = vendors.map(vendor => ({
			_id: vendor._id,
			name: vendor.name,
			category: vendor.category,
			hourlyRate: vendor.hourlyRate,
			email: vendor.email,
			isAccountVerified: vendor.isAccountVerified,
			phone: vendor.phone || '',
			address: vendor.address || '',
			profileImageUrl: vendor.profileImageUrl || '',
			galleryImages: vendor.galleryImages || [],
			description: vendor.description || ''
		}));
		return res.json({ success: true, vendors: vendorList });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
export const updateVendorProfile = async (req, res) => {
	try {
		const vendorId = req.user.id;
		const { name, phone, address, hourlyRate, description } = req.body;
		const vendor = await vendorModel.findById(vendorId);
		if (!vendor) {
			return res.json({ success: false, message: 'Vendor not found' });
		}
		if (name) vendor.name = name;
		if (phone !== undefined) vendor.phone = phone;
		if (address !== undefined) vendor.address = address;
		if (hourlyRate !== undefined) vendor.hourlyRate = hourlyRate;
		if (description !== undefined) vendor.description = description;

	
		if (req.files && req.files['profileImage'] && req.files['profileImage'][0]) {
		
			if (vendor.profileImagePublicId) {
				try { await cloudinary.v2.uploader.destroy(vendor.profileImagePublicId); } catch {}
			}
			
			const streamUpload = (fileBuffer) => {
				return new Promise((resolve, reject) => {
					const stream = cloudinary.v2.uploader.upload_stream(
						{ folder: 'vendors' },
						(error, result) => {
							if (result) resolve(result);
							else reject(error);
						}
					);
					streamifier.createReadStream(fileBuffer).pipe(stream);
				});
			};
			const result = await streamUpload(req.files['profileImage'][0].buffer);
			vendor.profileImageUrl = result.secure_url;
			vendor.profileImagePublicId = result.public_id;
		}


		let galleryUrls = [];
		let galleryPublicIds = [];
		for (let i = 1; i <= 4; i++) {
			const field = `galleryImage${i}`;
			if (req.files && req.files[field] && req.files[field][0]) {
				const streamUpload = (fileBuffer) => {
					return new Promise((resolve, reject) => {
						const stream = cloudinary.v2.uploader.upload_stream(
							{ folder: 'vendors/gallery' },
							(error, result) => {
								if (result) resolve(result);
								else reject(error);
							}
						);
						streamifier.createReadStream(fileBuffer).pipe(stream);
					});
				};
				const result = await streamUpload(req.files[field][0].buffer);
				galleryUrls.push(result.secure_url);
				galleryPublicIds.push(result.public_id);
			}
		}
		if (galleryUrls.length > 0) {
			vendor.galleryImages = galleryUrls;
			vendor.galleryImagePublicIds = galleryPublicIds;
		}

		await vendor.save();
		return res.json({ success: true, vendor });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};
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
			vendor: {
				_id: vendor._id,
				name: vendor.name,
				category: vendor.category,
				hourlyRate: vendor.hourlyRate,
				email: vendor.email,
				isAccountVerified: vendor.isAccountVerified,
				phone: vendor.phone || '',
				address: vendor.address || '',
				profileImageUrl: vendor.profileImageUrl || '',
				galleryImages: vendor.galleryImages || [],
				description: vendor.description || ''
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
