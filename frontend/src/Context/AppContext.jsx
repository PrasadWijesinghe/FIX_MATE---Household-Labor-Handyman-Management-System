/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import React, { createContext, useEffect, useState, useCallback } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
 
    const getUserData = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data', { withCredentials: true });
            if (data.success) {
                if (data.userData && data.userData._id) {
                    setUserData(data.userData);
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                setUserData(null);
                setIsLoggedin(false);
            } else {
                // console.debug('getUserData error:', error?.message || error);
            }
        }
    }, [backendUrl]);

    const getAuthState = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth', { withCredentials: true });
            if (data.success) {
                setIsLoggedin(true);
                getUserData();
            } else {
                // Not authenticated: silently clear state
                setIsLoggedin(false);
                setUserData(null);
            }
        } catch {
            // Suppress toast on 401 to avoid noisy popups on reload
            setIsLoggedin(false);
            setUserData(null);
        }
    }, [backendUrl, getUserData]);

    useEffect(() => {
        getAuthState();
    }, [getAuthState]);

    // getUserData wrapped above



    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
    
        getUserData,
       
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};