import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import Breadcrumb from '../components/Breadcrumb';

const categories = [
  {
    id: 'cranes',
    title: 'Cranes & Heavy Lift Fleet',
    count: '180+ Units',
    icon: 'construction',
    badge: 'Heavy Lift Division',
    image: '/images/crane-1.jpg',
    desc: 'All-terrain, rough-terrain, crawler, and heavy lattice-boom cranes from Liebherr, Tadano, Grove, and Manitowoc with digital load management.',
    specs: [
      { name: 'All-Terrain Mobile Cranes', value: '50T – 500T Capacity', tag: 'Liebherr / Tadano' },
      { name: 'Heavy Crawler Cranes', value: '100T – 500T Lattice', tag: 'Demag / Manitowoc' },
      { name: 'Rough-Terrain Cranes', value: '20T – 120T 4x4', tag: 'Grove / Kato' },
      { name: 'Telescopic Heavy Handlers', value: '6T – 20T Reach', tag: 'Merlo / Manitou' },
    ],
  },
  {
    id: 'transport',
    title: 'Heavy Transport & Modular SPMT',
    count: '350+ Units',
    icon: 'airport_shuttle',
    badge: 'Logistics & Haulage',
    image: '/images/operations_tasnee_opt.jpg',
    desc: 'Complete heavy transport solutions for petrochemical modules, precast elements, oversized refinery vessels, and severe desert hauls.',
    specs: [
      { name: 'Heavy Hydraulic Lowbeds', value: '50T – 150T Payload', tag: 'SCHEUERLE' },
      { name: 'Hydraulic Multi-Axle SPMT', value: 'Modular / Coupled', tag: 'Goldhofer' },
      { name: 'Heavy Stepframe Trailers', value: '30T – 80T Extended', tag: 'Faymonville' },
      { name: 'Vacuum HazMat Tankers', value: '5,000L – 30,000L', tag: 'ADR Certified' },
    ],
  },
  {
    id: 'earthmoving',
    title: 'Earthmoving & Civil Rigs',
    count: '600+ Units',
    icon: 'agriculture',
    badge: 'Infrastructure Division',
    image: '/images/hero-site.jpg',
    desc: 'Caterpillar, Komatsu, and Volvo earthmoving fleet for gigaproject mass grading, petrochemical foundations, and trenching corridors.',
    specs: [
      { name: 'Heavy Hydraulic Excavators', value: '20T – 80T Mass Excavation', tag: 'CAT 349 / Komatsu' },
      { name: 'Heavy Tracked Bulldozers', value: 'CAT D8R – D11T', tag: 'High-Sprocket Rippers' },
      { name: 'Heavy Motor Graders', value: '140M – 24M Blades', tag: 'GPS Guided Laser' },
      { name: 'Articulated Dump Trucks', value: '30T – 60T All-Terrain', tag: 'Volvo A40G' },
    ],
  },
  {
    id: 'power',
    title: 'Power Generation & Chillers',
    count: '750+ Units',
    icon: 'electric_bolt',
    badge: 'Utility Systems',
    image: '/images/industrial-1.jpg',
    desc: 'Prime-power synchronized generator farms, trailer-mounted industrial chillers, and temporary medium-voltage substations.',
    specs: [
      { name: 'Prime Generator Sets', value: '30 kVA – 2,000 kVA', tag: 'Cummins / CAT' },
      { name: 'Industrial Mobile Chillers', value: '500 TR – 5,000 TR', tag: 'Aggreko / Trane' },
      { name: 'Mobile Step-Up Transformers', value: '400V to 13.8kV / 34.5kV', tag: 'Containerized' },
      { name: 'High-Mast LED Light Towers', value: '9M Mast / Solar Hybrid', tag: 'Generac' },
    ],
  },
  {
    id: 'forklifts',
    title: 'Forklifts & Laydown Logistics',
    count: '420+ Units',
    icon: 'forklift',
    badge: 'Yard Material Handling',
    image: '/images/operations_jampilen_opt.jpg',
    desc: 'Heavy industrial material handling units for petrochemical storage yards, maritime ports, and industrial laydown staging.',
    specs: [
      { name: 'Heavy Diesel Forklifts', value: '3T – 25T Capacity', tag: 'Toyota / Hyster' },
      { name: 'Rough-Terrain 4WD Forklifts', value: '5T – 16T Desert Spec', tag: 'Manitou' },
      { name: 'Port Reach Stackers', value: '45T Container Stacking', tag: 'Konecranes / Kalmar' },
      { name: 'Heavy Duty Telehandlers', value: '3T–5T @ 17M Height', tag: 'JCB / Bobcat' },
    ],
  },
  {
    id: 'pumps',
    title: 'High-Pressure Pumps & Compressors',
    count: '200+ Units',
    icon: 'compress',
    badge: 'Mechanical Support',
    image: '/images/refinery_maintenance.jpg',
    desc: 'Industrial-grade pumping, nitrogen purging, hydro-testing, and pneumatic power for process plants and offshore terminals.',
    specs: [
      { name: 'Hydro-Jetting Pump Units', value: 'Up to 40,000 PSI', tag: 'WOMA / NLB German' },
      { name: 'Centrifugal High-Flow Pumps', value: 'Up to 5,000 GPM', tag: 'Godwin / Cornell' },
      { name: 'Industrial Air Compressors', value: '375 – 1,600 CFM', tag: 'Atlas Copco / Sullair' },
      { name: 'Chemical Transfer Skid Pumps', value: '316L SS Corrosion Spec', tag: 'Wilden' },
    ],
  },
];

const brands = [
  'Liebherr', 'Tadano', 'Grove', 'Manitowoc', 'CAT', 'Komatsu', 'Volvo',
  'SCHEUERLE', 'Aggreko', 'Cummins', 'Atlas Copco', 'Konecranes', 'JLG', 'Genie'
];

const categoryFilters = [
  { id: 'all', label: 'All Fleet', count: '1,500+', icon: 'dashboard', desc: 'Complete Fleet' },
  { id: 'cranes', label: 'Cranes', count: '180+', icon: 'precision_manufacturing', desc: '50T–500T Mobile' },
  { id: 'transport', label: 'Heavy Transport', count: '350+', icon: 'local_shipping', desc: 'Lowbed & SPMT' },
  { id: 'earthmoving', label: 'Earthmoving', count: '600+', icon: 'construction', desc: 'CAT & Komatsu' },
  { id: 'power', label: 'Power & Cooling', count: '750+', icon: 'bolt', desc: 'GenSets & Chillers' },
  { id: 'forklifts', label: 'Forklifts', count: '420+', icon: 'forklift', desc: 'Yard & Laydown' },
  { id: 'pumps', label: 'Pumps & Air', count: '200+', icon: 'compress', desc: '40K PSI Hydro' },
];

export default function Equipment() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  useReveal([activeCategory, searchTerm]);
  
  // Interactive Fleet Mobilization Estimator State
  const [estEquipment, setEstEquipment] = useState('cranes');
  const [estRegion, setEstRegion] = useState('eastern');

  // Map equipment category id -> Exact category title in RFQ catalog
  const _equipSvcMap = {
    cranes: 'Cranes & Heavy Lift Fleet',
    transport: 'Heavy Transport & Modular SPMT',
    earthmoving: 'Earthmoving & Civil Rigs',
    power: 'Power Generation & Chillers',
    forklifts: 'Forklifts & Laydown Logistics',
    pumps: 'High-Pressure Pumps & Compressors',
  };
  const getEquipRfqLink = (catId) =>
    `/contact?service=${encodeURIComponent(_equipSvcMap[catId] || 'Cranes & Heavy Lift Fleet')}&page=equipment&equipment=${encodeURIComponent(catId)}#rfq-form`;

  const filteredCategories = categories.filter((cat) => {
    const matchesTab = activeCategory === 'all' || cat.id === activeCategory;
    const matchesSearch = searchTerm === '' || 
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.specs.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.value.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-white text-slate-900 selection:bg-brand-blue selection:text-white">
      {/* ── 1. CLEAN 2-COLUMN SPLIT FLEET HERO WITH AMBIENT BACKGROUND VIDEO ── */}
      <section className="relative min-h-[520px] lg:min-h-[580px] pt-28 pb-16 border-b border-slate-200">        {/* Video clipped by its own wrapper — section has no overflow boundary so scroll events pass through */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/cranes_fleet_hero.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/custom/heavy_machinery.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Sophisticated Gradient Scrim: Solid text clarity on left, dynamic video vibrancy on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.97) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(255, 255, 255, 0.55) 68%, rgba(255, 255, 255, 0.18) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-slate-50/20 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          {/* Standardized Fixed Breadcrumb */}
          <Breadcrumb items={[{ label: 'Equipment Fleet' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Clean High-Contrast Information Architecture */}
            <div className="lg:col-span-8 xl:col-span-7 space-y-6">

              {/* Title & Tagline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[1.15]">
                  Heavy <span className="grad-text">Equipment Fleet</span>
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  1,500+ modern heavy machinery assets maintained strictly to OEM standards, 100% third-party TUV inspected, and operated by Saudi Aramco pre-qualified certified operators across the Kingdom.
                </p>
              </div>

              {/* Key Highlights Checklist Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {[
                  'Liebherr & Tadano Certified',
                  '< 2-Hour SLA Rapid Dispatch',
                  'Rigorous OEM PM Schedules',
                  '100% Aramco / TUV Badged',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 text-slate-700 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[15px] text-brand-green font-bold">check_circle</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* 4 Telemetry Metrics Grid (Integrated Dock) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:border-brand-blue/40 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Total Fleet</div>
                  <div className="text-lg sm:text-xl font-black text-brand-slate mt-0.5">1,500+ Units</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:border-brand-green/40 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Max Capacity</div>
                  <div className="text-lg sm:text-xl font-black text-brand-green mt-0.5">500T Mobile</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:border-brand-blue/40 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Mobilization SLA</div>
                  <div className="text-lg sm:text-xl font-black text-brand-blue mt-0.5">&lt; 2 Hours</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm hover:border-amber-500/40 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Certification</div>
                  <div className="text-lg sm:text-xl font-black text-amber-600 mt-0.5">100% TUV</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. HIGH-VISIBILITY FLEET FILTER CONTROL CENTER (Clean Light Theme) ── */}
      <section className="py-8 bg-slate-50/90 border-b border-slate-200 relative z-20">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-6">
          {/* Header & Search Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-green font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Fleet Inventory Directory
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-brand-slate uppercase tracking-tight">
                Filter Fleet By Equipment Class
              </h2>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search specs, capacity, OEM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-brand-slate placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue shadow-sm transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sleek Modern Pill Tabs - Dynamic count badges & refined micro-interactions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border group ${
                    isActive
                      ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/25 ring-2 ring-brand-blue/20 -translate-y-0.5'
                      : 'bg-white text-slate-700 border-slate-200/90 shadow-sm hover:border-slate-300 hover:text-brand-blue hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-blue'
                    }`}
                  >
                    {cat.icon}
                  </span>
                  <span className="tracking-tight uppercase whitespace-nowrap">{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-brand-blue'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter / Search Status Indicator */}
          {(activeCategory !== 'all' || searchTerm) && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-brand-green">filter_list</span>
                Filtering by:{' '}
                <span className="text-brand-slate font-bold">
                  {categoryFilters.find((c) => c.id === activeCategory)?.label}
                </span>
                {searchTerm && (
                  <>
                    {' '}+ keyword <span className="text-brand-green font-bold">"{searchTerm}"</span>
                  </>
                )}
                {' '}({filteredCategories.length} category matches)
              </span>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('');
                }}
                className="text-brand-blue hover:underline font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. FLEET SPECIFICATION CARDS GRID ── */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          {filteredCategories.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 max-w-xl mx-auto space-y-4">
              <span className="material-symbols-outlined text-5xl text-slate-400">search_off</span>
              <h3 className="text-xl font-bold text-slate-800">No machinery matching "{searchTerm}"</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Try searching for specific tonnage (e.g. 500T), machinery type, or clear your search to browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-blue-600 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="reveal rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-blue/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Compact Equipment Photo Banner */}
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Floating Micro-Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/80 shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                          {cat.badge}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-brand-blue text-white shadow-md">
                          {cat.count}
                        </span>
                      </div>
                    </div>

                    {/* Card Content & Compact 2x2 Specs */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-brand-green font-bold">
                          Operational Class
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-brand-slate uppercase tracking-tight group-hover:text-brand-blue transition-colors line-clamp-1">
                          {cat.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {cat.desc}
                      </p>

                      {/* 2x2 High-Density Technical Parameter Matrix */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        {cat.specs.map((s, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-slate-50/90 border border-slate-100 group-hover:border-slate-200/80 transition-colors flex flex-col justify-between min-h-[48px]"
                          >
                            <span className="text-[10px] text-slate-500 font-medium truncate block">
                              {s.name}
                            </span>
                            <div className="flex items-center justify-between gap-1 mt-0.5">
                              <span className="text-[11px] font-bold text-brand-blue truncate">
                                {s.value}
                              </span>
                              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-white text-slate-500 border border-slate-200 shrink-0">
                                {s.tag.split('/')[0].trim()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Streamlined Action Footer */}
                  <div className="p-4 sm:p-5 pt-0">
                    <Link
                      to={getEquipRfqLink(cat.id)}
                      className="w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-brand-blue bg-blue-50/80 hover:bg-brand-blue hover:text-white border border-blue-100/80 hover:border-brand-blue shadow-sm transition-all flex items-center justify-between group/btn"
                    >
                      <span>Request Quotation</span>
                      <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-1">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </section>

      {/* ── 4. INTERACTIVE MOBILIZATION ESTIMATOR TOOL (Cool Dynamic Widget) ── */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden reveal">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="max-w-3xl mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              Fleet Mobilization & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-green">Lead Time Estimator</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Select your required asset class and operational sector to calculate guaranteed mobilization lead time from our regional staging depots.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">1. Select Asset Class</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'cranes', label: '50T–500T Mobile Cranes' },
                    { id: 'transport', label: 'Heavy Lowbeds & SPMT' },
                    { id: 'earthmoving', label: 'Excavators & Bulldozers' },
                    { id: 'power', label: 'Multi-MW Generators' },
                    { id: 'chillers', label: 'Industrial Chillers' },
                    { id: 'jetting', label: '40,000 PSI Jetting Pumps' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setEstEquipment(item.id)}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                        estEquipment === item.id
                          ? 'bg-brand-blue text-white border-blue-400 shadow-md shadow-brand-blue/30'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">2. Select Project Location</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'eastern', label: 'Eastern Province (Jubail/Dammam)' },
                    { id: 'western', label: 'Western Province (NEOM/Tabuk)' },
                    { id: 'central', label: 'Central Corridor (Riyadh/Haradh)' },
                  ].map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setEstRegion(loc.id)}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                        estRegion === loc.id
                          ? 'bg-brand-green text-slate-950 border-brand-green shadow-md shadow-brand-green/30'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green">Guaranteed Mobilization SLA</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">READY NOW</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Dispatch Time</div>
                  <div className="text-3xl font-black text-white">
                    {estRegion === 'eastern' ? '< 45 Minutes' : estRegion === 'western' ? '< 90 Minutes' : '< 60 Minutes'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Staging Depot</div>
                    <div className="font-bold text-slate-200 mt-0.5">
                      {estRegion === 'eastern' ? 'Jubail Heavy Yard' : estRegion === 'western' ? 'Tabuk / Sharma Depot' : 'Haradh / Riyadh Base'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Certified Operators</div>
                    <div className="font-bold text-brand-green mt-0.5">Included (Aramco Valid)</div>
                  </div>
                </div>
              </div>

              <Link
                to={getEquipRfqLink(estEquipment)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/30 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Confirm Reservation with Fleet Ops</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. OEM BRANDS SHOWCASE ── */}
      <section className="py-14 bg-slate-950 border-t border-slate-800 reveal">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <p className="text-center text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-8">
            Factory-Certified Heavy Equipment Manufacturers in Fleet
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {brands.map((b, i) => (
              <span
                key={i}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-slate-300 shadow-sm hover:border-brand-blue hover:text-white transition-all cursor-default"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
