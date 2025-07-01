import React from 'react';
import { motion } from 'framer-motion';

const RegisterFooter = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className="w-full py-4 px-6 border-t dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between"
        >
            <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
                <a href="/terms" className="hover:underline">
                    Terms
                </a>
                <a href="/privacy" className="hover:underline">
                    Privacy
                </a>
            </div>
        </motion.footer>
    );
};

export default RegisterFooter;
