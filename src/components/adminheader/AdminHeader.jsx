import React, { useState } from 'react';
import {
    Bell,
    Menu,
    X,
    Sun,
    Moon,
    Settings,
    User,
    LogOut,
    ChevronDown,
    Hotel,
    Users,
    Bed
} from 'lucide-react';
import useDarkMode from '../../hooks/useDarkmode'; // Import the actual dark mode hook

const AdminHeader = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the actual hook
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

    // Mock data
    const notifications = [
        { id: 1, message: "New booking from John Doe", time: "2 min ago", type: "booking" },
        { id: 2, message: "Room 205 maintenance completed", time: "1 hour ago", type: "maintenance" },
        { id: 3, message: "Payment received for Booking #1234", time: "3 hours ago", type: "payment" }
    ];

    const stats = [
        { label: "Total Rooms", value: "156", icon: Bed, change: "+2" },
        { label: "Active Guests", value: "89", icon: Users, change: "+12" },
        { label: "Occupancy", value: "78%", icon: Hotel, change: "+5%" }
    ];

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50 transition-all duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left section - Logo and Navigation */}
                        <div className="flex items-center space-x-4">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-200"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>

                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Hotel className="w-5 h-5 text-white" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                                        HotelAdmin
                                    </h1>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Management Suite</p>
                                </div>
                            </div>
                        </div>

                        {/* Right section - Actions */}
                        <div className="flex items-center space-x-2">
                            {/* Theme toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                                    className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-200"
                                    aria-label="Notifications"
                                >
                                    <Bell size={18} />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                                        3
                                    </span>
                                </button>

                                {/* Notification dropdown */}
                                {isNotificationDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                                    <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profile dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">JD</span>
                                    </div>
                                    <ChevronDown size={14} className="hidden sm:block" />
                                </button>

                                {/* Profile dropdown */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                            <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Admin</p>
                                        </div>
                                        <div className="py-1">
                                            <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                                <User size={16} />
                                                <span>Profile</span>
                                            </button>
                                            <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                                <Settings size={16} />
                                                <span>Settings</span>
                                            </button>
                                            <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150">
                                                <LogOut size={16} />
                                                <span>Sign out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick stats bar */}
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                            <stat.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="hidden sm:block">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                                                <span className="text-xs text-green-600 dark:text-green-400">{stat.change}</span>
                                            </div>
                                        </div>
                                        <div className="sm:hidden">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Last updated: {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Hotel className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-bold text-gray-900 dark:text-white">HotelAdmin</h1>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                {/* Add your mobile navigation items here */}
                                <nav className="space-y-2">
                                    <a href="#" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Dashboard
                                    </a>
                                    <a href="#" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Rooms
                                    </a>
                                    <a href="#" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Customers
                                    </a>
                                    <a href="#" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Bookings
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default AdminHeader;