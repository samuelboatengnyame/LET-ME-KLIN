import React, { useState } from 'react';
import { Review } from '../types';
import { SERVICES } from '../data';
import { Star, MessageSquare, Check, ArrowRight, Sparkles } from 'lucide-react';

interface TestimonialsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function TestimonialsSection({ reviews, onAddReview }: TestimonialsSectionProps) {
  
  // Custom Reviews form states
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [serviceType, setServiceType] = useState('Home Cleaning');

  const [formSuccess, setFormSuccess] = useState(false);

  // Math totals
  const totalReviews = reviews.length;
  const ratingSum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avgRating = totalReviews > 0 ? (ratingSum / totalReviews).toFixed(1) : '5.0';

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) {
      alert('Please fill out your name and rating comment.');
      return;
    }

    const newRev: Review = {
      id: 'rev-' + Math.floor(Math.random() * 10000),
      author: author,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?q=80&w=150&auto=format&fit=crop`,
      rating: rating,
      text: text,
      date: new Date().toISOString().split('T')[0],
      serviceType: serviceType,
      verified: true
    };

    onAddReview(newRev);
    setFormSuccess(true);
    setAuthor('');
    setText('');
    
    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Honest Feedback</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Client Reviews</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Read transparent customer satisfaction feedback or leave your own rating below.
          </p>
        </div>

        {/* Aggregate Ratings Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-900 dark:bg-slate-900 mb-12 text-left transition-colors duration-300">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-center">
            
            {/* Avg score item */}
            <div className="space-y-2 border-slate-200/55 dark:border-slate-800 md:border-r pr-4 text-center md:text-left">
              <span className="text-[10px] tracking-widest font-extrabold text-slate-400 uppercase">Aggregate Score</span>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-5xl font-black text-slate-950 dark:text-white">{avgRating}</span>
                <div>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        className={`h-4.5 w-4.5 fill-current ${
                          s <= Math.round(parseFloat(avgRating)) ? 'text-amber-500' : 'text-slate-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">Based on {totalReviews} client verified ratings</span>
                </div>
              </div>
            </div>

            {/* Feature Stars highlights details */}
            <div className="space-y-2 text-xs border-slate-200/55 dark:border-slate-800 md:border-r px-0 md:px-8 text-slate-600 dark:text-slate-350">
              <span className="text-[10px] tracking-widest font-extrabold text-slate-400 uppercase block">Satisfaction Metrics</span>
              <div className="space-y-1.5 font-medium">
                <div className="flex justify-between">
                  <span>Chemical Safety & Eco Standards</span>
                  <span className="font-bold text-teal-600">5.0 / 5.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Detailed Checklist Quality Check</span>
                  <span className="font-bold text-blue-600">4.9 / 5.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Crew Timeliness & Friendliness</span>
                  <span className="font-bold text-emerald-600">4.9 / 5.0</span>
                </div>
              </div>
            </div>

            {/* Quick Satisfaction badge call out */}
            <div className="text-center rounded-2xl bg-blue-50/20 p-4 border border-blue-50 dark:bg-blue-950/20 dark:border-blue-950/35">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <h5 className="text-xs font-bold text-slate-900 mt-2 dark:text-slate-100">100% Satisfaction Checked</h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">If anything looks unpolished, our squad returns within 24h & clean it again free!</p>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 text-left">
          
          {/* Left Side: reviews loop */}
          <div className="lg:col-span-8 space-y-6" id="testimonials-list">
            
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900/60 transition-colors"
              >
                
                {/* Review Header info */}
                <div className="flex items-start justify-between">
                  
                  <div className="flex items-center space-x-3">
                    <img 
                      src={rev.avatar} 
                      alt={rev.author} 
                      onError={(e) => {
                        // fallback placeholder
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop';
                      }}
                      className="h-11 w-11 rounded-full object-cover border-2 border-slate-200 dark:border-slate-850"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{rev.author}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center rounded bg-teal-50 px-1.5 py-0.5 text-[8px] font-extrabold text-teal-700 dark:bg-teal-950/30 dark:text-teal-400">
                            Verified Booking
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{rev.date} • {rev.serviceType}</span>
                    </div>
                  </div>

                  {/* Stars display */}
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        className={`h-4 w-4 fill-current ${
                          s <= rev.rating ? 'text-amber-500' : 'text-slate-200 dark:text-slate-800'
                        }`} 
                      />
                    ))}
                  </div>

                </div>

                {/* Review Comment text */}
                <p className="text-xs text-slate-600 mt-4 leading-relaxed dark:text-slate-300">
                  "{rev.text}"
                </p>

                {/* Admin Reply box if set */}
                {rev.reply && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-4 border-l-4 border-blue-500 dark:bg-slate-950/40 text-xs">
                    <p className="font-extrabold text-blue-600 dark:text-blue-400">LetMeKlyn (Official Response):</p>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 leading-normal">"{rev.reply}"</p>
                  </div>
                )}

              </div>
            ))}

            {reviews.length === 0 && (
              <p className="text-slate-500 text-xs text-center py-8">No reviews published yet. Be the first to leave feedback!</p>
            )}

          </div>

          {/* Right Side Sticky form: Write Review */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 h-fit">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-900 dark:bg-slate-900">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Share Feedback</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-1 border-b border-slate-100 pb-3 dark:border-slate-800">
                Write a Verified Review
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4">
                
                {/* Form Alert Success message */}
                {formSuccess && (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-500/20 p-3.5 text-xs text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300 flex items-center space-x-2 animate-pulse">
                    <Check className="h-4 w-4 flex-shrink-0" />
                    <span className="font-bold">Review published successfully!</span>
                  </div>
                )}

                {/* Star rating picker input */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 block mb-1">Your Rating *</label>
                  <div className="flex space-x-2 text-slate-300">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`h-7 w-7 fill-current ${
                            num <= rating ? 'text-amber-500' : 'text-slate-200 dark:text-slate-800'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Name input */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 block mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Boateng"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs outline-none bg-slate-50/50 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                {/* Service Type select input */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 block mb-1">Service Type *</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs outline-none bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Description Commentary text */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 block mb-1">Verify Commentary *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell other shoppers details about our team cleanliness, bio formulas, and timeliness..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs outline-none bg-slate-50/50 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div className="bg-slate-50/55 rounded-xl p-3 text-[10px] text-slate-550 dark:bg-slate-950/20">
                  <span className="font-extrabold text-blue-600 block mb-1">Eco Reward Verification:</span>
                  Reviews contribute reviews score to our green database and help local team coordinators monitor clean standards.
                </div>

                <button
                  type="submit"
                  id="testimonial-submit-btn"
                  className="w-full inline-flex justify-center items-center space-x-1.5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-xs font-bold transition-all"
                >
                  <span>Publish Rating</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
