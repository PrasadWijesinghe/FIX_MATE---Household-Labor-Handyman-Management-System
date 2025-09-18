import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const VendorContext = createContext();

export const VendorContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
	const [isVendorLoggedin, setIsVendorLoggedin] = useState(false);
	const [vendorData, setVendorData] = useState(null);
	const navigate = useNavigate();

	const getVendorAuthState = async () => {
		try {
			const { data } = await axios.get(backendUrl + '/api/vendor/data', { withCredentials: true });
			if (data.success) {
				setIsVendorLoggedin(true);
				setVendorData(data.vendor);
			} else {
				setIsVendorLoggedin(false);
				setVendorData(null);
			}
		} catch (error) {
			setIsVendorLoggedin(false);
			setVendorData(null);
		}
	};

	useEffect(() => {
		getVendorAuthState();
	}, []);

	const value = {
		backendUrl,
		isVendorLoggedin, setIsVendorLoggedin,
		vendorData, setVendorData,
		getVendorAuthState,
	};

	return (
		<VendorContext.Provider value={value}>
			{props.children}
		</VendorContext.Provider>
	);
};
