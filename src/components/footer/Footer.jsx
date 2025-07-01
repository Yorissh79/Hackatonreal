
import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-8 py-12" >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="text-2xl font-serif italic mb-8">
              ROOMEASER
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4 text-gray-300">
              ABOUT US
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">About One&Only</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Our Resorts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Private Homes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4 text-gray-300">
              NEWS AND AWARDS
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Media Centre</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Awards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Newsletter Signup</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4 text-gray-300">
              TERMS & CONDITIONS
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Website Terms</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Sitemap</a></li>
            </ul>
          </div>

          {/* Contact & Kerzner */}
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold tracking-wider mb-4 text-gray-300">
                CONTACT
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold tracking-wider mb-4 text-gray-300">
                KERZNER
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">Atlantis</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xl">SIRO</a></li>
             </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={26} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={26} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={26} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={26} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={26} />
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-4">
            <p className="text-l text-gray-400 tracking-wider">
              2025 © KERZNER INTERNATIONAL LIMITED. ALL RIGHTS RESERVED.
            </p>
            
            {/* Back to Top Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowUp size={26} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;