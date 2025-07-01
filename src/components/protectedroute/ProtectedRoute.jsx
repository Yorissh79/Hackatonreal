// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useUser();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated (using Context API only)
    if (!isAuthenticated()) {
        console.log('User not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        console.log(`User role '${user?.role}' not allowed. Required: ${allowedRoles.join(', ')}`);

        // Redirect based on user's actual role
        const redirectPath = user?.role === 'admin' ? '/admin' :
            user?.role === 'user' ? '/user' : '/';
        return <Navigate to={redirectPath} replace />;
    }

    console.log(`Access granted for role: ${user?.role}`);

    // If all checks pass, render the protected component
    return <Outlet />;
};

export default ProtectedRoute;