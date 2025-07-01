// UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, decodeToken } from '../utils/auth.js';
import Cookies from 'js-cookie';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Client-side token validation (no backend calls)
const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decodedToken = decodeToken(token);
        if (!decodedToken) return false;

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.log('Token is expired');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
};

// UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Initialize user from token on mount
    useEffect(() => {
        initializeUser();
    }, []);

    const initializeUser = () => {
        try {
            setLoading(true);
            const accessToken = getAccessToken();

            if (accessToken && isTokenValid(accessToken)) {
                const decodedToken = decodeToken(accessToken);

                if (decodedToken && decodedToken.role) {
                    const userData = {
                        id: decodedToken.id || decodedToken.userId || decodedToken.sub,
                        email: decodedToken.email,
                        role: decodedToken.role,
                        name: decodedToken.name || decodedToken.username,
                        // Add any other fields from your JWT payload
                        exp: decodedToken.exp,
                        iat: decodedToken.iat
                    };

                    setUser(userData);
                    setIsLoggedIn(true);
                    console.log('User initialized from token:', userData);
                } else {
                    console.log('Invalid token structure or missing role');
                    clearUser();
                }
            } else {
                console.log('No valid access token found');
                clearUser();
            }
        } catch (error) {
            console.error('Error initializing user:', error);
            clearUser();
        } finally {
            setLoading(false);
        }
    };

    const loginUser = (accessToken) => {
        try {
            if (!accessToken) {
                console.error('No access token provided to loginUser');
                return false;
            }

            if (!isTokenValid(accessToken)) {
                console.error('Invalid or expired token provided to loginUser');
                return false;
            }

            const decodedToken = decodeToken(accessToken);

            if (decodedToken && decodedToken.role) {
                const userData = {
                    id: decodedToken.id || decodedToken.userId || decodedToken.sub,
                    email: decodedToken.email,
                    role: decodedToken.role,
                    name: decodedToken.name || decodedToken.username,
                    exp: decodedToken.exp,
                    iat: decodedToken.iat
                };

                setUser(userData);
                setIsLoggedIn(true);
                console.log('User logged in successfully:', userData);
                return true;
            } else {
                console.error('Failed to decode token or missing role in loginUser');
                return false;
            }
        } catch (error) {
            console.error('Error in loginUser:', error);
            return false;
        }
    };

    const logoutUser = () => {
        // Clear cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        // Clear user state
        clearUser();

        console.log('User logged out successfully');
    };

    const clearUser = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    const updateUser = (userData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...userData
        }));
    };

    // Check if current user is still valid (token not expired)
    const isCurrentUserValid = () => {
        if (!isLoggedIn || !user) return false;

        const accessToken = getAccessToken();
        return isTokenValid(accessToken);
    };

    // Helper functions to check user role
    const isAdmin = () => {
        return isCurrentUserValid() && user?.role === 'admin';
    };

    const isUser = () => {
        return isCurrentUserValid() && user?.role === 'user';
    };

    const hasRole = (role) => {
        return isCurrentUserValid() && user?.role === role;
    };

    const hasAnyRole = (roles) => {
        return isCurrentUserValid() && roles.includes(user?.role);
    };

    // Check authentication status
    const isAuthenticated = () => {
        return isCurrentUserValid();
    };

    // Context value
    const contextValue = {
        // User data
        user,
        isLoggedIn,
        loading,

        // Actions
        loginUser,
        logoutUser,
        updateUser,
        initializeUser,

        // Authentication check
        isAuthenticated,

        // Role checkers
        isAdmin,
        isUser,
        hasRole,
        hasAnyRole,

        // Direct access to user properties for convenience
        userRole: user?.role,
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};