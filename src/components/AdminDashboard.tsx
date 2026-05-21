import { Booking } from '../types';
import { 
  DollarSign, Star, Users, Briefcase, RefreshCw, CheckCircle, 
  XCircle, Truck, MapPin, Calendar, Clock, Sparkles, Smile 
} from 'lucide-react';

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, newStatus: any) => void;
  onUpdateTrackingState: (id: string, newState: any) => void;
  onMockReset: () => void;
}

export default function AdminDashboard({
  bookings,
  onUpdateBookingStatus,
  onUpdateTrackingState,
  onMockReset
}: AdminDashboardProps) {
  
  // Executive summary aggregations
  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((acc, b) => acc + b.totalPrice, 0);

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const activeCount = bookings.filter(b => b.status === 'in-progress' || b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  // Next Step tracking workflow helpers
  const getNextTrackingState = (currentState: string) => {
    switch (currentState) {
      case 'dispatched': return 'arrived';
      case 'arrived': return 'cleaning';
      case 'cleaning': return 'completed';
      default: return 'completed';
    }
  };

  const getTrackingLabel = (state: string) => {
    switch (state) {
      case 'dispatched': return 'Technician Dispatched';
      case 'arrived': return 'On-site Assessment';
      case 'cleaning': return 'Meticulous Scrubbing';
      case 'completed': return 'Clean Certified';
      default: return state;
    }
  };

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Summary Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-left border-b border-slate-200/50 pb-6 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Management Terminal</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Admin Command Dashboard</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage LetMeKlyn scheduling pipelines and control service tracking telemetry in real-time.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onMockReset}
              className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-800 shadow-sm"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset Mock Dataset</span>
            </button>
          </div>
        </div>

        {/* Executive summary widgets grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" id="admin-summary-grid">
          
          {/* Revenue */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-900 dark:bg-slate-900 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-450">Projected Revenue</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2 dark:text-white">GH₵{totalRevenue}</p>
            <p className="text-[10px] text-emerald-600 mt-1">Excludes cancelled jobs</p>
          </div>

          {/* Active Jobs */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-900 dark:bg-slate-900 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-450">Active / Confirmed</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Truck className="h-4.5 w-4.5 animate-pulse" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2 dark:text-white">{activeCount}</p>
            <p className="text-[10px] text-blue-600 mt-1">In progress detailing</p>
          </div>

          {/* Finished Cleans */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-900 dark:bg-slate-900 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-450">Polished & Finished</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                <CheckCircle className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2 dark:text-white">{completedCount}</p>
            <p className="text-[10px] text-teal-600 mt-1">100% Quality checklist rating</p>
          </div>

          {/* Pending Alerts */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-900 dark:bg-slate-900 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-450">Awaiting Confirms</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                <Users className="h-4.5 w-4.5 animate-bounce" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2 dark:text-white">{pendingCount}</p>
            <p className="text-[10px] text-amber-500 mt-1">Awaiting coordinator dispatch</p>
          </div>

        </div>

        {/* Bookings Management queue grid */}
        <div className="space-y-4 text-left">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Customer Booking Queue</h3>
            <span className="text-xs text-slate-500">Showing {bookings.length} jobs</span>
          </div>

          <div className="space-y-4" id="admin-bookings-queue-container">
            {bookings.map((booking) => {
              const nextState = getNextTrackingState(booking.tracking);
              
              return (
                <div 
                  key={booking.id} 
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-900 dark:bg-slate-900 hover:border-slate-300 transition-colors"
                >
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
                    
                    {/* Left details pane */}
                    <div className="lg:col-span-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded dark:bg-blue-950/40 dark:text-blue-300">
                          {booking.id}
                        </span>
                        
                        {/* Status badge and tracking badge */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold capitalize ${
                          booking.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                            : booking.status === 'cancelled'
                            ? 'bg-red-50 text-red-700 dark:bg-red-950/30'
                            : booking.status === 'in-progress'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-400'
                            : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/35 dark:text-indigo-400'
                        }`}>
                          Status: {booking.status}
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                        {booking.serviceName}
                      </h4>

                      <div className="space-y-1 text-xs text-slate-650 text-slate-600 dark:text-slate-400">
                        <p className="font-bold text-slate-800 dark:text-slate-100">{booking.customerName} • {booking.phone}</p>
                        <p>{booking.email}</p>
                        <p className="flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{booking.address}</span>
                        </p>
                      </div>
                    </div>

                    {/* Middle scheduler data pane */}
                    <div className="lg:col-span-4 space-y-2 lg:border-l lg:pl-6 border-slate-100 dark:border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Scheduled Window</span>
                      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        <p className="flex items-center font-bold">
                          <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                          <span>{booking.date}</span>
                        </p>
                        <p className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-slate-400" />
                          <span>{booking.timeSlot}</span>
                        </p>
                        <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                          Frequency: <span className="capitalize">{booking.frequency}</span>
                        </p>
                      </div>

                      {booking.notes && (
                        <div className="rounded-lg bg-slate-50 p-2 text-[10px] text-slate-500 dark:bg-slate-950 mt-2">
                          <span className="font-bold text-slate-700 dark:text-slate-350 block">Customer notes:</span>
                          <span className="italic">"{booking.notes}"</span>
                        </div>
                      )}
                    </div>

                    {/* Right core action buttons pane */}
                    <div className="lg:col-span-4 flex flex-col justify-center items-stretch lg:items-end gap-2 border-slate-100 pt-4 lg:pt-0 lg:border-l lg:pl-6 dark:border-slate-850 border-t lg:border-t-0">
                      
                      {/* Price summary */}
                      <div className="text-left lg:text-right pb-2 mb-1 border-b border-dashed border-slate-150 w-full dark:border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-450 text-left">Priced Net:</span>
                        <span className="text-xl font-black text-slate-900 mt-0.5 text-right dark:text-white">GH₵{booking.totalPrice}</span>
                      </div>

                      {/* Main Booking Status confirmation triggers */}
                      {booking.status === 'pending' && (
                        <div className="flex gap-2 w-full">
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, 'confirmed')}
                            className="flex-1 inline-flex justify-center items-center space-x-1.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Confirm Slot</span>
                          </button>
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, 'cancelled')}
                            className="inline-flex justify-center items-center py-1.5 px-3 rounded-lg border border-red-200 text-red-650 hover:bg-red-50 text-red-600 dark:border-red-950"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {/* Simulation telemetry controls if slot confirmed */}
                      {booking.status !== 'pending' && booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <div className="space-y-2 w-full">
                          
                          {/* Current active state info label */}
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-bold uppercase">Current location:</span>
                            <span className="font-bold capitalize text-blue-600 bg-blue-50 px-2 py-0.5 rounded dark:bg-blue-950/30">
                              {getTrackingLabel(booking.tracking)}
                            </span>
                          </div>

                          <div className="flex gap-2 w-full">
                            {booking.tracking !== 'completed' && (
                              <button
                                onClick={() => {
                                  onUpdateTrackingState(booking.id, nextState);
                                  // automatically transition status to in-progress when tracking changes from dispatched
                                  if (booking.status === 'confirmed') {
                                    onUpdateBookingStatus(booking.id, 'in-progress');
                                  }
                                  // set booking status to completed when tracking finalized
                                  if (nextState === 'completed') {
                                    onUpdateBookingStatus(booking.id, 'completed');
                                  }
                                }}
                                className="flex-1 inline-flex justify-center items-center space-x-1.5 py-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 font-bold text-xs shadow"
                              >
                                <Truck className="h-4 w-4 text-white" />
                                <span>Simulate State: {getTrackingLabel(nextState)}</span>
                              </button>
                            )}

                            <button
                              onClick={() => {
                                onUpdateBookingStatus(booking.id, 'completed');
                                onUpdateTrackingState(booking.id, 'completed');
                              }}
                              className="inline-flex justify-center items-center px-3.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs dark:bg-slate-800"
                            >
                              Instant Finish
                            </button>
                          </div>

                        </div>
                      )}

                      {/* Display final action labels */}
                      {booking.status === 'completed' && (
                        <div className="w-full text-left lg:text-right">
                          <span className="inline-flex items-center space-x-1 bg-teal-50 text-teal-700 px-3 py-1 text-[10px] font-bold rounded-lg border border-teal-200/50 dark:bg-teal-950/30 dark:text-teal-400 uppercase tracking-wide">
                            ✔️ Crew certified finalized
                          </span>
                        </div>
                      )}

                      {booking.status === 'cancelled' && (
                        <div className="w-full text-left lg:text-right">
                          <span className="inline-flex items-center bg-red-50 text-red-700 px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wide">
                            ❌ Booking Cancelled
                          </span>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              );
            })}

            {bookings.length === 0 && (
              <div className="text-center py-12 rounded-2xl bg-white border border-dashed text-slate-400 text-xs">
                No active bookings found in the pipeline. Complete the Booking Wizard to inject jobs!
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
