import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Search for pages..."
              className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Home size={20} />
            Go Home
          </button>
          
          <button 
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">Need help? Try these:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Support</a>
            <a href="/sitemap" className="text-blue-400 hover:text-blue-300 transition-colors">Site Map</a>
            <a href="/help" className="text-blue-400 hover:text-blue-300 transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;