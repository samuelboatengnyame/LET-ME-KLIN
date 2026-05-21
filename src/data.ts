import { Service, Review, SubscriptionPlan, UserProfile } from './types';

export const SERVICES: Service[] = [
  {
    id: 'home',
    name: 'Home Cleaning',
    category: 'home',
    icon: 'Home',
    description: 'Bespoke residential sanitizing for a pristine, healthy living space.',
    basePrice: 110,
    duration: '2.5 - 4 hours',
    checklist: [
      'Dust and wipe down all reachable surfaces',
      'Vacuum all rugs, carpets, and upholstery',
      'Mop hard floors with eco-friendly sanitizers',
      'Thoroughly sanitize bathrooms (tub, tile, toilets, mirrors)',
      'Clean kitchen countertops, sinks, and appliance exteriors',
      'Empty all indoor wastebaskets'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'deep',
    name: 'Deep Intensive Cleaning',
    category: 'deep',
    icon: 'Sparkles',
    description: 'Thorough, top-to-bottom detailing focusing on hard-to-reach areas and heavy grime.',
    basePrice: 190,
    duration: '4 - 6 hours',
    checklist: [
      'Grout scrubbing in bathroom & kitchen tiles',
      'Detail cleaning of baseboards, light switches, and door frames',
      'Interior oven, microwave, and refrigerator cleaning',
      'Dusting of ceiling fans, vents, and lighting fixtures',
      'Behind and under light furniture cleaning',
      'Cabinet exterior and interior wipe down'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'office',
    name: 'Office & Commercial Cleaning',
    category: 'office',
    icon: 'Building',
    description: 'Professional cleaning for corporate offices, retail spaces, and startup hubs.',
    basePrice: 240,
    duration: '3 - 5 hours',
    checklist: [
      'Desk, workstation, and keyboard sanitation',
      'Meeting room and common area dusting and wiping',
      'Restroom deep cleaning and supply restocking',
      'Kitchenette, coffee station, and breakroom hygiene',
      'High-traffic floor vacuuming and mopping',
      'Document printer areas and waste handling'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'carpet',
    name: 'Sofa & Carpet Extraction',
    category: 'carpet',
    icon: 'Layers',
    description: 'High-temperature steam extraction for deep-seated dirt, dust mites, and stubborn stains.',
    basePrice: 130,
    duration: '1.5 - 3 hours',
    checklist: [
      'Fiber testing for optimized enzyme selection',
      'Industrial-grade deep pile vacuuming',
      'Pre-treatment of stubborn wine, coffee, and ink spots',
      'High-pressure steam injection and extraction cycles',
      'Fabric deodorizing and pH-neutralizing rinse',
      'Rapid blower drying process'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'move',
    name: 'Move-in / Move-out Cleaning',
    category: 'move',
    icon: 'Truck',
    description: 'Immaculate empty-property deep clean to ensure deposit returns or moving readiness.',
    basePrice: 280,
    duration: '5 - 8 hours',
    checklist: [
      'Clean inside and outside of all empty cabinets, drawers, and closets',
      'Clean interior surfaces of all windows, tracks, and frames',
      'Full wall spot removal and door panel washing',
      'Scale and mold eradication in showers, sinks, and tubs',
      'Polishing of all stainless steel appliances',
      'Detailed floor scrub and garage sweep'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'construction',
    name: 'Post-Construction Detailing',
    category: 'construction',
    icon: 'Hammer',
    description: 'Aggressive fine dust elimination and paint/sticker removal after renovation work.',
    basePrice: 350,
    duration: '6 - 10 hours',
    checklist: [
      'HEPA-vacuuming of high-density fine plaster dust',
      'Careful scraping of paint spatters, tape glue, and plaster drips',
      'Scrubbing inside air registers and behind vent covers',
      'Detailed window washing including tracks and external high sills',
      'Heavy buffing of laminate, tile, or hardwood floors',
      'Removal of construction safety stickers and plastic wraps'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fumigation',
    name: 'Fumigation & Pest Disinfection',
    category: 'fumigation',
    icon: 'Zap',
    description: 'Eco-conscious insecticide aerosol treatment and medical-grade surface disinfection.',
    basePrice: 160,
    duration: '2 - 4 hours',
    checklist: [
      'Property perimeter assessment for entry hotspots',
      'Targeted bio-safe insecticide gel application',
      'Thermal cold-fogging disinfection for viruses and fungal spores',
      'Safe botanical-based pest repellent aerosoling',
      'Air scrub and quality check after 1-hour wait window',
      'Safety guideline brief and residual defense plan'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1528740561666-42477ef02524?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'carwash',
    name: 'Car Washing & Detailing',
    category: 'carwash',
    icon: 'Car',
    description: 'Eco-conscious exterior steam wash and high-gloss interior vacuuming and detailing.',
    basePrice: 85,
    duration: '1 - 2 hours',
    checklist: [
      'Eco-friendly interior seat vacuuming and leather conditioning',
      'Exterior high-gloss detailing & non-streaking window wipe',
      'Dashboard, vents, and console dusting with anti-static agents',
      'Tire cleaning, tire shine coat, and rim polishing',
      'Odor deodorizing and active carpet brush'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eed69?q=80&w=600&auto=format&fit=crop'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'LetMeKlyn did an absolute miracle on my apartment after moving out. The oven looks brand new, and they actually managed to clean the window tracks perfectly! 100% recommended!',
    date: '2026-05-14',
    serviceType: 'Move-in / Move-out Cleaning',
    verified: true,
    reply: 'Thank you, Eleanor! We make sure end-of-tenancy cleanings are seamless so you get your full deposit back!'
  },
  {
    id: 'r2',
    author: 'Marcus Brody',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'The office desk sanitation and high-traffic dusting were exceptional. The cleaners arrived looking very smart in uniforms, finished ahead of schedule, and checked off every single item.',
    date: '2026-05-18',
    serviceType: 'Office & Commercial Cleaning',
    verified: true,
    reply: 'Thrilled to hear it, Marcus! A clean desk increases workspace productivity. Looking forward to our next bi-weekly session!'
  },
  {
    id: 'r3',
    author: 'Sonia Alvarez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
    rating: 4,
    text: 'We booked a deep spring clean and the attention to detail was exceptional. They brought all their own eco-friendly detergents which smell fresh instead of heavy chemicals. Missed one ceiling fan but immediately polished it when pointed out.',
    date: '2026-05-10',
    serviceType: 'Deep Intensive Cleaning',
    verified: true,
    reply: 'Good catch, Sonia! Thank you for letting our crew know immediately. Eco-friendly cleaning is our absolute standard!'
  }
];

export const SUBSCRIPTIONS: SubscriptionPlan[] = [
  {
    id: 'sub-weekly',
    name: 'Weekly Comfort',
    price: 90, // discounted price per session
    frequency: 'weekly',
    discountPercent: 20,
    features: [
      'Prioritized scheduling slots',
      'Free interior appliance cleaning once a month',
      'Dedicated primary cleaner assigned',
      'Complimentary pet hair detailing',
      'Cancel or reschedule anytime with 12h notice'
    ]
  },
  {
    id: 'sub-biweekly',
    name: 'Bi-Weekly Prime',
    price: 99,
    frequency: 'biweekly',
    discountPercent: 15,
    features: [
      'Guaranteed regular rotation check-ins',
      'Eco-friendly aromatherapy detergents',
      '50% off steam extraction carpets add-ons',
      'Priority customer care responder',
      'Digital service tracking report'
    ]
  },
  {
    id: 'sub-monthly',
    name: 'Monthly Deep Refresh',
    price: 104,
    frequency: 'monthly',
    discountPercent: 10,
    features: [
      'Extended time allocations (+30m)',
      'Cabinet interior sanitizing included',
      'Allergy prevention air mist treatment',
      'Loyalty multiplier points x1.5',
      'Direct line to local service dispatch'
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Sammy Boateng',
  email: 'sammyboateng5392@gmail.com',
  phone: '+233 557139811',
  address: 'Pantang-Madina',
  loyaltyTier: 'Gold',
  points: 450,
  bookingsCount: 8
};

export const PROMO_CODES: Record<string, number> = {
  'KLYNNEW': 15, // 15% off
  'FRESHSTART': 20, // 20% off
  'ECOKLYN': 10 // 10% off
};
