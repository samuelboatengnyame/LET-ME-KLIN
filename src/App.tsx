import { useState, useEffect } from 'react';
import { Booking, Review, UserProfile } from './types';
import { SERVICES, INITIAL_REVIEWS, INITIAL_USER } from './data';

// Import Modular Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUsSection from './components/AboutUsSection';
import ServicesSection from './components/ServicesSection';
import BookingSection from './components/BookingSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import UserProfileSection from './components/UserProfileSection';
import AdminDashboard from './components/AdminDashboard';
import ChatbotPanel from './components/ChatbotPanel';
import ContactSection from './components/ContactSection';

import { Sparkles, HeartHandshake, ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // States for dynamic Local databases
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('klyn_bookings');
    if (saved) return JSON.parse(saved);
    
    // Default preset bookings to bring the charts in Admin & Tracking timelines alive immediately
    return [
      {
        id: 'KLYN-82104',
        customerName: 'Sammy Boateng',
        email: 'sammyboateng5392@gmail.com',
        phone: '+233 557139811',
        address: 'Pantang-Madina',
        serviceId: 'deep',
        serviceName: 'Deep Intensive Cleaning',
        basePrice: 190,
        totalPrice: 161, // -15% biweekly plan discount
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        timeSlot: '11:00 AM - 01:30 PM',
        frequency: 'biweekly' as const,
        status: 'confirmed' as const,
        tracking: 'dispatched' as const, // active dispatched crew
        notes: 'Pay focus details to oven interior scale stains if possible.',
        rewardsEarned: 80
      },
      {
        id: 'KLYN-41908',
        customerName: 'Sammy Boateng',
        email: 'sammyboateng5392@gmail.com',
        phone: '+233 557139811',
        address: 'Pantang-Madina',
        serviceId: 'home',
        serviceName: 'Home Cleaning',
        basePrice: 110,
        totalPrice: 94,
        date: new Date(Date.now() - 432000000).toISOString().split('T')[0], // 5 days ago
        timeSlot: '08:00 AM - 10:30 AM',
        frequency: 'once' as const,
        status: 'completed' as const,
        tracking: 'completed' as const,
        notes: 'Door code is #1085.',
        rewardsEarned: 47
      }
    ];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('klyn_reviews');
    if (saved) return JSON.parse(saved);
    return INITIAL_REVIEWS;
  });

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Synchronise localStorage
  useEffect(() => {
    localStorage.setItem('klyn_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('klyn_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Dark mode trigger class listener
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Callback to insert new booking
  const handleBookingCreated = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    // Reward points to account profile state
    setUser(prev => ({
      ...prev,
      points: prev.points + newBooking.rewardsEarned,
      bookingsCount: prev.bookingsCount + 1,
      // increase loyalty rankings dynamically
      loyaltyTier: (prev.points + newBooking.rewardsEarned) >= 600 ? 'Platinum' : 'Gold'
    }));
  };

  // Callback to leave a review
  const handleAddReview = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
  };

  // Admin Controls
  const handleUpdateBookingStatus = (id: string, newStatus: any) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
    );
  };

  const handleUpdateTrackingState = (id: string, newState: any) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, tracking: newState } : b)
    );
  };

  const handleMockReset = () => {
    localStorage.removeItem('klyn_bookings');
    localStorage.removeItem('klyn_reviews');
    window.location.reload();
  };

  const setViewAndScroll = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans antialiased selection:bg-blue-650 selection:text-white flex flex-col justify-between">
      
      {/* Dynamic Header navbar */}
      <Navbar 
        currentView={currentView}
        setView={setViewAndScroll}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        bookingCount={bookings.length}
      />

      {/* Main Switcher Viewport */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="space-y-0 text-center animate-fade-in">
            {/* Splash Hero Header */}
            <HeroSection setView={setViewAndScroll} />
            
            {/* Value features sections */}
            <AboutUsSection />

            {/* Quick Pricing previews card */}
            <div className="bg-slate-100/50 py-16 dark:bg-slate-950/40">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
                  <span className="text-xs font-bold tracking-widest text-[#0ea5e9] uppercase">Professional Standard Packages</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Polished Detailing Tiers</h3>
                  <p className="text-sm text-slate-500">Fast baseline pricing without secret hidden admin fees.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {SERVICES.slice(0, 4).map((s) => (
                    <div key={s.id} className="rounded-2xl border border-slate-205/65 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-850 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-xs font-bold text-blue-600 block dark:text-blue-400 capitalize">{s.category}</span>
                        <h4 className="text-normal font-bold mt-1 text-slate-850 dark:text-white">{s.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-2 min-h-[36px]">{s.description}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="text-xs text-slate-400">Rate from:</span>
                        <span className="text-lg font-black text-slate-905 dark:text-slate-100">GH₵{s.basePrice}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setViewAndScroll('services')}
                  className="mt-10 rounded-xl bg-slate-900 border border-transparent hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 font-bold px-6 py-3 text-xs shadow-md transition-colors"
                >
                  Confirm / Customize Service checklist
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'services' && (
          <ServicesSection 
            setView={setViewAndScroll} 
            setSelectedServiceId={(sId) => {
              setSelectedServiceId(sId);
            }}
          />
        )}

        {currentView === 'booking' && (
          <BookingSection 
            selectedServiceId={selectedServiceId}
            userPoints={user.points}
            onBookingCreated={(newB) => {
              handleBookingCreated(newB);
              // automatically navigate user to profile view so they can watch live dispatcher animation
              setViewAndScroll('profile');
            }}
          />
        )}

        {currentView === 'gallery' && (
          <GallerySection />
        )}

        {currentView === 'testimonials' && (
          <TestimonialsSection 
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {currentView === 'about' && (
          <AboutUsSection />
        )}

        {currentView === 'contact' && (
          <ContactSection />
        )}

        {currentView === 'profile' && (
          <UserProfileSection 
            user={user}
            bookings={bookings}
            setSelectedBookingIdForTracking={() => {}}
            setView={setViewAndScroll}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onUpdateTrackingState={handleUpdateTrackingState}
            onMockReset={handleMockReset}
          />
        )}
      </main>

      {/* Floating Chatbot Component */}
      <ChatbotPanel />

      {/* Pristine Modern Footer */}
      <footer className="border-t border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-900 dark:bg-slate-950/65 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          <div className="space-y-4">
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">LetMeKlyn</span>
            <p className="max-w-[220px] text-slate-500 leading-relaxed text-[11px]">
              Premium, pet-safe, residential and corporate detailing with real-time state telemetry trackers.
            </p>
            <div className="flex items-center space-x-1 bg-teal-50 text-teal-800 dark:bg-teal-950/30 dark:text-teal-400 py-1 px-2.5 rounded text-[10px] font-bold w-fit border border-teal-200/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Certified 100% Eco-Standard</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">Service Catalog</h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => { setSelectedServiceId('home'); setViewAndScroll('booking'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Regular Home Clean</button></li>
              <li><button onClick={() => { setSelectedServiceId('deep'); setViewAndScroll('booking'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Deep Intensive sanitizing</button></li>
              <li><button onClick={() => { setSelectedServiceId('office'); setViewAndScroll('booking'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Office & Retail spaces</button></li>
              <li><button onClick={() => { setSelectedServiceId('carpet'); setViewAndScroll('booking'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Sofas & Carpet steam extraction</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">Company Info</h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setViewAndScroll('about')} className="hover:text-blue-600 dark:hover:text-blue-400">Our Story & Guarantee</button></li>
              <li><button onClick={() => setViewAndScroll('gallery')} className="hover:text-blue-600 dark:hover:text-blue-400">Before & After Slides</button></li>
              <li><button onClick={() => setViewAndScroll('testimonials')} className="hover:text-blue-600 dark:hover:text-blue-400">Client Reviews</button></li>
              <li><button onClick={() => setViewAndScroll('contact')} className="hover:text-blue-600 dark:hover:text-blue-400">Commercial Contact</button></li>
            </ul>
          </div>

          <div className="space-y-3 font-medium text-[11px] text-slate-500">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Urgent Support</h4>
            <div className="space-y-1.5 leading-normal">
              <p className="flex items-center">
                <Phone className="h-3.5 w-3.5 text-slate-400 mr-2 flex-shrink-0" />
                <span>+233 557139811</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-3.5 w-3.5 text-slate-400 mr-2 flex-shrink-0" />
                <span className="font-mono text-blue-600 dark:text-blue-400">concierge@letmeklyn.com</span>
              </p>
              <p className="flex items-center">
                <MapPin className="h-3.5 w-3.5 text-slate-400 mr-2 flex-shrink-0" />
                <span>Pantang-Madina, Ghana</span>
              </p>
            </div>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 pt-6 mt-8 dark:border-slate-900 text-center flex flex-col sm:flex-row justify-between text-[10px] text-slate-400">
          <p>© 2026 LetMeKlyn Cleaning Company. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2 sm:mt-0">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Sitemap Codebase</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
