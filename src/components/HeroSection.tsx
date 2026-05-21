import { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, ShieldCheck, HeartHandshake, CheckCircle2, 
  ChevronRight, Award, Star, Sliders, Truck, Users, Leaf, Trash,
  MousePointerClick
} from 'lucide-react';

interface HeroSectionProps {
  setView: (view: string) => void;
}

export default function HeroSection({ setView }: HeroSectionProps) {
  // Preset list for interactive calculator
  const calcServices = [
    { id: 'home', name: 'Home Cleaning', base: 110, icon: '🏠', speed: 2 },
    { id: 'deep', name: 'Deep Intensive', base: 190, icon: '✨', speed: 4.5 },
    { id: 'office', name: 'Office Spaces', base: 240, icon: '🏢', speed: 3.5 },
    { id: 'carpet', name: 'Sofa & Carpet Clean', base: 130, icon: '🛋️', speed: 1.5 },
    { id: 'carwash', name: 'Car Wash', base: 85, icon: '🚗', speed: 1.5 }
  ];

  // Price Estimator state
  const [estService, setEstService] = useState('home');
  const [estBedrooms, setEstBedrooms] = useState(2);
  const [estFrequency, setEstFrequency] = useState('biweekly');

  // Math for instant quote
  const activeService = calcServices.find(s => s.id === estService) || calcServices[0];
  const roomCostMultiplier = 35;
  const subtotal = activeService.base + (estBedrooms - 1) * roomCostMultiplier;
  
  // Apply discount based on biweekly/weekly frequency
  const discountMultiplier = estFrequency === 'weekly' ? 0.80 : estFrequency === 'biweekly' ? 0.85 : 1.0;
  const totalCost = Math.round(subtotal * discountMultiplier);
  const calculatedHours = activeService.speed + (estBedrooms - 1) * 0.5;

  // Live dispatcher mockup state inside Bento Grid
  const [dispatchState, setDispatchState] = useState<'idle' | 'dispatched' | 'arrived' | 'cleaning' | 'completed'>('idle');
  const [dispatchProgress, setDispatchProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (dispatchState !== 'idle' && dispatchState !== 'completed') {
      interval = setInterval(() => {
        setDispatchProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDispatchState('completed');
            return 100;
          }
          const next = prev + 25;
          if (next === 25) setDispatchState('dispatched');
          if (next === 50) setDispatchState('arrived');
          if (next === 75) setDispatchState('cleaning');
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [dispatchState]);

  const startDispatchSimulation = () => {
    setDispatchProgress(0);
    setDispatchState('dispatched');
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Bento Header Title block */}
        <div className="mb-10 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-4xl">
          <div className="space-y-2">
            <span className="text-emerald-500 font-extrabold text-xs uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/20 inline-block">
              Premium Multi-Unit Cleaning System
            </span>
            <h1 className="text-4xl font-extrabold text-slate-905 text-slate-900 dark:text-white sm:text-5xl leading-tight">
              LetMeKlyn <span className="underline decoration-emerald-500 decoration-4 underline-offset-4">Bento Station</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
              Interact with our live pricing simulator coordinates, launch direct crew telemetry trackers, or arrange custom luxury plans on our bento grid below.
            </p>
          </div>
          
          <div className="flex gap-2">
            <span className="inline-flex h-3.5 w-3.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">14 Teams Active in Pantang-Madina</span>
          </div>
        </div>

        {/* Dynamic Bento Grid Grid Container */}
        <div className="grid grid-cols-12 gap-5" id="hero-bento-grid">
          
          {/* CARD 1: Large Premium Hero Hero Board (col-span-7) */}
          <section 
            className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-sm border border-slate-205 dark:border-slate-800 text-left flex flex-col justify-between min-h-[440px] group transition-all"
            id="hero-content"
          >
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                  Elite Standard
                </span>
                
                <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center transform rotate-12 shadow-md">
                  <span className="text-emerald-400 font-bold text-sm">5★</span>
                </div>
              </div>

              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-blue-950 dark:text-white leading-none tracking-tight">
                  The Gold Standard <br />
                  <span className="text-emerald-500">of Pristine Clean.</span>
                </h2>
                
                <p className="mt-5 text-slate-500 dark:text-slate-300 max-w-lg text-sm sm:text-base leading-relaxed">
                  Experience meticulously certified sanitization for luxury homes and office spaces. Vetted technicians, absolute checklisted accuracy, and pet-safe botanical chemicals starting at flat fixed rates.
                </p>
              </div>

              {/* Promo code badge embedded in hero */}
              <div className="inline-flex items-center space-x-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Sparkles className="h-4 w-4 text-emerald-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Get 15% Off with promo prefix <span className="font-mono bg-blue-105 border border-slate-200 dark:border-slate-800 py-0.5 px-2 rounded-lg text-blue-600 dark:bg-slate-900 dark:text-blue-400">KLYNNEW</span></span>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6 mt-8">
              {/* Bottom Avatars */}
              <div className="flex gap-3 items-center">
                <div className="flex -space-x-3">
                  <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" alt="avatar" />
                  <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" alt="avatar" />
                  <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" alt="avatar" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-450 font-medium">Over 2,400 satisfied Pantang-Madina cleans</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setView('booking')}
                  id="hero-book-now-btn"
                  className="bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-500 px-5  py-2.5 rounded-full text-xs font-bold shadow hover:bg-black transition-all flex items-center space-x-1.5 hover:-translate-y-0.5"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setView('services')}
                  id="hero-view-prices-btn"
                  className="bg-slate-100 font-bold hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-705 dark:text-slate-200 px-4 py-2.5 rounded-full text-xs transition-colors"
                >
                  Our Standards
                </button>
              </div>
            </div>

            {/* Background design glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-50 dark:bg-blue-950/20 rounded-full opacity-40 group-hover:scale-105 transition-transform duration-1000 z-0" />
          </section>

          {/* CARD 2: Quick Service Grid Block (col-span-5) */}
          <section 
            className="col-span-12 lg:col-span-5 bg-blue-950 text-white rounded-3xl p-6 shadow-lg border border-blue-900 flex flex-col justify-between text-left min-h-[440px]"
            id="hero-interactive-badge"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="space-y-0.5">
                  <span className="text-emerald-400 font-black text-[10px] tracking-wider uppercase">Packages Catalog</span>
                  <h3 className="text-lg font-black tracking-tight">Premium Detailing Tiers</h3>
                </div>
                <span onClick={() => setView('services')} className="text-xs text-blue-300 hover:text-emerald-400 cursor-pointer font-bold transition-colors">
                  Checklists
                </span>
              </div>

              {/* Selection cards inside grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {calcServices.map((cs) => {
                  const isSelected = estService === cs.id;
                  return (
                    <div 
                      key={cs.id}
                      onClick={() => setEstService(cs.id)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-emerald-600 border border-emerald-400 font-bold shadow-md' 
                          : 'bg-blue-900/60 border border-blue-900/10 hover:bg-blue-905 hover:border-emerald-500/30'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-lg mb-2">
                        {cs.icon}
                      </div>
                      <p className="text-[11px] font-extrabold leading-snug">{cs.name}</p>
                      <p className="text-[9px] text-blue-200 mt-1">From GH₵{cs.base}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary of Active Selection */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 mt-auto">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-blue-200">Selected Option:</span>
                <span className="text-xs font-bold text-emerald-400">{activeService.name}</span>
              </div>
              <p className="text-[10px] text-slate-300 leading-normal">
                Includes bio scrubbing detergents, extensive trash collection, micro-particle allergen extraction processes and a certified satisfaction guarantee.
              </p>
              <button 
                onClick={() => {
                  setView('booking');
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-650 hover:bg-emerald-600 text-white font-bold text-[11px] py-2 rounded-xl mt-1 tracking-wider uppercase shadow transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <span>Select & Book This Package</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </section>

          {/* CARD 3: Custom Live Quote Calculator (col-span-5) (VIBRANT EMERALD) */}
          <section className="col-span-12 md:col-span-6 lg:col-span-5 bg-emerald-500 text-white rounded-3xl p-6 shadow-md border-b-4 border-emerald-700 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-emerald-400/30 pb-3">
                <div className="space-y-0.5">
                  <span className="text-blue-950 font-extrabold text-[10px] tracking-wider uppercase">Coordinates Simulator</span>
                  <h3 className="text-lg font-black">Interactive Pricing Calculator</h3>
                </div>
                <div className="bg-blue-950/20 rounded-lg px-2 py-1 text-[10px] font-mono font-bold text-white">
                  Formula active
                </div>
              </div>

              {/* Service Display Selector sync */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/80 font-bold uppercase tracking-wider block">Service Category</label>
                <div className="grid grid-cols-4 gap-1">
                  {calcServices.map((cs) => (
                    <button
                      key={cs.id}
                      onClick={() => setEstService(cs.id)}
                      className={`py-1 px-1 text-[10px] rounded-lg font-bold transition-all ${
                        estService === cs.id 
                          ? 'bg-blue-950 text-white' 
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {cs.icon} {cs.id === 'carpet' ? 'Carpet' : cs.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms selectors */}
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-[11px] font-bold">
                  <label className="text-white/80 uppercase">Premises Layout (Rooms)</label>
                  <span>{estBedrooms} {estBedrooms === 1 ? 'Bedroom / Lounge' : 'Bedrooms'}</span>
                </div>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setEstBedrooms(num)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all ${
                        estBedrooms === num 
                          ? 'bg-blue-950 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Frequency selector */}
              <div className="space-y-2 mt-4">
                <label className="text-[10px] text-white/80 font-bold uppercase tracking-wider block">Plan Frequency</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'weekly', label: 'Weekly (20% Off)' },
                    { id: 'biweekly', label: 'Bi-Weekly (15% Off)' },
                    { id: 'once', label: 'Single Clean' }
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setEstFrequency(freq.id)}
                      className={`py-1 px-1 text-[9px] rounded-lg font-black truncate transition-all ${
                        estFrequency === freq.id 
                          ? 'bg-blue-950 text-white' 
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {freq.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Price Output */}
            <div className="mt-6 pt-4 border-t border-emerald-400/30">
              <div className="flex justify-between items-center text-left">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-blue-950 block">Instant Quote Estimate</span>
                  <p className="text-3xl font-black text-white mt-1">GH₵{totalCost}<span className="text-xs font-medium text-emerald-100">/job</span></p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-emerald-100">Estimated Effort:</span>
                  <span className="text-xs font-extrabold text-blue-950 font-mono">~{calculatedHours} hours</span>
                </div>
              </div>

              <button 
                onClick={() => setView('booking')}
                className="w-full bg-blue-950 hover:bg-black text-white py-3 rounded-2xl font-black text-xs hover:scale-[1.01] transition-all shadow mt-4 flex items-center justify-center space-x-1.5"
              >
                <span>Reserve this Rate Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* CARD 4: Satisfaction Trust badge (col-span-3) */}
          <section className="col-span-12 sm:col-span-4 lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-205 dark:border-slate-800 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Premium Trust Index</span>
            <p className="text-5xl font-black text-blue-900 dark:text-emerald-450 mt-3">100%</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold uppercase mt-1 tracking-wide">Satisfaction Rate</p>
            
            <div className="mt-3 flex gap-0.5 text-amber-500 text-lg">
              <Star className="h-4.5 w-4.5 fill-current" />
              <Star className="h-4.5 w-4.5 fill-current" />
              <Star className="h-4.5 w-4.5 fill-current" />
              <Star className="h-4.5 w-4.5 fill-current" />
              <Star className="h-4.5 w-4.5 fill-current" />
            </div>

            <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-4 leading-normal px-2">
              All bookings are supported by full 24h liability certification. We klyn it again free if any nook feels unpolished.
            </p>
          </section>

          {/* CARD 5: Simulated Live Dispatch Telemetry Widget (col-span-4) */}
          <section className="col-span-12 sm:col-span-8 lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 text-left flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">Live Telemetry Coordinates</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Active Dispatch Monitor</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                LetMeKlyn members watch client-team dispatch coordinates and progress checklists on their dashboard. Sim the telemetry process:
              </p>
            </div>

            {/* Simulation Tracker Layout */}
            <div className="my-4 space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-450 uppercase">Current Step:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 capitalize bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  {dispatchState === 'idle' ? 'Awaiting Sim' : dispatchState}
                </span>
              </div>

              {/* Step indicator dot timeline */}
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                <div 
                  className="absolute top-0 left-0 bottom-0 bg-emerald-500 transition-all duration-1000"
                  style={{ width: `${dispatchProgress}%` }}
                />
              </div>

              <div className="grid grid-cols-4 text-[9px] font-bold text-slate-400 text-center">
                <span className={dispatchProgress >= 25 ? 'text-emerald-500' : ''}>Dispatched</span>
                <span className={dispatchProgress >= 50 ? 'text-emerald-500' : ''}>Arrived</span>
                <span className={dispatchProgress >= 75 ? 'text-emerald-500' : ''}>Detailing</span>
                <span className={dispatchProgress >= 100 ? 'text-emerald-500' : ''}>Certified</span>
              </div>
            </div>

            {dispatchState === 'idle' || dispatchState === 'completed' ? (
              <button
                onClick={startDispatchSimulation}
                className="w-full inline-flex justify-center items-center space-x-1.5 py-2.5 rounded-xl border border-blue-200/60 text-blue-600 dark:border-blue-900/50 dark:text-blue-400 text-xs font-bold bg-blue-50/15 hover:bg-blue-50/30 transition-colors"
              >
                <Truck className="h-4.5 w-4.5" />
                <span>Simulate Dispatch Pipeline</span>
              </button>
            ) : (
              <div className="text-center py-2 text-[10px] text-slate-400 italic flex items-center justify-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Simulating pipeline tracker - wait 8s...</span>
              </div>
            )}
          </section>

        </div>

      </div>
    </section>
  );
}
