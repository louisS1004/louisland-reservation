/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AttractionsSection from './components/AttractionsSection';
import PracticalInfoSection from './components/PracticalInfoSection';
import PricingSection from './components/PricingSection';
import ReservationModal from './components/ReservationModal';
import Footer from './components/Footer';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState('standard-day');
  const [activeSection, setActiveSection] = useState('accueil');

  // Track active section for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'attractions', 'horaires', 'tarifs'];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenReservation = (packageId?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
    }
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-amber-300 selection:text-slate-950">
      {/* Simple, intuitive Navigation Bar */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        activeSection={activeSection}
      />

      {/* Main Home Hero with the Park Image and prominent Reservation Button */}
      <main className="flex-1">
        <Hero onOpenReservation={() => handleOpenReservation()} />

        {/* Attractions & Experiences */}
        <AttractionsSection onOpenReservation={() => handleOpenReservation()} />

        {/* Schedules & Access */}
        <PracticalInfoSection onOpenReservation={() => handleOpenReservation()} />

        {/* Pricing & Ticket Packages */}
        <PricingSection onSelectPackage={(pkgId) => handleOpenReservation(pkgId)} />
      </main>

      {/* Footer */}
      <Footer onOpenReservation={() => handleOpenReservation()} />

      {/* Interactive Reservation Flow Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
        initialPackageId={selectedPackageId}
      />
    </div>
  );
}
