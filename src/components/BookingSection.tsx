import React, { useState, useEffect } from 'react';
import { SERVICES, PROMO_CODES } from '../data';
import { Booking, Service } from '../types';
import { 
  CheckCircle, Sparkles, Calendar, Clock, MapPin, 
  Tag, CreditCard, ShieldCheck, HeartHandshake, Award 
} from 'lucide-react';

interface BookingSectionProps {
  selectedServiceId: string;
  onBookingCreated: (booking: Booking) => void;
  userPoints: number;
}

export default function BookingSection({
  selectedServiceId,
  onBookingCreated,
  userPoints
}: BookingSectionProps) {
  
  // Prep presets
  const todayStr = new Date().toISOString().split('T')[0];

  // Form Fields
  const [serviceId, setServiceId] = useState(selectedServiceId || 'home');
  const [custName, setCustName] = useState('Sammy Boateng');
  const [custEmail, setCustEmail] = useState('sammyboateng5392@gmail.com');
  const [custPhone, setCustPhone] = useState('+233 557139811');
  const [custAddress, setCustAddress] = useState('Pantang-Madina');
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 11:30 AM');
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'biweekly' | 'monthly'>('once');
  const [notes, setNotes] = useState('');
  
  // Checkout calculations
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0); // in percent
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Time slots template
  const timeSlots = [
    '08:00 AM - 10:30 AM',
    '11:00 AM - 01:30 PM',
    '02:00 PM - 04:30 PM',
    '05:00 PM - 07:30 PM',
  ];

  // Sync selected service if changed externally
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  const selectedService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  // Price calculations
  const basePrice = selectedService.basePrice;
  
  // Frequency Discounts
  let frequencyDiscount = 0;
  if (frequency === 'weekly') frequencyDiscount = 20;
  else if (frequency === 'biweekly') frequencyDiscount = 15;
  else if (frequency === 'monthly') frequencyDiscount = 10;

  const getSubtotal = () => {
    // apply frequency discount factor directly
    const factor = (100 - frequencyDiscount) / 100;
    return Math.round(basePrice * factor);
  };

  const getPromoDiscountAmount = () => {
    const sub = getSubtotal();
    return Math.round(sub * (promoDiscount / 100));
  };

  const getFinalTotal = () => {
    const sub = getSubtotal();
    const discount = getPromoDiscountAmount();
    return Math.max(20, sub - discount);
  };

  const handleApplyPromo = () => {
    const cleanPromo = promoCode.toUpperCase().trim();
    if (PROMO_CODES[cleanPromo]) {
      setPromoDiscount(PROMO_CODES[cleanPromo]);
      setAppliedPromo(cleanPromo);
    } else {
      alert('Invalid promo code. Try "KLYNNEW" for 15% off!');
    }
  };

  const handleClearPromo = () => {
    setPromoDiscount(0);
    setAppliedPromo(null);
    setPromoCode('');
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custEmail || !custPhone || !custAddress || !date || !timeSlot) {
      alert('Please fill out all billing details.');
      return;
    }

    const finalBill = getFinalTotal();
    const pointsEarned = Math.round(finalBill * 0.5);

    const booking: Booking = {
      id: 'KLYN-' + Math.floor(100000 + Math.random() * 90000),
      customerName: custName,
      email: custEmail,
      phone: custPhone,
      address: custAddress,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      basePrice: selectedService.basePrice,
      totalPrice: finalBill,
      date: date,
      timeSlot: timeSlot,
      frequency: frequency,
      status: 'pending',
      tracking: 'dispatched', // start client in active track state as standard
      notes: notes,
      promoCode: appliedPromo || undefined,
      rewardsEarned: pointsEarned
    };

    setCreatedBooking(booking);
    onBookingCreated(booking);
    setIsSuccess(true);
  };

  if (isSuccess && createdBooking) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center" id="booking-success-box">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl dark:border-slate-900 dark:bg-slate-900 transition-colors duration-300 space-y-6">
          
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-500 text-white shadow-xl shadow-teal-500/20 mx-auto animate-bounce">
            <CheckCircle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-600 dark:text-teal-400">Order Dispatched</span>
            <h2 className="text-3xl font-extrabold text-slate-905 text-slate-900 dark:text-white">Your Clean is Scheduled!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We have received your custom LetMeKlyn arrangement and matched your slot with an elite technician squad.
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-950/60 text-left space-y-4 border border-slate-100 dark:border-slate-900">
            <div className="flex justify-between border-b border-slate-200/50 pb-3 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Receipt Ident</span>
                <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-100">{createdBooking.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Service Tier</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{createdBooking.serviceName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Scheduled Date</p>
                <p className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{createdBooking.date}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Allocated Hours</p>
                <p className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{createdBooking.timeSlot}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 font-medium">Destination Address</p>
                <p className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{createdBooking.address}</p>
              </div>
            </div>

            <div className="border-t border-slate-200/50 pt-3 dark:border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Earned Rewards</p>
                <p className="text-xs font-bold text-emerald-500 mt-0.5">+{createdBooking.rewardsEarned} Loyalty Points</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Final Price Paid</p>
                <p className="text-xl font-black text-slate-950 dark:text-white">GH₵{createdBooking.totalPrice}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row justify-center">
            {/* View tracker active button */}
            <button
              onClick={() => onBookingCreated(createdBooking)} // triggers high level focus navigation 
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-xs font-bold shadow-md transition-colors"
            >
              Real-time Service Tracking
            </button>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-850 text-xs font-semibold transition-colors"
            >
              Book Another Service
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Seamless Setup</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Schedule My Detailing</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tell us about your space. Adjust booking details, set recurring plans, and claim premium discounts below.
          </p>
        </div>

        <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 gap-10 lg:grid-cols-12 text-left" id="booking-wizard-form">
          
          {/* Left Column: Form Info */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Billing details card */}
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">1. Client Contact & Destination Details</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-450 uppercase block mb-1">Full Client Name</label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-slate-50/50 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-450 uppercase block mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    required
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-slate-50/50 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-450 uppercase block mb-1">Mobile Telephone</label>
                  <input
                    type="tel"
                    required
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-slate-50/50 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-450 uppercase block mb-1">Service Destination Address</label>
                  <input
                    type="text"
                    required
                    value={custAddress}
                    onChange={(e) => setCustAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-slate-50/50 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Service & Schedule Details */}
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">2. Arrange Custom Package & Schedule</h3>
              <div className="space-y-4">
                
                {/* Service Dropdown Select */}
                <div>
                  <label className="text-xs font-bold text-slate-450 uppercase block mb-1">Select Active Clean Plan</label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (Base: GH₵{s.basePrice})</option>
                    ))}
                  </select>
                </div>

                {/* Date & Time slots picker */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-slate-450 uppercase block mb-1">
                      <Calendar className="inline h-3.5 w-3.5 mr-1" />
                      Target Date
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-450 uppercase block mb-1">
                      <Clock className="inline h-3.5 w-3.5 mr-1" />
                      Allocated Hours Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                      {timeSlots.map((ts, idx) => (
                        <option key={idx} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subscription Frequency selection */}
                <div>
                  <label className="text-xs font-bold text-slate-450 uppercase block mb-1.5">Recurring Frequency Discounts</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { id: 'once', label: 'One-Off clean', discount: 'Regular pricing', badge: 'Flexible' },
                      { id: 'weekly', label: 'Weekly plan', discount: 'Save 20% / cleaning', badge: 'Save 20%' },
                      { id: 'biweekly', label: 'Bi-Weekly plan', discount: 'Save 15% / cleaning', badge: 'Save 15%' },
                      { id: 'monthly', label: 'Monthly plan', discount: 'Save 10% / cleaning', badge: 'Save 10%' },
                    ].map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setFrequency(plan.id as any)}
                        className={`p-3 rounded-xl text-left border text-xs transition-all relative ${
                          frequency === plan.id
                            ? 'bg-blue-50/50 border-blue-500 text-blue-900 dark:bg-blue-950/20 dark:border-blue-500 dark:text-blue-100'
                            : 'bg-white border-slate-200/80 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <span className="font-extrabold block">{plan.label}</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{plan.discount}</span>
                        {plan.id !== 'once' && (
                          <span className="absolute -top-2 right-2 rounded-full bg-teal-500 px-1.5 py-0.5 text-[8px] font-extrabold text-white">
                            {plan.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes box */}
                <div>
                  <label className="text-xs font-bold text-slate-450 uppercase block mb-1">Access Instructions / Custom Priorities (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Provide gate codes, keylock coordinates, or specify high-priority rooms (e.g., 'focus more on kitchen backsplash')."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none bg-slate-50/50 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: checkout summary details sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 h-fit space-y-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-900 dark:bg-slate-900">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Checkout Cart</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 border-b border-slate-100 pb-3 dark:border-slate-800">
                Summary of LetMeKlyn Clean
              </h3>

              <div className="space-y-4 py-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Service Plan</span>
                  <span className="font-bold text-slate-850 dark:text-slate-100">{selectedService.name}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Scheduled Date</span>
                  <span className="font-bold text-slate-850 dark:text-slate-100">{date}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Frequency Rate</span>
                  <span className="font-bold capitalize text-slate-850 dark:text-slate-100">{frequency}</span>
                </div>

                <div className="border-t border-dashed border-slate-200 py-3 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-350">
                    <span>Base Fare price:</span>
                    <span>GH₵{basePrice}</span>
                  </div>

                  {frequencyDiscount > 0 && (
                    <div className="flex justify-between text-xs text-teal-600 dark:text-teal-400 font-medium">
                      <span>{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Biweekly' : 'Monthly'} (-{frequencyDiscount}%):</span>
                      <span>-GH₵{Math.round(basePrice * (frequencyDiscount / 100))}</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-450 font-bold">
                      <span>Promo Savings ({appliedPromo}):</span>
                      <span>-GH₵{getPromoDiscountAmount()}</span>
                    </div>
                  )}
                </div>

                {/* Loyalty Point Booster summary */}
                <div className="rounded-xl border border-blue-50 bg-blue-50/20 p-3.5 dark:border-blue-950/35 dark:bg-blue-950/20 flex items-center space-x-3 text-left">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-none">Loyalty Point Booster!</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">This booking will generate: <span className="font-extrabold text-blue-600">+{Math.round(getFinalTotal() * 0.5)} points</span></p>
                  </div>
                </div>

                {/* Promo Voucher input */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Promo Code Voucher</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. KLYNNEW"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={!!appliedPromo}
                      className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs uppercase font-mono outline-none bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                    {appliedPromo ? (
                      <button
                        type="button"
                        onClick={handleClearPromo}
                        className="rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 px-3.5 py-1.5 text-xs font-bold"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {appliedPromo && (
                    <p className="text-[10px] font-extrabold text-emerald-600">Promo code registered! Safe discount: {promoDiscount}%</p>
                  )}
                </div>

                {/* Final Checkout sum */}
                <div className="border-t border-slate-150 pt-3 dark:border-slate-800 flex justify-between items-center text-left">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Est Net Total</span>
                    <span className="text-xs text-slate-500 font-medium">Guarantee included.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-950 dark:text-white">GH₵{getFinalTotal()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  id="checkout-confirm-btn"
                  className="w-full inline-flex justify-center items-center space-x-2 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-extrabold shadow-lg shadow-blue-500/10 transition-colors"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Confirm LetMeKlyn Schedule</span>
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>256-bit encrypted security protocol.</span>
                </div>

              </div>
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}
