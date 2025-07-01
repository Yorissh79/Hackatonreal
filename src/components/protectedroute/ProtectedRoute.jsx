// src/components/protectedroute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx'; // Import the UserContext

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading authentication...</div>; // Or a spinner
    }

    if (!user.isAuthenticated) {
        // Not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Authenticated but not authorized, redirect to unauthorized page or home
        return <Navigate to="/" replace />; // Or a dedicated /unauthorized page
    }

    return <Outlet />; // User is authenticated and authorized, render the child routes
};

export default ProtectedRoute;