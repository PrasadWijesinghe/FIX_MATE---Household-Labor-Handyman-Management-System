import jwt from "jsonwebtoken";

const supplierAuth = async (req, res, next) => {
	const { supplier_token } = req.cookies;

	if (!supplier_token) {
		return res.json({ success: false, message: 'Not Authorized. Login Again' });
	}

	try {
		const tokenDecode = jwt.verify(supplier_token, process.env.JWT_SECRET);

		if (tokenDecode.id) {
			req.user = { id: tokenDecode.id };
		} else {
			return res.json({ success: false, message: 'Not Authorized. Login Again' });
		}
		next();
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

export default supplierAuth;
