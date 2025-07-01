// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isAdmin, isUser, refreshAccessToken } from '../../utils/auth.js';
import {getRefreshToken} from "../../utils/auth.js"; // Adjust path

const ProtectedRoute = ({ allowedRoles }) => {
    const authenticated = isAuthenticated();
    const userIsAdmin = isAdmin();
    const userIsUser = isUser();

    // Attempt to refresh token if access token is expired but refresh token exists
    if (!authenticated && getRefreshToken()) {
        refreshAccessToken().then(success => {
            if (success) {
                // If refresh was successful, re-evaluate authorization
                window.location.reload(); // A simple way to re-trigger route evaluation
            } else {
                // If refresh failed, redirect to login
                return <Navigate to="/register/login" replace />;
            }
        });
        return null; // Don't render anything while refreshing
    }

    if (!authenticated) {
        return <Navigate to="/register/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const hasRequiredRole = allowedRoles.some(role => {
            if (role === 'admin' && userIsAdmin) return true;
            return !!(role === 'user' && userIsUser);
        });

        if (!hasRequiredRole) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />; // Render the child routes
};

export default ProtectedRoute;