import { ShieldAlert, Leaf, HeartHandshake, Smile, Users, Award, Trash } from 'lucide-react';

export default function AboutUsSection() {
  const values = [
    {
      icon: <Leaf className="h-6 w-6 text-emerald-500" />,
      title: "100% Eco-Safe Standard",
      description: "Our detailing recipes use strictly biodegradable, zero-toxin concentrates that are perfectly safe for babies, curious kittens, and sensitive skin."
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Vetted Elite Professionals",
      description: "Every crew member undergoes background checks, rigorous training standards, and a series of deep hospitality sanitization certification exams."
    },
    {
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: "The Klyn Guarantee",
      description: "Not absolutely thrilled by our detailing attention? Let us know within 24 hours, and we'll dispatch a squad to re-polish any areas free of charge."
    }
  ];

  const team = [
    {
      name: "Clara Bennett",
      role: "Head of Environmental Quality Control",
      bio: "Oversees selection of pet-safe detergents and strict allergen extraction certifications.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Kenji Sato",
      role: "Operations Director",
      bio: "Manages real-time technician training and smart dispatch routing architectures.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Alisha Patel",
      role: "Senior Detailing Trainer",
      bio: "Leads our hands-on premium grout, post-renovation, and marble treatment workshops.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-16 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Description */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6 text-left">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Our Shared Mission</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              We klyn so you can dream.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              LetMeKlyn was born with a single premise: standard cleaning services felt transactional and unreliable. We set out to build a digital-first premium platform where safety, visual proof, and precision scheduling are baked into every booking.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              We leverage advanced green science, high-temperature sanitizing technology, and detailed quality checklists. Our custom LetMeKlyn portal empowers you to customize exact priorities and track dispatched technicians step-by-step.
            </p>

            {/* Satisfaction Metrics card */}
            <div className="rounded-2xl border border-blue-50 bg-blue-50/20 p-5 dark:border-blue-950/30 dark:bg-blue-950/20 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">99.7%</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-1">Checklist Score</p>
              </div>
              <div className="border-l border-slate-200/50 dark:border-slate-800" />
              <div>
                <p className="text-2xl font-black text-teal-600 dark:text-teal-400">85,000+</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-1">Chemical-Free hrs</p>
              </div>
            </div>
          </div>

          {/* Environmental Mission Visual illustration / image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative overflow-hidden rounded-3xl shadow-xl max-w-lg">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" 
                alt="Professional, friendly cleaning team" 
                className="h-full w-full object-cover max-h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-6 text-left">
                <div>
                  <p className="font-extrabold text-white text-lg">Hospitality-grade standards</p>
                  <p className="text-sm text-slate-200">Our team arriving fully equipped with advanced Swiss allergen filter extractors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Values Grid */}
        <div className="mt-16 border-t border-slate-100 pt-16 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Why LetMeKlyn stands apart</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Our guidelines guarantee a highly visual, trustworthy home maintenance experience.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="rounded-2xl border border-slate-100 p-6 bg-slate-50/50 dark:border-slate-800/60 dark:bg-slate-950/10 text-left hover:scale-[1.01] transition-all duration-200"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-900 mb-4">
                  {v.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{v.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certified Team Meet Section */}
        <div className="mt-16 border-t border-slate-100 pt-16 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase">Behind the Magic</span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Meet our Lead Coordinators</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Our operations are designed and audited by green health specialists.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {team.map((t, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 bg-slate-50/20 p-6 rounded-2xl dark:bg-slate-950/5">
                <img 
                  src={t.img} 
                  alt={t.name} 
                  className="h-24 w-24 rounded-full object-cover border-2 border-blue-500/20 shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{t.role}</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
