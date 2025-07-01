import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useUser();

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

    if (!isAuthenticated()) {
        // İstifadəçi giriş etməyibsə login səhifəsinə yönləndir
        return <Navigate to="/login" replace />;
    }

    // İstifadəçi varsa, amma rol icazə verilənlərdə yoxdursa
    if (allowedRoles.length > 0) {
        // User rolunu kiçik hərflə alırıq, əgər user undefined-dirsə, boş string kimi götürürük
        const userRole = (user?.role || '').toLowerCase();

        if (!allowedRoles.includes(userRole)) {
            // İstifadəçinin roluna görə uyğun səhifəyə yönləndir
            const redirectPath =
                userRole === 'admin' ? '/admin' :
                userRole === 'user' ? '/user' :
                '/';

            return <Navigate to={redirectPath} replace />;
        }
    }

    // Əgər hər şey qaydasındadırsa, icazə verilən routu göstər
    return <Outlet />;
};

export default ProtectedRoute;
