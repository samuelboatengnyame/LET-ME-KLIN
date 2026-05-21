export type ServiceCategory = 
  | 'home'
  | 'office'
  | 'deep'
  | 'construction'
  | 'carpet'
  | 'move'
  | 'fumigation'
  | 'carwash';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  icon: string; // Dynamic Lucide icon key
  description: string;
  basePrice: number;
  duration: string;
  checklist: string[];
  beforeImage: string;
  afterImage: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
export type TrackingState = 'dispatched' | 'arrived' | 'cleaning' | 'completed';

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  serviceId: string;
  serviceName: string;
  basePrice: number;
  totalPrice: number;
  date: string;
  timeSlot: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  status: BookingStatus;
  tracking: TrackingState;
  notes?: string;
  promoCode?: string;
  rewardsEarned: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number; // 1-5 Stars
  text: string;
  date: string;
  serviceType: string;
  verified: boolean;
  reply?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points: number;
  bookingsCount: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  frequency: string;
  discountPercent: number;
  features: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
