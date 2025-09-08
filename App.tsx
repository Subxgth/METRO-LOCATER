import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import SearchSection from './SearchSection';
import LiveTracking from './LiveTracking';
import RoutePlanner from './RoutePlanner';
import StationsDirectory from './StationsDirectory';
import Footer from './Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'tracking':
        return <LiveTracking />;
      case 'planner':
        return <RoutePlanner />;
      case 'stations':
        return <StationsDirectory />;
      default:
        return (
          <>
            <HeroSection />
            <SearchSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="pt-16">
        {renderActiveSection()}
      </main>

      <Footer />
    </div>
  );
}

export default App;