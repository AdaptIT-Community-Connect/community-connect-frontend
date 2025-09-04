import Header from '@/components/Header';
import QuickActionCards from '@/components/QuickActionCards';
import ActiveJobsFeed from '@/components/ActiveJobsFeed';
import BottomNavigation from '@/components/BottomNavigation';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 pt-6">
        <QuickActionCards />
        <ActiveJobsFeed />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Home;