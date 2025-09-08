import React from 'react';
import { Train, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
                <Train className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Metro Locator</span>
            </div>
            <p className="text-gray-300 text-sm">
              Advanced real-time metro tracking for KMRL Kochi Metro. Track trains, plan routes, and stay updated.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Live Tracking</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Route Planner</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Stations</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Fare Calculator</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Voice Commands</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile App</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Real-time Updates</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Accessibility</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1800-425-1111</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@metrolocator.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>KMRL, Kochi Metro</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Metro Locator. All rights reserved. | Built for KMRL Kochi Metro
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;