import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%227%22/%3E%3Ccircle cx=%2253%22 cy=%227%22 r=%227%22/%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%227%22/%3E%3Ccircle cx=%227%22 cy=%2253%22 r=%227%22/%3E%3Ccircle cx=%2253%22 cy=%2253%22 r=%227%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Track Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Metro Train
              </span>
              in Real-time
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Advanced AI-powered metro tracking with voice commands, route planning, and live updates for KMRL Kochi Metro.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">Live Location</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Navigation className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium">Smart Routes</span>
            </div>
          </div>
        </div>

        {/* Multiple Metro Images Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {/* Metro Train 1 */}
          <div className="relative group">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
              <img
                src="/metro.jpg"
                alt="Metro train exterior"
                className="w-full h-48 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metro Train 2 */}
          <div className="relative group">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
              <img
                src="/people-in-train.jpg"
                alt="People in metro train"
                className="w-full h-48 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg shadow-lg">
                <Navigation className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Metro Train 3 */}
          <div className="relative group">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
              <img
                src="/metro-station.jpg"
                alt="Metro station platform"
                className="w-full h-48 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 p-2 rounded-lg shadow-lg">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;