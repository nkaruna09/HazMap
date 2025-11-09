import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Landing } from './components/Landing';
import { PostRequest } from './components/PostRequest';
import { OfferSupply } from './components/OfferSupply';
import { Matches } from './components/Matches';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { Profile } from './components/Profile';
import { EmergencyButton } from './components/EmergencyButton';
import { Toaster } from './components/ui/sonner';

export type Page = 'home' | 'dashboard' | 'post-request' | 'offer-supply' | 'matches' | 'volunteer' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Landing onNavigate={setCurrentPage} />;
      case 'post-request':
        return <PostRequest onNavigate={setCurrentPage} />;
      case 'offer-supply':
        return <OfferSupply onNavigate={setCurrentPage} />;
      case 'matches':
        return <Matches />;
      case 'volunteer':
        return <VolunteerDashboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
      <EmergencyButton />
      <Toaster />
    </div>
  );
}