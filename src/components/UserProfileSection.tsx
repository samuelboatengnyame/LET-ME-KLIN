import { Booking, UserProfile } from '../types';
import { 
  Award, Sparkles, MapPin, Calendar, Clock, Lock, 
  Map, Activity, CheckCircle, HelpCircle, Truck, Compass, CheckCircle2 
} from 'lucide-react';

interface UserProfileSectionProps {
  user: UserProfile;
  bookings: Booking[];
  setSelectedBookingIdForTracking: (bId: string) => void;
  setView: (view: string) => void;
}

export default function UserProfileSection({
  user,
  bookings,
  setSelectedBookingIdForTracking,
  setView
}: UserProfileSectionProps) {
  
  // Calculate aggregate metrics
  const totalBookingsCount = bookings.length;
  const pointsToNextLevel = Math.max(0, 1000 - user.points);
  const nextTierProgressPercent = Math.min(100, (user.points / 1000) * 100);

  // Helper tracking tracker renderer
  const renderLiveStatusTracker = (booking: Booking) => {
    // states: "dispatched" | "arrived" | "cleaning" | "completed"
    const currentState = booking.tracking;
    const status = booking.status;

    if (status === 'cancelled') {
      return (
        <div className="rounded-xl bg-red-50 p-4 border border-red-200/50 dark:bg-red-950/20 text-xs text-red-700 text-left">
          <p className="font-bold flex items-center">
            ❌ Booking Cancelled
          </p>
          <p className="text-[11px] text-red-500 mt-1">This slot has been cancelled. Refunds have been credited or points restored.</p>
        </div>
      );
    }

    const steps = [
      { id: 'dispatched', label: 'Crew Dispatched', description: 'Techs en route with eco gear', icon: <Truck className="h-4 w-4" /> },
      { id: 'arrived', label: 'Crew On-Site', description: 'Arrived at destination', icon: <Compass className="h-4 w-4" /> },
      { id: 'cleaning', label: 'Detailing', description: 'Checklist in operation', icon: <Sparkles className="h-4 w-4" /> },
      { id: 'completed', label: 'Polished', description: 'Inspected and certified outcome', icon: <CheckCircle className="h-4 w-4" /> },
    ];

    const getStepState = (stepId: string) => {
      const order = ['dispatched', 'arrived', 'cleaning', 'completed'];
      const currentIdx = order.indexOf(currentState);
      const stepIdx = order.indexOf(stepId);

      if (booking.status === 'completed' || currentState === 'completed') {
        return 'completed';
      }

      if (stepIdx < currentIdx) return 'completed';
      if (stepIdx === currentIdx) return 'active';
      return 'upcoming';
    };

    return (
      <div className="rounded-2xl border border-blue-50 bg-blue-50/10 p-5 dark:border-blue-950/35 dark:bg-blue-950/10 text-left space-y-4">
        
        <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-3 dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-450 block">Live Service Tracker</span>
            <span className="text-xs font-bold text-slate-805 text-slate-900 dark:text-white mt-1">
              Ref ID: <span className="font-mono text-blue-600">{booking.id}</span>
            </span>
          </div>
          <span className="inline-flex items-center space-x-1 bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold dark:bg-teal-950/40 dark:text-teal-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse mr-1" />
            Active tracking
          </span>
        </div>

        {/* Live stepping timeline grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 relative pl-4 sm:pl-0">
          {/* Vertical line helper on mobile, horizontal line helper on wider */}
          <div className="hidden sm:block absolute top-[18px] left-[20px] right-[20px] h-[2px] bg-slate-200 dark:bg-slate-800 z-0" />
          
          {steps.map((step) => {
            const stepState = getStepState(step.id);
            
            return (
              <div key={step.id} className="relative z-10 flex sm:flex-col items-start sm:items-center text-left sm:text-center space-x-3 sm:space-x-0 sm:space-y-2">
                
                {/* Visual Circle indicator dot */}
                <div 
                  className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs shadow-sm transition-all duration-300 ${
                    stepState === 'completed'
                      ? 'bg-emerald-500 text-white shadow-emerald-500/10'
                      : stepState === 'active'
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950 animate-pulse'
                      : 'bg-white border border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
                  }`}
                >
                  {stepState === 'completed' ? <CheckCircle2 className="h-4.5 w-4.5" /> : step.icon}
                </div>

                {/* Step labels text */}
                <div className="space-y-0.5">
                  <h5 className={`text-xs font-bold leading-tight ${
                    stepState === 'upcoming' ? 'text-slate-400' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {step.label}
                  </h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                    {step.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    );
  };

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">My Detailing Station</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Client Membership Profile</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor loyalty points, claim discount vouchers, and track current deep clean crews in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 text-left" id="profile-container">
          
          {/* Left Column: User details & Loyalty stats card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Loyalty Point Booster summary card */}
            <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-6 shadow-xl text-white">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-400 block bg-blue-500/10 py-1 px-2.5 rounded-lg w-fit">
                    {user.loyaltyTier} Tier Member
                  </span>
                  <p className="text-xl font-black mt-2">{user.name}</p>
                  <p className="text-[11px] text-slate-300 font-mono">{user.email}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 shadow-md">
                  <Award className="h-6 w-6" />
                </div>
              </div>

              {/* Points tracker progress block */}
              <div className="mt-8 space-y-2 border-t border-white/10 pt-6">
                <div className="flex justify-between items-end text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Current Savings Points</span>
                    <span className="text-3xl font-black mt-1 block">{user.points} <span className="text-xs text-slate-400 font-medium">pts</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">Next Tier Rank</span>
                    <span className="text-sm font-bold block mt-1">Platinum (1000 pts)</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 bottom-0 rounded-full bg-gradient-to-r from-teal-400 to-blue-500"
                    style={{ width: `${nextTierProgressPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 text-right leading-none">
                  Accumulate {pointsToNextLevel} more points to lock-in Platinum rates!
                </p>
              </div>

              {/* Loyalty benefits checklist */}
              <div className="mt-6 border-t border-white/10 pt-4 space-y-2 text-xs text-slate-300">
                <p className="font-bold text-white">Your Gold Member Benefits:</p>
                <div className="space-y-1">
                  <p className="flex items-center">⭐ 10% flat price haircut on deep ovens</p>
                  <p className="flex items-center">⭐ Guaranteed dispatch slots</p>
                  <p className="flex items-center">⭐ Complimentary aromatherapy spray</p>
                </div>
              </div>
            </div>

            {/* Profile Contact Details card */}
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contact Information</h3>
              <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-350">
                <div>
                  <p className="font-semibold text-slate-400">Associated Mobile:</p>
                  <p className="font-bold text-slate-805 mt-0.5 dark:text-slate-100">{user.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Primary Registered Premises:</p>
                  <p className="font-bold text-slate-805 mt-0.5 dark:text-slate-100">{user.address}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Total Cleans Scheduled:</p>
                  <p className="font-bold text-slate-805 mt-0.5 dark:text-slate-100">{totalBookingsCount} bookings (Historic + Current)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Active tracker details & Histories list */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Live active tracker placeholder, targeting the most recently created or first active booking */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Live Service Dispatch & Progress Tracker</h3>
              {bookings.length > 0 ? (
                // Display tracker for the first booking that is not completed or cancelled, or default to the most recent one
                renderLiveStatusTracker(
                  bookings.find(b => b.status !== 'completed' && b.status !== 'cancelled') || bookings[0]
                )
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white p-8 text-center dark:border-slate-850 dark:bg-slate-900 text-slate-500 text-xs">
                  <Activity className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-medium text-slate-600 dark:text-slate-400">No active deep clears scheduled right now.</p>
                  <p className="text-slate-400 mt-1">Book an instant session below to activate real-time telemetry dispatch.</p>
                  <button
                    onClick={() => setView('booking')}
                    className="mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white px-4 py-2"
                  >
                    Arrange Service Now
                  </button>
                </div>
              )}
            </div>

            {/* Bookings historical checklist */}
            <div>
              <h3 className="text-base font-bold text-slate-955 text-slate-900 dark:text-white mb-3">Booking Arrangements History</h3>
              <div className="space-y-4" id="profile-bookings-list">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-900 dark:bg-slate-900 flex flex-col md:flex-row justify-between gap-4 text-left hover:-translate-y-0.5 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded dark:bg-blue-950/40 dark:text-blue-300">
                          {booking.id}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold capitalize ${
                          booking.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                            : booking.status === 'cancelled'
                            ? 'bg-red-50 text-red-700 dark:bg-red-950/30'
                            : booking.status === 'in-progress'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-400'
                            : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/35 dark:text-indigo-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                        {booking.serviceName}
                      </h4>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <p className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 mr-1 flex-shrink-0" />
                          <span>{booking.date}</span>
                        </p>
                        <p className="flex items-center">
                          <Clock className="h-3.5 w-3.5 text-slate-400 mr-1 flex-shrink-0" />
                          <span>{booking.timeSlot}</span>
                        </p>
                        <p className="flex items-center col-span-2 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 mr-1 flex-shrink-0" />
                          <span className="truncate">{booking.address}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end text-right border-slate-100 pt-2 md:pt-0 dark:border-slate-800 border-t md:border-t-0">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Total paid</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">GH₵{booking.totalPrice}</span>
                      </div>

                      <div className="flex space-x-2 mt-2">
                        {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                          <div className="inline-flex items-center space-x-1 border border-dashed border-blue-200 rounded px-2 py-1 text-[10px] text-blue-600 bg-blue-50/15 dark:bg-blue-950/30 dark:border-blue-900 font-bold">
                            <Truck className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                            <span>Currently Tracking: <span className="capitalize">{booking.tracking}</span></span>
                          </div>
                        )}
                        {booking.status === 'completed' && (
                          <span className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-teal-50 text-[10px] text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 font-bold border border-teal-200/50">
                            ✔️ Inspected & Certified
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                ))}

                {bookings.length === 0 && (
                  <p className="text-slate-500 text-xs py-10">No bookings logged in this member account yet. Ready to book your first LetMeKlyn cleanse?</p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
