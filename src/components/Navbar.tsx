import { useState } from 'react';
import { Sparkles, Sun, Moon, ShieldCheck, User, Menu, X, Bell } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  user: UserProfile;
  darkMode: boolean;
  toggleDarkMode: () => void;
  bookingCount: number;
}

export default function Navbar({
  currentView,
  setView,
  user,
  darkMode,
  toggleDarkMode,
  bookingCount
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Book Online' },
    { id: 'gallery', label: 'Before & After' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => { setView('home'); setMobileMenuOpen(false); }} 
          className="flex cursor-pointer items-center space-x-2.5 group"
          id="nav-logo"
        >
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
            <div className="w-5 h-5 border-2 border-emerald-400 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-blue-950 dark:text-white underline decoration-emerald-500 decoration-4 underline-offset-4">
              LetMeKlyn
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" id="nav-desktop-menu">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setView(item.id)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30' 
                    : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Action Panel */}
        <div className="hidden sm:flex items-center space-x-3" id="nav-actions">
          {/* Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            id="theme-toggle-btn"
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 transition-all duration-200"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-500" />}
          </button>

          {/* Admin Station Trigger */}
          <button
            onClick={() => setView('admin')}
            id="nav-admin-btn"
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
              currentView === 'admin'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Admin ({bookingCount})</span>
          </button>

          {/* Profile Badge Link */}
          <button
            onClick={() => setView('profile')}
            id="nav-profile-btn"
            className={`flex items-center space-x-2 px-3  py-1.5 rounded-xl border border-blue-100 dark:border-blue-950 text-left transition-all duration-200 ${
              currentView === 'profile'
                ? 'bg-blue-50 dark:bg-blue-950/50'
                : 'hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs dark:bg-blue-950 dark:text-blue-300">
              SB
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-slate-800 dark:text-slate-100">{user.name}</p>
              <p className="text-[10px] text-slate-500 max-w-[100px] truncate dark:text-slate-400">{user.loyaltyTier} Tier</p>
            </div>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-2 sm:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-500" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-btn"
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden block border-t border-slate-100 bg-white/98 px-4 py-4 shadow-xl dark:border-slate-900 dark:bg-slate-950 transition-all duration-300" id="mobile-menu-container">
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/75 dark:bg-blue-950/45' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => { setView('profile'); setMobileMenuOpen(false); }}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <User className="h-5 w-5 text-slate-500" />
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800 dark:text-white">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.loyaltyTier} Member ({user.points} pts)</p>
              </div>
            </button>

            <button
              onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <ShieldCheck className="h-5 w-5 text-amber-500" />
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800 dark:text-white">Admin Dashboard</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total bookings: {bookingCount}</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
