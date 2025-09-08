import React, { useState } from 'react';
import { MapPin, Clock, Users, Wifi, Car, Accessibility } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  line: string;
  openTime: string;
  closeTime: string;
  facilities: string[];
  crowdLevel: 'Low' | 'Medium' | 'High';
  parking: boolean;
  accessibility: boolean;
  coordinates: { lat: number; lng: number };
}

const StationsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLine, setSelectedLine] = useState('All');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const stations: Station[] = [
    {
      id: 'aluva',
      name: 'Aluva',
      line: 'Blue Line',
      openTime: '05:30',
      closeTime: '22:00',
      facilities: ['Parking', 'WiFi', 'Restrooms', 'Food Court', 'ATM'],
      crowdLevel: 'High',
      parking: true,
      accessibility: true,
      coordinates: { lat: 10.1102, lng: 76.3528 }
    },
    {
      id: 'mg-road',
      name: 'MG Road',
      line: 'Blue Line',
      openTime: '05:30',
      closeTime: '22:00',
      facilities: ['WiFi', 'Restrooms', 'Shopping', 'ATM', 'Elevators'],
      crowdLevel: 'High',
      parking: false,
      accessibility: true,
      coordinates: { lat: 9.9312, lng: 76.2673 }
    },
    {
      id: 'vytilla',
      name: 'Vytilla',
      line: 'Blue Line',
      openTime: '05:30',
      closeTime: '22:00',
      facilities: ['Parking', 'WiFi', 'Restrooms', 'Bus Terminal', 'ATM'],
      crowdLevel: 'High',
      parking: true,
      accessibility: true,
      coordinates: { lat: 9.9640, lng: 76.3167 }
    },
    {
      id: 'palarivattom',
      name: 'Palarivattom',
      line: 'Blue Line',
      openTime: '05:30',
      closeTime: '22:00',
      facilities: ['WiFi', 'Restrooms', 'Shops', 'ATM'],
      crowdLevel: 'Medium',
      parking: false,
      accessibility: true,
      coordinates: { lat: 10.0067, lng: 76.3111 }
    },
    {
      id: 'kalamassery',
      name: 'Kalamassery',
      line: 'Blue Line',
      openTime: '05:30',
      closeTime: '22:00',
      facilities: ['Parking', 'WiFi', 'Restrooms', 'ATM'],
      crowdLevel: 'Medium',
      parking: true,
      accessibility: true,
      coordinates: { lat: 10.0525, lng: 76.3272 }
    },
    {
      id: 'edapally',
      name: 'Edapally',
      line: 'Blue Line',
      openTime: '05:30',
      closeTime: '22:00',
      facilities: ['WiFi', 'Restrooms', 'Shopping Mall', 'ATM', 'Food Court'],
      crowdLevel: 'High',
      parking: false,
      accessibility: true,
      coordinates: { lat: 10.0261, lng: 76.3081 }
    }
  ];

  const lines = ['All', 'Blue Line', 'Green Line (Extension)'];

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLine = selectedLine === 'All' || station.line === selectedLine;
    return matchesSearch && matchesLine;
  });

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Metro Stations Directory
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all metro stations with detailed information about facilities, timings, and accessibility
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedLine}
              onChange={(e) => setSelectedLine(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {lines.map((line) => (
                <option key={line} value={line}>
                  {line}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {station.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCrowdColor(station.crowdLevel)}`}>
                  {station.crowdLevel}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-600">
                    {station.line}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{station.openTime} - {station.closeTime}</span>
                </div>

                <div className="flex items-center space-x-4">
                  {station.parking && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Car className="h-4 w-4" />
                      <span className="text-xs">Parking</span>
                    </div>
                  )}
                  {station.accessibility && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Accessibility className="h-4 w-4" />
                      <span className="text-xs">Accessible</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 text-purple-600">
                    <Wifi className="h-4 w-4" />
                    <span className="text-xs">WiFi</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {station.facilities.slice(0, 3).map((facility) => (
                    <span
                      key={facility}
                      className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600"
                    >
                      {facility}
                    </span>
                  ))}
                  {station.facilities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                      +{station.facilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">
              No stations found matching your criteria
            </p>
          </div>
        )}

        {/* Station Detail Modal */}
        {selectedStation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedStation.name} Station
                  </h2>
                  <button
                    onClick={() => setSelectedStation(null)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900">
                      Station Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-600">
                          {selectedStation.line}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">
                          {selectedStation.openTime} - {selectedStation.closeTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCrowdColor(selectedStation.crowdLevel)}`}>
                          {selectedStation.crowdLevel} Crowd Level
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900">
                      Facilities & Services
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedStation.facilities.map((facility) => (
                        <div
                          key={facility}
                          className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {facility}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-center space-x-4">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      Get Directions
                    </button>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                      Track Trains
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StationsDirectory;