import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import Footer from '@/components/Footer';
import QuickActionCards from '@/components/QuickActionCards';
import ActiveJobsFeed from '@/components/ActiveJobsFeed';
import BottomNavigation from '@/components/BottomNavigation';


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MissionSection />
        <QuickActionCards />
        <ActiveJobsFeed />
      </main>
       <BottomNavigation />
      <Footer />
    </div>
  );
};

export default Index;