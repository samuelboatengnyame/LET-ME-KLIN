import { useState } from 'react';
import { SERVICES } from '../data';
import { Service, ServiceCategory } from '../types';
import { 
  Home, Sparkles, Building, Layers, Truck, Hammer, Zap, Car,
  Search, ShieldCheck, Clock, Check, ChevronDown, ChevronUp, Calculator, ArrowRight 
} from 'lucide-react';

interface ServicesSectionProps {
  setView: (view: string) => void;
  setSelectedServiceId: (serviceId: string) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  Home, Sparkles, Building, Layers, Truck, Hammer, Zap, Car
};

export default function ServicesSection({ setView, setSelectedServiceId }: ServicesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedChecklist, setExpandedChecklist] = useState<Record<string, boolean>>({});

  // Quick Estimate Calculator State
  const [calcService, setCalcService] = useState<string>('home');
  const [calcSize, setCalcSize] = useState<number>(1); // bedrooms / count units
  const [calcBathrooms, setCalcBathrooms] = useState<number>(1);
  const [calcAddonFridge, setCalcAddonFridge] = useState(false);
  const [calcAddonOven, setCalcAddonOven] = useState(false);
  const [calcAddonWindows, setCalcAddonWindows] = useState(false);
  const [calculatorFrequency, setCalculatorFrequency] = useState<'once' | 'weekly' | 'biweekly' | 'monthly'>('once');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'home', label: 'Home' },
    { id: 'deep', label: 'Deep Intensive' },
    { id: 'office', label: 'Commercial' },
    { id: 'carpet', label: 'Sofas & Rugs' },
    { id: 'move', label: 'Move In/Out' },
    { id: 'carwash', label: 'Car Wash' },
    { id: 'construction', label: 'Construction' },
    { id: 'fumigation', label: 'Fumigation' },
  ];

  const getIcon = (iconName: string) => {
    const Component = CATEGORY_ICONS[iconName] || Sparkles;
    return <Component className="h-5 w-5" />;
  };

  const toggleChecklist = (serviceId: string) => {
    setExpandedChecklist(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  // Filter logic
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'all' || service.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate live estimate price
  const calculateEstimate = () => {
    const serviceObj = SERVICES.find(s => s.id === calcService);
    if (!serviceObj) return 0;

    let base = serviceObj.basePrice;
    
    // Size multiplier
    if (calcService === 'home' || calcService === 'deep' || calcService === 'move') {
      base += (calcSize - 1) * 35; // +$35 per additional bedroom
      base += (calcBathrooms - 1) * 20; // +$20 per additional bathroom
    } else if (calcService === 'office') {
      base += (calcSize - 1) * 80; // +$80 per additional 1,000 sqft multiplier
    } else if (calcService === 'carpet') {
      base += (calcSize - 1) * 45; // +$45 per additional seat / rug
    }

    // Addons
    if (calcAddonFridge) base += 25;
    if (calcAddonOven) base += 35;
    if (calcAddonWindows) base += 45;

    // Frequencies Discounts
    if (calculatorFrequency === 'weekly') base *= 0.8;
    else if (calculatorFrequency === 'biweekly') base *= 0.85;
    else if (calculatorFrequency === 'monthly') base *= 0.9;

    return Math.round(base);
  };

  const handleBookSelected = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setView('booking');
  };

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Expert Packages</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Our Cleaning Services</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Select a tailored plan, examine our meticulous checklist, or run our immediate price estimator below.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8" id="services-filter-panel">
          
          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search services (e.g. grout, upholstery, paint...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-end w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-350 dark:text-slate-350'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" id="services-card-grid">
          {filteredServices.map((service) => {
            const isChecklistOpen = expandedChecklist[service.id] || false;
            return (
              <div 
                key={service.id} 
                className="flex flex-col h-full rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-900 dark:bg-slate-900/60 overflow-hidden hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Visual Top Accent Card */}
                <div className="p-6 text-left flex-grow">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {getIcon(service.icon)}
                    </div>
                    <div>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">GH₵{service.basePrice}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold text-right">Base rate</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">{service.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 lines-clamp-2 min-h-[32px]">
                    {service.description}
                  </p>

                  <div className="flex items-center space-x-4 mt-3 py-2 border-y border-slate-100/60 dark:border-slate-900">
                    <span className="flex items-center text-[11px] font-semibold text-slate-500 dark:text-slate-450">
                      <Clock className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
                      {service.duration}
                    </span>
                    <span className="flex items-center text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                      <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                      Green Certified
                    </span>
                  </div>

                  {/* Expandable detailed Service checklists */}
                  <div className="mt-4">
                    <button
                      onClick={() => toggleChecklist(service.id)}
                      className="flex items-center justify-between w-full text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors"
                    >
                      <span>Checklist item overview ({service.checklist.length})</span>
                      {isChecklistOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {isChecklistOpen && (
                      <div className="mt-2.5 space-y-1.5 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-950/60 text-left border border-slate-100 dark:border-slate-900">
                        {service.checklist.map((item, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Check className="h-3.5 w-3.5 text-teal-500 mt-0.5 flex-shrink-0" />
                            <span className="text-[11px] text-slate-600 leading-tight dark:text-slate-350">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Button footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100/80 dark:bg-slate-950/20 dark:border-slate-900 flex gap-2">
                  <button
                    onClick={() => handleBookSelected(service.id)}
                    className="w-full inline-flex justify-center items-center space-x-1 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/10 transition-colors"
                  >
                    <span>Configure / Book</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Instant Estimator Section */}
        <div className="mt-16 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-lg dark:border-slate-900 dark:bg-slate-900 text-left transition-colors duration-300">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            
            {/* Left Col Intro */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">Quick Estimator</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tweak bedroom sizes, choose eco add-ons, and examine specialized discounts instantly before requesting a quote.
              </p>
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                <p className="text-xs text-slate-400">Selected Plan:</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">
                  {SERVICES.find(s => s.id === calcService)?.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Base rate: GH₵{SERVICES.find(s => s.id === calcService)?.basePrice ?? 0}
                </p>
              </div>
            </div>

            {/* Middle Col Config Inputs */}
            <div className="lg:col-span-5 space-y-4 border-slate-100 dark:border-slate-800 lg:border-x lg:px-8">
              
              {/* Service Select */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Select Service</label>
                <select
                  value={calcService}
                  onChange={(e) => {
                    setCalcService(e.target.value);
                    setCalcSize(1);
                    setCalcBathrooms(1);
                  }}
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2 outline-none bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Room size sliders */}
              {(calcService === 'home' || calcService === 'deep' || calcService === 'move') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Bedrooms Count: {calcSize}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      value={calcSize}
                      onChange={(e) => setCalcSize(parseInt(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Bathrooms Count: {calcBathrooms}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={calcBathrooms}
                      onChange={(e) => setCalcBathrooms(parseInt(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* Dynamic seat counts for sofas / carpets */}
              {calcService === 'carpet' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Sofas or Large Carpets: {calcSize}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={calcSize}
                    onChange={(e) => setCalcSize(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              )}

              {/* Dynamic size multipliers for Office */}
              {calcService === 'office' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Approx Sq Footage: {calcSize * 1000} SqFt
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={calcSize}
                    onChange={(e) => setCalcSize(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              )}

              {/* Recurring schedule discounts */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Client Frequency Discount</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'once', label: 'Once', discount: 'Regular' },
                    { id: 'weekly', label: 'Weekly', discount: '-20%' },
                    { id: 'biweekly', label: 'Bi-Wkly', discount: '-15%' },
                    { id: 'monthly', label: 'Mnthly', discount: '-10%' },
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setCalculatorFrequency(freq.id as any)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold tracking-tight text-center transition-all ${
                        calculatorFrequency === freq.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-350'
                      }`}
                    >
                      <div>{freq.label}</div>
                      <div className="opacity-80 text-[8px] font-medium">{freq.discount}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Addons Selection */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Optional Add-ons</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCalcAddonFridge(!calcAddonFridge)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${
                      calcAddonFridge
                        ? 'bg-emerald-50 border-emerald-500/50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    Fridge Interior (+GH₵25)
                  </button>
                  <button
                    onClick={() => setCalcAddonOven(!calcAddonOven)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${
                      calcAddonOven
                        ? 'bg-emerald-50 border-emerald-500/50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    Oven Interior (+GH₵35)
                  </button>
                  <button
                    onClick={() => setCalcAddonWindows(!calcAddonWindows)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${
                      calcAddonWindows
                        ? 'bg-emerald-50 border-emerald-500/50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    Detail Windows (+GH₵45)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Col Result Output */}
            <div className="lg:col-span-3 text-center space-y-4">
              <span className="text-[10px] tracking-widest font-extrabold text-slate-400 uppercase">Estimated Total</span>
              <div className="space-y-1">
                <p className="text-5xl font-black text-slate-950 dark:text-white">
                  GH₵{calculateEstimate()}
                </p>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-450">
                  Earns {Math.round(calculateEstimate() * 0.5)} loyalty points!
                </p>
              </div>

              <div className="text-xs text-slate-400 space-y-1">
                <p>Tax and equipment fees are included.</p>
                <p>Eco-safe bio-detergents included.</p>
              </div>

              <button
                onClick={() => handleBookSelected(calcService)}
                id="estimator-book-btn"
                className="w-full inline-flex justify-center items-center space-x-2 py-3 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Proceed to Schedule</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
