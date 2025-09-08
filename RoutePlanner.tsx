import React, { useState } from 'react';
import { MapPin, ArrowRight, Clock, DollarSign, Route } from 'lucide-react';

interface RouteResult {
  from: string;
  to: string;
  duration: string;
  fare: number;
  distance: string;
  stations: string[];
  interchanges: number;
}

const RoutePlanner: React.FC = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isPlanning, setIsPlanning] = useState(false);

  const stations = [
    'Aluva', 'Pulinchode', 'Companypady', 'Ambattukavu', 'Muttom',
    'Kalamassery', 'Cusat', 'Pathadipalam', 'Edapally', 'Changampuzha Park',
    'Palarivattom', 'JLN Stadium', 'Kaloor', 'Lissie', 'MG Road',
    'Maharajas', 'Ernakulam South', 'Kadavanthra', 'Elamkulam',
    'Vytilla', 'Thaikoodam', 'Petta', 'Devi', 'Town Hall'
  ];

  const calculateRoute = () => {
    if (!fromStation || !toStation) {
      alert('Please select both departure and destination stations');
      return;
    }

    if (fromStation === toStation) {
      alert('Departure and destination stations cannot be the same');
      return;
    }

    setIsPlanning(true);

    // Simulate route calculation
    setTimeout(() => {
      const fromIndex = stations.indexOf(fromStation);
      const toIndex = stations.indexOf(toStation);
      const stationsBetween = stations.slice(
        Math.min(fromIndex, toIndex),
        Math.max(fromIndex, toIndex) + 1
      );

      if (fromIndex > toIndex) {
        stationsBetween.reverse();
      }

      const distance = Math.abs(toIndex - fromIndex);
      const fare = Math.min(10 + (distance * 2), 40); // Base fare + distance fare, max ₹40

      setRouteResult({
        from: fromStation,
        to: toStation,
        duration: `${12 + distance * 2} min`,
        fare: fare,
        distance: `${(distance * 1.2).toFixed(1)} km`,
        stations: stationsBetween,
        interchanges: 0 // Assuming single line for now
      });

      setIsPlanning(false);
    }, 1500);
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Route Planner
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your metro journey with real-time fare calculation and optimal route suggestions
          </p>
        </div>

        {/* Route Planning Form */}
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* From Station */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                From Station
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                <select
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select departure station</option>
                  {stations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* To Station */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                To Station
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                <select
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select destination station</option>
                  {stations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={swapStations}
              disabled={!fromStation || !toStation}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Route className="h-5 w-5" />
              <span>Swap</span>
            </button>
            
            <button
              onClick={calculateRoute}
              disabled={isPlanning}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              {isPlanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Planning Route...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="h-5 w-5" />
                  <span>Plan Route</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Route Result */}
        {routeResult && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Recommended Route
            </h3>

            {/* Route Summary */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {routeResult.duration}
                </div>
                <div className="text-sm text-gray-600">Travel Time</div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 text-center">
                <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  ₹{routeResult.fare}
                </div>
                <div className="text-sm text-gray-600">Fare</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Route className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {routeResult.distance}
                </div>
                <div className="text-sm text-gray-600">Distance</div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <MapPin className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  {routeResult.stations.length}
                </div>
                <div className="text-sm text-gray-600">Stations</div>
              </div>
            </div>

            {/* Station Route */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Station Route
              </h4>
              <div className="flex flex-wrap gap-2">
                {routeResult.stations.map((station, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`px-3 py-2 rounded-lg font-medium ${
                      index === 0
                        ? 'bg-green-100 text-green-700'
                        : index === routeResult.stations.length - 1
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {station}
                    </div>
                    {index < routeResult.stations.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoutePlanner;