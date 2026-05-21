import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Mail, MapPin, 
  Send, CheckCircle, ExternalLink, Clock, Sparkles 
} from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <section className="bg-white py-16 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Immediate Dispatch</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Connect with LetMeKlyn</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Got custom enterprise detailing, large offices, or complex estate fumigation needs? Connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 text-left" id="contact-outer-grid">
          
          {/* Left Column: Core Contact info Channels */}
          <div className="lg:col-span-4 space-y-6">
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Direct Communication</h3>
            
            {/* Click to Call Now */}
            <a 
              href="tel:+233557139811"
              id="click-to-call-href"
              className="block rounded-2xl border border-blue-105 p-5 bg-blue-50/20 hover:bg-blue-50/40 transition-colors border-blue-200/50 dark:border-blue-950/45 dark:bg-blue-950/15"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow shadow-blue-500/10">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider leading-none">Emergency Dispatch</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">Call Coordinator Now</p>
                  <p className="text-xs text-blue-600 font-bold dark:text-blue-400 mt-0.5">+233 557139811</p>
                </div>
              </div>
            </a>

            {/* Simulated Live Chat Template WhatsApp */}
            <a 
              href="https://wa.me/233557139811?text=Hello%20LetMeKlyn!%20I'd%20like%20to%2520get%25%20quote%20for%20a%20commercial%20clean."
              target="_blank"
              rel="noreferrer"
              id="whatsapp-chat-now"
              className="block rounded-2xl border border-emerald-110 p-5 bg-emerald-50/25 hover:bg-emerald-50/50 transition-colors border-emerald-200/50 dark:border-emerald-950/45 dark:bg-emerald-950/15"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow shadow-emerald-500/10">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider leading-none">Eco-Agent WhatsApp</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">Pre-filled Chat Template</p>
                  <p className="text-xs text-emerald-600 font-bold dark:text-emerald-450 mt-0.5">Response Time: &lt; 2 minutes</p>
                </div>
              </div>
            </a>

            {/* Headquarters details */}
            <div className="rounded-2xl border border-slate-100 p-6 bg-slate-50/55 dark:border-slate-800 dark:bg-slate-950/10 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Headquarters Station</h4>
              
              <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-350">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4.5 w-4.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">LetMeKlyn Pantang-Madina</p>
                    <p className="mt-0.5">Pantang-Madina, Greater Accra, Ghana</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-4.5 w-4.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">Client Support Email</p>
                    <p className="mt-0.5 mt-0.5 font-mono text-blue-600 dark:text-blue-400">concierge@letmeklyn.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-4.5 w-4.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">Service Hours</p>
                    <p className="mt-0.5">Mon - Sun: 07:00 AM - 09:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Middle Column: Interactive details contact form */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Request Custom Large Quote</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-500/20 p-4 text-xs text-emerald-805 dark:bg-emerald-950/30 dark:text-emerald-350 flex items-center space-x-2.5">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-bold">Form submitted successfully! ALetMeKlyn manager is preparing a custom quote envelope now.</span>
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Samuel Boateng"
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs outline-none bg-slate-50/50 focus:bg-white focus:border-blue-500 dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sam@example.com"
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs outline-none bg-slate-50/50 focus:bg-white focus:border-blue-500 dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 block mb-1">Premise Detailing Requirements *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about details: square footage, room counts, state of premises, preferred safe bio detergents, and target dates..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs outline-none bg-slate-50/50 focus:bg-white focus:border-blue-500 dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="rounded-xl bg-blue-50/15 p-3.5 border border-blue-50 dark:bg-blue-950/15 dark:border-blue-950 text-[10px] text-slate-500">
                <span className="font-extrabold text-blue-600 block mb-0.5">Elite SLA Timeline:</span>
                Enterprise quotes are processed by heads of operations within a strict 1-hour window.
              </div>

              <button
                type="submit"
                id="contact-form-submit"
                className="w-full inline-flex justify-center items-center space-x-1.5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-805 dark:bg-blue-600 dark:hover:bg-blue-500 text-xs font-bold transition-all"
              >
                <span>Request Custom Quote Invoice</span>
                <Send className="h-4 w-4" />
              </button>

            </form>
          </div>

          {/* Right Column: Google Maps simulation card placeholder */}
          <div className="lg:col-span-3 text-center space-y-4">
            <span className="text-[10px] tracking-widest font-extrabold text-slate-450 uppercase block">Dispatch Perimeter</span>
            
            {/* Mock aesthetic Map */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden dark:border-slate-900 dark:bg-slate-950 h-64 flex flex-col justify-between p-5 text-left relative shadow-sm">
              <div className="space-y-1 relative z-10">
                <span className="inline-block rounded-md bg-teal-50 px-2 py-0.5 text-[8px] font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                  Global Service Area
                </span>
                <h4 className="text-xs font-black text-slate-805 text-slate-900 dark:text-white mt-1">Pantang-Madina Dispatch Map</h4>
                <p className="text-[10px] text-slate-400 leading-normal">Full 45-mile coverage around Pantang-Madina core area.</p>
              </div>

              {/* Vector grid looking mock map illustration */}
              <div className="absolute inset-0 z-0 bg-blue-50/30 dark:bg-slate-950 opacity-60 flex flex-col justify-around">
                <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-850" />
                <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-850" />
                <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-850" />
                <div className="w-[1px] h-full bg-slate-200 dark:bg-slate-850 absolute top-0 left-1/4" />
                <div className="w-[1px] h-full bg-slate-200 dark:bg-slate-850 absolute top-0 left-2/4" />
                <div className="w-[1px] h-full bg-slate-200 dark:bg-slate-850 absolute top-0 left-3/4" />
                
                {/* Visual pulsating mock pointer pin */}
                <div className="absolute top-[45%] left-[55%] flex h-8 w-8 items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <div className="relative h-4 w-4 rounded-full bg-blue-600 border border-white flex items-center justify-center shadow">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto flex justify-between items-center bg-white/95 backdrop-blur-sm dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-bold text-slate-500">Coordinate dispatch area active</span>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 p-1.5 text-white text-[9px] font-bold flex items-center space-x-1"
                >
                  <span>Launch Google Maps</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              <p>📍 Verified and covered by general liability insurance policy certificates.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
