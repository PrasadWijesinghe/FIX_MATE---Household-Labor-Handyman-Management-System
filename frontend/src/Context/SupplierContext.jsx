import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SupplierContext = createContext();

export const SupplierContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
	const [isSupplierLoggedin, setIsSupplierLoggedin] = useState(false);
	const [supplierData, setSupplierData] = useState(null);
	const navigate = useNavigate();

	const getSupplierAuthState = async () => {
		try {
			const { data } = await axios.get(backendUrl + '/api/supplier/data', { withCredentials: true });
			if (data.success) {
				setIsSupplierLoggedin(true);
				setSupplierData(data.supplierData);
			} else {
				setIsSupplierLoggedin(false);
				setSupplierData(null);
			}
		} catch (error) {
			setIsSupplierLoggedin(false);
			setSupplierData(null);
		}
	};

	useEffect(() => {
		getSupplierAuthState();
	}, []);

	const value = {
		backendUrl,
		isSupplierLoggedin, setIsSupplierLoggedin,
		supplierData, setSupplierData,
		getSupplierAuthState,
	};

	return (
		<SupplierContext.Provider value={value}>
			{props.children}
		</SupplierContext.Provider>
	);
};
