// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getAccessToken, decodeToken, isAuthenticated as checkAuthStatus } from '../utils/auth'; // Import from auth.js

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role: 'admin' | 'user', isAuthenticated: boolean }
    const [loading, setLoading] = useState(true);

    const initializeUser = useCallback(() => {
        setLoading(true);
        const token = getAccessToken();
        if (token && checkAuthStatus()) { // Check if token exists and is not expired
            const decoded = decodeToken(token);
            if (decoded && decoded.role) {
                setUser({ role: decoded.role, isAuthenticated: true });
            } else {
                setUser({ role: null, isAuthenticated: false });
            }
        } else {
            setUser({ role: null, isAuthenticated: false });
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        initializeUser();
        // You might want to re-initialize if the accessToken cookie changes
        // This is a basic setup, for more robust solutions, consider
        // listening to cookie changes or refreshing context on route changes.
    }, [initializeUser]);

    const loginUser = (token) => {
        // When logging in, decode the new token and set the user
        const decoded = decodeToken(token);
        if (decoded && decoded.role) {
            setUser({ role: decoded.role, isAuthenticated: true });
        } else {
            setUser({ role: null, isAuthenticated: true }); // Assume authenticated if token exists, but role is missing
        }
    };

    const logoutUser = () => {
        setUser({ role: null, isAuthenticated: false });
        // You should also clear cookies here or wherever your logout logic is handled
        // Cookies.remove('accessToken');
        // Cookies.remove('refreshToken');
    };

    return (
        <UserContext.Provider value={{ user, loading, loginUser, logoutUser, initializeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};