import { useState, useEffect } from 'react';

const useDarkMode = () => {
    // Initialize state from localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check if there's a saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Fall back to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // Only update if user hasn't set a manual preference
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const setLightMode = () => {
        setIsDarkMode(false);
    };

    const setDarkModeOn = () => {
        setIsDarkMode(true);
    };

    return {
        isDarkMode,
        toggleDarkMode,
        setLightMode,
        setDarkMode: setDarkModeOn
    };
};

export default useDarkMode;