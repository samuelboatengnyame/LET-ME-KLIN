import { useState } from 'react';
import { Sparkles, Sliders, Play, Award, CheckCircle } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  before: string;
  after: string;
  description: string;
}

export default function GallerySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Before & After comparisons dataset with high quality premium visuals
  const items: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Kitchen Counter & Ceramic Cooktop',
      category: 'Deep Cleaning',
      before: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop', // classic styled before
      after: 'https://images.unsplash.com/photo-1556911220-115f74af8897?q=80&w=600&auto=format&fit=crop', // cooktop after
      description: 'Full scale removal of carbonized fat deposits, appliance polishing, and tile backsplash steam-cleans.'
    },
    {
      id: 'g2',
      title: 'Master Bathroom Shower & Grout',
      category: 'Deep Intensive',
      before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1528740561666-42477ef02524?q=80&w=600&auto=format&fit=crop',
      description: 'Scale and lime buildup eradication, grout bleaching, porcelain tile restoration, and mold repellent shield sealant.'
    },
    {
      id: 'g3',
      title: 'Living Room Fabric Sofa',
      category: 'Sofa & Carpet Extraction',
      before: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop',
      description: 'Multi-cycle steam enzyme extraction. Polishes coffee stains and eliminates dog dander/allergens.'
    },
    {
      id: 'g4',
      title: 'Renovated Apartment Hallway',
      category: 'Post-Construction Detailing',
      before: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
      description: 'Removing extensive drywall white film, adhesive drips, and scuff marks to showcase architectural flooring.'
    }
  ];

  // Interactive slider components can be styled easily with a state that controls split percentage
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    g1: 50,
    g2: 50,
    g3: 50,
    g4: 50
  });

  const handleSliderMove = (itemId: string, percent: number) => {
    setSliderPositions(prev => ({
      ...prev,
      [itemId]: Math.min(100, Math.max(0, percent))
    }));
  };

  return (
    <section className="bg-white py-16 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Interactive Evidence</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Visual Clean Proof</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Drag the visual slider bar side-by-side on any project card below to see the LetMeKlyn transformation.
          </p>
        </div>

        {/* Gallery grid containing comparison cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2" id="gallery-comparison-grid">
          {items.map((item) => {
            const position = sliderPositions[item.id] ?? 50;

            return (
              <div 
                key={item.id} 
                className="rounded-2xl border border-slate-100 bg-slate-55 shadow-md overflow-hidden bg-slate-50 dark:border-slate-800 dark:bg-slate-950 p-5 text-left flex flex-col justify-between"
              >
                
                {/* Visual Header */}
                <div className="flex justify-between items-start pb-4 border-b border-slate-200/50 dark:border-slate-800">
                  <div>
                    <span className="text-[9px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 py-1 px-2.5 rounded-lg">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <span className="flex items-center text-xs font-bold text-teal-600">
                    <CheckCircle className="h-4 w-4 mr-1 text-teal-500" />
                    Guaranteed Outcome
                  </span>
                </div>

                {/* Slider Canvas Container */}
                <div 
                  className="relative h-64 sm:h-72 w-full mt-4 rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-100 dark:border-slate-800"
                  onMouseMove={(e) => {
                    if (e.buttons === 1 || e.buttons === 0) { // dragging or simple mouse moving triggers splits
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const pct = (x / rect.width) * 100;
                      handleSliderMove(item.id, pct);
                    }
                  }}
                  onTouchMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const touch = e.touches[0];
                    const x = touch.clientX - rect.left;
                    const pct = (x / rect.width) * 100;
                    handleSliderMove(item.id, pct);
                  }}
                >
                  
                  {/* Before state image */}
                  <img 
                    src={item.before} 
                    alt="Before State" 
                    className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                  />
                  <div className="absolute top-3 left-3 bg-red-600/85 backdrop-blur-sm text-[10px] uppercase font-bold text-white py-1 px-2.5 rounded shadow">
                    Before
                  </div>

                  {/* After state image clipped dynamically */}
                  <div 
                    className="absolute inset-y-0 right-0 overflow-hidden select-none"
                    style={{ left: `${position}%` }}
                  >
                    <img 
                      src={item.after} 
                      alt="After State" 
                      className="absolute top-0 right-0 h-full w-full object-cover select-none pointer-events-none"
                      style={{ width: '100vw', maxWidth: 'none', right: 0 }} // match parent size split
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-teal-600/85 backdrop-blur-sm text-[10px] uppercase font-bold text-white py-1 px-2.5 rounded shadow">
                    After
                  </div>

                  {/* Slider middle line divider handle */}
                  <div 
                    className="absolute inset-y-0 w-1 bg-white cursor-ew-resize mix-blend-difference flex items-center justify-center"
                    style={{ left: `${position}%` }}
                  >
                    <div className="h-9 w-9 rounded-full bg-white text-slate-900 border border-slate-200/80 shadow-md flex items-center justify-center text-xs pointer-events-none transition-transform scale-90">
                      <Sliders className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>

                  {/* Help guideline indicator overlay */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/60 backdrop-blur-sm px-3.5 py-1 text-[9px] font-bold text-slate-100 flex items-center space-x-1">
                    <Sliders className="h-3 w-3 text-teal-400 rotate-90" />
                    <span>Swipe or slide to inspect</span>
                  </div>

                </div>

                {/* Card Description */}
                <p className="text-xs text-slate-500 mt-4 leading-relaxed dark:text-slate-450 border-t border-slate-100 dark:border-slate-800 pt-3 flex-grow">
                  {item.description}
                </p>

              </div>
            );
          })}
        </div>
        
        {/* Bottom review anchor */}
        <div className="mt-12 rounded-2xl bg-slate-50 p-6 dark:bg-slate-950/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Expecting similar spotless outcomes?</h4>
            <p className="text-xs text-slate-500">Every single cleaner brings identical steam extractors & medical-grade chemical shields.</p>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // let them scroll and book
            className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white px-5 py-2.5 shadow-md shadow-blue-500/10 transition-colors"
          >
            Schedule a Free Estimate
          </button>
        </div>

      </div>
    </section>
  );
}
