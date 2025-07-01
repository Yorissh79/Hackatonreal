import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#cfe7f0] via-[#fdf6e3] to-[#f9e0c0] flex items-center justify-center px-4 overflow-hidden">
      
      {/* Yumşaq blur background circles */}
      <div className="absolute w-[600px] h-[600px] bg-[#a5d8ff] opacity-20 blur-3xl rounded-full top-[-150px] left-[-150px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#ffe0b2] opacity-20 blur-2xl rounded-full bottom-[-120px] right-[-120px] animate-ping"></div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Yumşaq 404 rəqəmi */}
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#71c9ce] to-[#fcd5ce] animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-[#fcd5ce] mx-auto rounded-full"></div>
        </div>

        {/* Mesaj */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#4a4e69] mb-4">
            Ups! Səhifə Tapılmadı
          </h2>
          <p className="text-[#6c757d] text-lg leading-relaxed">
            Axtardığınız səhifə ya silinmiş, ya da yer dəyişmiş ola bilər. Gəlin sizi geri aparaq.
          </p>
        </div>

        {/* Düymələr */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a5d8ff] to-[#71c9ce] text-[#2e2e2e] font-medium rounded-lg hover:brightness-105 transform hover:scale-105 transition-all duration-300 shadow-md"
          >
            <Home size={20} />
            Ana Səhifəyə Get
          </button>
          
          <button 
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-md border border-[#ddd] text-[#4a4e69] font-medium rounded-lg hover:bg-white/70 transform hover:scale-105 transition-all duration-300 shadow"
          >
            <ArrowLeft size={20} />
            Geri Qayıt
          </button>
        </div>

        {/* Yardım linkləri */}
        <div className="mt-12 pt-8 border-t border-[#ddd]">
          <p className="text-[#999] text-sm mb-4">Köməyə ehtiyacınız var?</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a href="/contact" className="text-[#71c9ce] hover:text-[#5bbcc1] transition-colors underline">Dəstək</a>
            <a href="/sitemap" className="text-[#71c9ce] hover:text-[#5bbcc1] transition-colors underline">Sayt Xəritəsi</a>
            <a href="/help" className="text-[#71c9ce] hover:text-[#5bbcc1] transition-colors underline">Yardım Mərkəzi</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
