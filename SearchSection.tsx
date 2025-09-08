import React, { useState, useRef } from 'react';
import { Search, Mic, MicOff, MapPin, ArrowRight } from 'lucide-react';

const SearchSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const stations = [
    'Aluva', 'Pulinchode', 'Companypady', 'Ambattukavu', 'Muttom',
    'Kalamassery', 'Cusat', 'Pathadipalam', 'Edapally', 'Changampuzha Park',
    'Palarivattom', 'JLN Stadium', 'Kaloor', 'Lissie', 'MG Road',
    'Maharajas', 'Ernakulam South', 'Kadavanthra', 'Elamkulam',
    'Vytilla', 'Thaikoodam', 'Petta', 'Devi', 'Town Hall', 'MG Road Extension'
  ];

  const filteredStations = stations.filter(station =>
    station.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceSupported(false);
      alert('Voice search is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    const SpeechRecognitionCtor =
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition; SpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition; SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition;
    recognitionRef.current = new SpeechRecognitionCtor();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleTrackNow = () => {
    if (searchQuery.trim()) {
      // Simulate tracking action
      alert(`Tracking metro trains for: ${searchQuery}`);
    } else {
      alert('Please enter a station name first');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Find Your Metro Train
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Search by station name or use voice commands to track your train in real-time
          </p>
        </div>

        {/* Search Interface */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
              <input
                type="text"
                placeholder="Enter station name (e.g., MG Road, Aluva)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-20 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg text-gray-900 placeholder-gray-500"
              />
              
              {/* Voice Button */}
              <button
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                disabled={!voiceSupported}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isListening ? 'Stop voice search' : 'Start voice search'}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Voice Status */}
            {isListening && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-red-500/20 backdrop-blur-sm border border-red-300 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-red-100">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Listening... Speak now</span>
                </div>
              </div>
            )}
          </div>

          {/* Track Now Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleTrackNow}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <MapPin className="h-5 w-5" />
              <span>Track Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Station Suggestions */}
          {searchQuery && filteredStations.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 max-h-60 overflow-y-auto">
              <div className="p-2">
                {filteredStations.slice(0, 8).map((station) => (
                  <button
                    key={station}
                    onClick={() => setSearchQuery(station)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2 text-gray-900"
                  >
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{station}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all cursor-pointer border border-white/20">
              <MapPin className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Nearest Station</h3>
              <p className="text-sm text-blue-100">Find closest metro station</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all cursor-pointer border border-white/20">
              <Search className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Route Finder</h3>
              <p className="text-sm text-blue-100">Plan your journey</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all cursor-pointer border border-white/20">
              <Mic className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Voice Commands</h3>
              <p className="text-sm text-blue-100">Speak your destination</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;