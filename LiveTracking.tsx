import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Train, ArrowRight, Zap } from 'lucide-react';

interface TrainStatus {
  id: string;
  route: string;
  currentStation: string;
  nextStation: string;
  delay: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
  eta: string;
  direction: string;
}

const routes = ['Blue Line', 'Green Line (Extension)'];

const mockTrainData: TrainStatus[] = [
    {
      id: 'ML-001',
      route: 'Blue Line',
      currentStation: 'MG Road',
      nextStation: 'Lissie',
      delay: 0,
      crowdLevel: 'Medium',
      eta: '2 min',
      direction: 'Towards Tripunithura'
    },
    {
      id: 'ML-002',
      route: 'Blue Line',
      currentStation: 'Vytilla',
      nextStation: 'Thaikoodam',
      delay: 1,
      crowdLevel: 'Low',
      eta: '4 min',
      direction: 'Towards Aluva'
    },
    {
      id: 'ML-003',
      route: 'Blue Line',
      currentStation: 'Kalamassery',
      nextStation: 'Cusat',
      delay: -1,
      crowdLevel: 'High',
      eta: '1 min',
      direction: 'Towards Tripunithura'
    },
    {
      id: 'ML-004',
      route: 'Blue Line',
      currentStation: 'Palarivattom',
      nextStation: 'JLN Stadium',
      delay: 2,
      crowdLevel: 'Medium',
      eta: '3 min',
      direction: 'Towards Aluva'
    }
];

const LiveTracking: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('Blue Line');
  const [trainStatuses, setTrainStatuses] = useState<TrainStatus[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates
    setTrainStatuses(mockTrainData.filter(train => train.route === selectedRoute));
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate small changes in train positions
      setTrainStatuses(prev => prev.map(train => ({
        ...train,
        eta: `${Math.max(1, parseInt(train.eta) + Math.floor(Math.random() * 2 - 1))} min`,
        delay: train.delay + Math.floor(Math.random() * 2 - 1)
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedRoute]);

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getDelayColor = (delay: number) => {
    if (delay <= 0) return 'text-green-600';
    if (delay <= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Train Tracking</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Real-time location and status of all metro trains on the network
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Zap className="h-4 w-4 text-green-500" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Route Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {routes.map((route) => (
              <button
                key={route}
                onClick={() => setSelectedRoute(route)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedRoute === route
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                {route}
              </button>
            ))}
          </div>
        </div>

        {/* Train Status Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {trainStatuses.map((train) => (
            <div
              key={train.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Train className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Train {train.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {train.direction}
                    </p>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCrowdColor(train.crowdLevel)}`}>
                  {train.crowdLevel} Crowd
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-gray-900">Current:</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    {train.currentStation}
                  </span>
                </div>

                <div className="flex items-center justify-center py-2">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-gray-900">Next:</span>
                  </div>
                  <span className="font-semibold text-blue-600">
                    {train.nextStation}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">ETA:</span>
                    <span className="font-bold text-lg">{train.eta}</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm text-gray-600">Delay:</span>
                    <span className={`font-semibold ml-1 ${getDelayColor(train.delay)}`}>
                      {train.delay > 0 ? `+${train.delay}` : train.delay} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {trainStatuses.length === 0 && (
          <div className="text-center py-12">
            <Train className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">
              No trains currently active on {selectedRoute}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveTracking;