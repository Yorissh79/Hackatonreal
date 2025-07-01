import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const RegisterHeader = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDark = () => {
        document.documentElement.classList.toggle('dark');
        setDarkMode(!darkMode);
        localStorage.setItem('theme', darkMode ? 'light' : 'dark');
    };

    return (
        <header className="flex items-center justify-between p-4 shadow-sm bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
                <img
                    src="/logo.svg"
                    alt="Logo"
                    className="w-8 h-8"
                />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create Account
                </h1>
            </div>

            <motion.button
                whileTap={{ rotate: 180 }}
                onClick={toggleDark}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle dark mode"
            >
                {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
            </motion.button>
        </header>
    );
};

export default RegisterHeader;
