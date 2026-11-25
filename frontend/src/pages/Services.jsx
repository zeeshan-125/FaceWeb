import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import Breadcrumb from '../components/Breadcrumb';

const industrialDivisions = [
  {
    id: 'hydrojetting',
    title: 'Ultra High-Pressure (UHP) Hydrojetting',
    subtitle: '40,000 PSI Automated Bundle Blasting & Tube Descaling',
    image: '/images/services/services_hydrojetting.jpg',
    tag: '40,000 PSI Industrial Cleaning',
    desc: 'Automated ultra-high pressure water jetting up to 40,000 PSI (2,800 bar) engineered for petrochemical heat exchangers, reboilers, and vessel internals. Utilizing computer-controlled StoneAge 3D nozzles to restore heat transfer efficiency while eliminating manual lance hazards.',
    specs: [
      { label: 'Max Jetting Pressure', value: '40,000 PSI (2,800 Bar)' },
      { label: 'Flow Rates', value: 'Up to 320 L/min' },
      { label: 'Tooling Technology', value: 'StoneAge 3D Rotary Heads' },
      { label: 'Operator Accreditation', value: '100% Aramco / WJA Certified' },
    ],
    features: [
      'Automated multi-lance shell-and-tube heat exchanger internal cleaning',
      'Hydraulic aerial bundle extractors with 35-ton pull capacity for rapid turnaround pulling',
      'Vessel, column, and pipeline descaling eliminating heavy coke and polymer scaling',
      'Zero chemical effluent runoff with closed-loop water filtration and containment',
    ],
    highlight: 'Restores heat exchanger thermal efficiency to > 98% design baseline',
  },
  {
    id: 'steaming-precomm',
    title: 'Steaming, Oil Flushing & Pre-Commissioning',
    subtitle: 'Complete Plant Readiness & Lube Oil Circuit Conditioning',
    image: '/images/services/services_turnaround.jpg',
    tag: 'Pre-Commissioning Services',
    desc: 'End-to-end steaming services, lube/seal/hydraulic oil flushing, particle filtration, and pre-commissioning support for petrochemical plants, refineries, and industrial facilities. Ensuring equipment readiness and system cleanliness to OEM specifications before handover.',
    specs: [
      { label: 'Steaming Capacity', value: 'High-Volume Industrial Boilers' },
      { label: 'Oil Flushing', value: 'Lube / Seal / Hydraulic Circuits' },
      { label: 'Filtration Standard', value: 'NAS 1638 / ISO 4406 Compliance' },
      { label: 'Dewatering Fleet', value: 'Submersible & Centrifugal Pumps' },
    ],
    features: [
      'Industrial steaming for pipeline purging, vessel decontamination, and heat tracing',
      'Lube, seal, and hydraulic oil flushing to OEM cleanliness specifications',
      'Particle filtration and system cleanliness verification to NAS / ISO standards',
      'Dewatering pump deployment for excavation, pipeline, and tank dewatering operations',
    ],
    highlight: 'Complete plant readiness services from steaming through to final pre-commissioning handover',
  },
  {
    id: 'chemical',
    title: 'Chemical Cleaning & Decontamination',
    subtitle: 'Engineered Vapor-Phase Degassing & Boiler Boil-Out',
    image: '/images/services/services_chemical.jpg',
    tag: 'Vapor-Phase Decontamination',
    desc: 'Advanced chemical circulation and vapor-phase degassing neutralizing pyrophoric iron sulfides, toxic benzene vapors, and H2S prior to vessel entry. Slashes turnaround decontamination schedules from days to mere hours while ensuring total personnel safety.',
    specs: [
      { label: 'Atmospheric Target', value: '< 0.0 ppm H2S / 0% LEL' },
      { label: 'Cleaning Chemistry', value: 'Citric / EDTA / Solvents' },
      { label: 'Pumping Equipment', value: 'ATEX Zone-1 Chemical Skids' },
      { label: 'Environmental Permit', value: 'NCEC Compliant Neutralization' },
    ],
    features: [
      'Vapor-phase chemical cleaning eliminating vessel steaming delays and volatile emissions',
      'Pre-commissioning degreasing, acid pickling, and passivation for high-pressure boilers',
      'Fin-fan air cooler foam cleaning and external tube bundle scale removal',
      'Onsite mobile effluent neutralization skids buffering spent chemistry to neutral pH',
    ],
    highlight: 'Reduces vessel decontamination downtime by up to 60% compared to traditional steaming',
  },
  {
    id: 'tank-cleaning',
    title: 'Non-Entry Tank Cleaning & Sludge Pumping',
    subtitle: 'Automated 3D Sludge Fluidization & Hydrocarbon Recovery',
    image: '/images/services/services_tank.jpg',
    tag: 'Robotic Tank Cleaning',
    desc: 'Automated non-entry tank cleaning systems (NE-TCS) designed for crude oil, feedstock, and chemical storage tanks up to 120 meters in diameter. Fluidizes heavy tank bottoms, extracts sludge via explosion-proof vacuum systems, and reclaims valuable crude oil.',
    specs: [
      { label: 'Tank Capacities', value: 'Up to 120m Diameter Tanks' },
      { label: 'Hydrocarbon Recovery', value: 'Up to 90% Pure Crude' },
      { label: 'Safety Approach', value: 'Zero Personnel Entry' },
      { label: 'Inert Atmosphere', value: '99.5% Nitrogen Purging' },
    ],
    features: [
      'Automated high-velocity fluidizing cannon heads operated remotely outside containment',
      'Inert gas blankets maintaining oxygen levels below 4% to prevent explosive atmospheres',
      'High-vacuum 316-stainless tankers and ATEX Zone-0 submersible sludge pumps',
      'Integrated centrifuge decanters separating recovered crude from inert solids and water',
    ],
    highlight: 'Eliminates confined-space entry hazards while returning hundreds of barrels to feedstocks',
  },
];

const specializedTooling = [
  {
    title: '40,000 PSI High-Volume Pump Skids',
    category: 'Hydro-Blasting',
    specs: 'Hammelmann / Woma Units â€¢ 40K PSI â€¢ 320 L/min',
    desc: 'Heavy-duty diesel driven pressure pumps fitted with electronic burst discs, pneumatic dump guns, and wireless safety stops.',
    icon: 'speed',
  },
  {
    title: 'Hydraulic Aerial Bundle Extractors',
    category: 'Bundle Extraction',
    specs: '35-Ton Pull Capacity â€¢ Self-Contained Diesel Power',
    desc: 'Truck-mounted and crane-suspended pullers capable of extracting massive refinery heat exchanger bundles in under 20 minutes.',
    icon: 'forklift',
  },
  {
    title: 'Automated 3D Tank Cleaning Heads',
    category: 'Non-Entry TCS',
    specs: 'StoneAge 3D Dual-Axis â€¢ 150 PSI Wash Feed',
    desc: 'High-impact programmable rotary nozzles providing 360-degree impingement coverage to strip sludge without man-entry.',
    icon: 'autorenew',
  },
  {
    title: 'ATEX Zone-1 Chemical Circulation Skids',
    category: 'Chemical Decon',
    specs: 'Stainless 316 Impellers â€¢ Explosion-Proof Motors',
    desc: 'High-temperature, chemical-resistant circulation pumps designed for safe operation inside live refinery battery limits.',
    icon: 'bolt',
  },
  {
    title: 'Calibrated Hydraulic Bolt Tensioning Skids',
    category: 'Flange Management',
    specs: 'Up to 2,500 Bar Hydraulic Pressure â€¢ Multi-Stud',
    desc: 'Synchronized multi-stud tensioners ensuring leak-free flange connections verified by ultrasonic elongation monitoring.',
    icon: 'tune',
  },
  {
    title: 'Mobile Vapor Scrubbing & Neutralization Units',
    category: 'Environmental Compliance',
    specs: 'Activated Carbon & Wet Scrubber â€¢ Dual-Bed',
    desc: 'Captures and neutralizes hazardous emissions and mercaptans vented during vessel degassing and chemical steaming.',
    icon: 'filter_alt',
  },
];

const sovereignCredentials = [
  { name: 'Saudi Aramco', desc: 'Pre-Qualified Industrial Services Contractor', code: 'Vendor #10084291' },
  { name: 'SABIC', desc: 'Approved Hydrojetting & Chemical Cleaning Vendor', code: 'SABIC-IND-AUTH' },
  { name: 'Royal Commission', desc: 'Jubail & Yanbu Environmental Compliance (RCER 2020)', code: 'RCJY-CERT-VALID' },
  { name: 'ISO 9001:2015', desc: 'Quality Management System for Industrial Operations', code: 'Global Accreditation' },
  { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety Industrial Standard', code: 'Zero-Harm Benchmark' },
  { name: 'WJA Certified', desc: 'Water Jetting Association Certified Jetting Operators', code: 'Certified Supervisors' },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  useReveal([activeTab]);

  // Map active tab index to exact division title from Picture 1
  const _svcMap = [
    'Ultra High-Pressure (UHP) Hydrojetting',
    'Steaming, Oil Flushing & Pre-Commissioning',
    'Chemical Cleaning & Decontamination',
    'Non-Entry Tank Cleaning & Sludge Pumping',
  ];
  const currentServiceTitle = _svcMap[activeTab] || 'Ultra High-Pressure (UHP) Hydrojetting';
  const rfqLink = `/contact?service=${encodeURIComponent(currentServiceTitle)}&page=industrial#rfq-form`;

  return (
    <div className="bg-white text-brand-slate selection:bg-brand-blue selection:text-white">
      {/* â”€â”€ 1. CINEMATIC VIDEO HERO BANNER (Clean Light Theme) â”€â”€ */}
      <section className="relative min-h-[520px] lg:min-h-[580px] pt-28 pb-16 overflow-hidden bg-slate-50 border-b border-slate-200">
        {/* Looping Live Industrial Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/services/services_hydrojetting.jpg"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/custom/welding_torch.mp4" type="video/mp4" />
        </video>

        {/* Sophisticated Light Gradient Scrim: Solid text clarity on left, dynamic video vibrancy on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.94) 42%, rgba(255, 255, 255, 0.58) 68%, rgba(255, 255, 255, 0.18) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 via-transparent to-slate-50/30 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          {/* Standardized Fixed Breadcrumb */}
          <Breadcrumb items={[{ label: 'Industrial Services' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Turnaround Scope Overview */}
            <div className="lg:col-span-7 space-y-6">

              {/* Status Badge */}

              {/* Title & Tagline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[1.15]">
                  Industrial Services &amp; <span className="grad-text">Plant Maintenance</span>
                </h1>
              </div>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to={rfqLink}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/25 hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment</span>
                  <span>Request Service Scope RFP</span>
                </Link>
                <a
                  href="tel:8003223372"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-800 border border-slate-200 bg-white/90 hover:bg-white hover:border-slate-300 shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-brand-blue">emergency</span>
                  <span>24/7 Industrial Services Hotline</span>
                </a>
              </div>
            </div>

            {/* Right Column: 4 Telemetry Metrics Grid (Clean Light Theme) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Hydrojetting Power</div>
                <div className="text-xl sm:text-2xl font-black text-brand-blue mt-1">
                  <AnimatedCounter value="40,000 PSI" duration={1400} delay={150} triggerOnView={true} />
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">StoneAge 3D Nozzles</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Safety Benchmark</div>
                <div className="text-xl sm:text-2xl font-black text-brand-green mt-1">
                  <AnimatedCounter value="0.00 LTI" duration={1400} delay={300} triggerOnView={true} />
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">Zero Harm Protocol</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-slate-400 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Executed Projects</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  <AnimatedCounter value="250+" duration={1400} delay={450} triggerOnView={true} />
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">Industrial Maintenance Projects</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Mobilization SLA</div>
                <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">&lt; 2 Hours</div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">Jubail &amp; Yanbu Yards</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€ 2. SOVEREIGN ACCREDITATIONS & PRE-QUALIFICATIONS STRIP â”€â”€ */}
      <section className="py-6 bg-white border-b border-slate-200/90 text-slate-800">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {sovereignCredentials.map((badge, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${idx * 60}ms` }}
                className="reveal-card p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:border-brand-blue/50 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="text-xs font-black text-brand-slate uppercase tracking-wide">{badge.name}</div>
                  <div className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">{badge.desc}</div>
                </div>
                <div className="text-[10px] font-mono text-brand-blue font-bold pt-2 border-t border-slate-200 mt-2">
                  {badge.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ 3. INTERACTIVE 4-PILLAR INDUSTRIAL SERVICES SHOWCASE â”€â”€ */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          {/* Section Header */}
          <div className="reveal-up text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-blue text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-brand-blue">precision_manufacturing</span>
              Core Industrial Divisions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-slate uppercase tracking-tight">
              Specialized Industrial <span className="grad-text">Capabilities</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Equipped with high-pressure automated hydrojetters, specialized decontamination chemistry skids, hydraulic bundle pullers, and certified industrial field specialists.
            </p>
          </div>

          {/* Interactive Division Tabs */}
          <div className="reveal-up flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ transitionDelay: '100ms' }}>
            {industrialDivisions.map((div, idx) => (
              <button
                key={div.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-[1.02] border-2 border-brand-blue'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === idx ? 'bg-brand-blue' : 'bg-slate-400'}`} />
                <span>{div.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Showcase Card (Clean Balanced 6/6 Grid) */}
          <div className="reveal-scale bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Media Visual Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full group rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-900">
                  <img
                    src={industrialDivisions[activeTab].image}
                    alt={industrialDivisions[activeTab].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  




                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="text-xs font-bold text-white/90 drop-shadow">
                      FACE Industrial Services â€¢ Certified Petrochemical Operations
                    </div>
                  </div>
                </div>

                {/* Sub-Image Telemetry Dock */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Standard</div>
                    <div className="text-xs font-black text-brand-slate mt-0.5">ISO 45001:2018</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Execution</div>
                    <div className="text-xs font-black text-emerald-600 mt-0.5">Zero LTI Protocol</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Readiness</div>
                    <div className="text-xs font-black text-brand-blue mt-0.5">24/7 TA Standby</div>
                  </div>
                </div>
              </div>

              {/* Information & Specs Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-brand-blue mb-1">
                    Operational Scope
                  </div>
                  <h3 className="card-title-font text-2xl sm:text-3xl font-black text-brand-slate uppercase tracking-tight leading-tight">
                    {industrialDivisions[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                    {industrialDivisions[activeTab].subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {industrialDivisions[activeTab].desc}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100">
                  {industrialDivisions[activeTab].specs.map((spec, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-black text-brand-slate mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Feature Bullets */}
                <ul className="space-y-2">
                  {industrialDivisions[activeTab].features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs sm:text-[13px] font-semibold text-slate-700 flex items-start gap-2.5">
                      <span className="text-brand-blue font-black text-sm flex-shrink-0 mt-0.5">âœ“</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlight Callout Pill */}
                <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/70 text-brand-blue text-xs font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>{industrialDivisions[activeTab].highlight}</span>
                </div>

                {/* Action Link */}
                <div className="pt-1">
                  <Link
                    to={rfqLink}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-blue hover:text-blue-700 transition-colors"
                  >
                    <span>Request Technical Specification Package</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* â”€â”€ COMPLETE INDUSTRIAL SERVICES GRID â”€â”€ */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12">

          {/* Section Header */}
          <div className="reveal-up text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-blue text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-brand-blue">checklist</span>
              Full Service Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-slate uppercase tracking-tight">
              Our Industrial <span className="grad-text">Services</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Comprehensive industrial maintenance and plant services delivered across the Kingdom's petrochemical, refinery, and infrastructure sectors.
            </p>
          </div>

          {/* 12 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {[
              { icon: 'science', title: 'Industrial Chemical Cleaning', desc: 'Complete chemical circulation services for pipelines, vessels, heat exchangers, and boilers using engineered chemistry solutions.' },
              { icon: 'water_drop', title: 'Hazardous Liquid Pumping & Handling', desc: 'Safe transfer and disposal of hazardous liquids including acids, caustics, and hydrocarbon slops with ATEX-rated equipment.' },
              { icon: 'cleaning_services', title: 'Decontamination (Hydro Carbon)', desc: 'Vapor-phase and liquid-phase decontamination eliminating Hâ‚‚S, benzene, and pyrophoric iron sulfide deposits from vessels and columns.' },
              { icon: 'thermostat', title: 'Steaming Services', desc: 'Industrial steaming for pipeline purging, vessel decontamination, heat tracing, and pre-commissioning thermal conditioning.' },
              { icon: 'speed', title: 'High Pressure Water Jetting', desc: 'Ultra high-pressure hydrojetting up to 40,000 PSI for heat exchanger tubes, vessel internals, and pipeline descaling.' },
              { icon: 'delete_sweep', title: 'Tank Cleaning & Neutralization', desc: 'Automated non-entry and manual tank cleaning with sludge removal, hydrocarbon recovery, and pH neutralization.' },
              { icon: 'sanitizer', title: 'Disinfection Services & Pumps', desc: 'Industrial disinfection for water systems, storage tanks, and process equipment using approved chemical treatment protocols.' },
              { icon: 'verified', title: 'Pre-Commissioning', desc: 'Complete pre-commissioning support including flushing, pressure testing, system cleaning, and handover documentation.' },
              { icon: 'oil_barrel', title: 'Lube / Seal / Hydraulic Oil Flushing', desc: 'High-velocity oil flushing of lubrication, seal oil, and hydraulic circuits to OEM cleanliness standards (NAS / ISO).' },
              { icon: 'forklift', title: 'Rental of Industrial Equipment', desc: 'Rental fleet of specialized industrial equipment including pumps, compressors, heat exchangers, and filtration units.' },
              { icon: 'filter_alt', title: 'Particle Filtration', desc: 'Online and offline particle filtration and system cleanliness verification to NAS 1638 and ISO 4406 standards.' },
              { icon: 'waves', title: 'Dewatering Pumps', desc: 'Submersible and centrifugal dewatering pump deployment for excavation, pipeline, tank, and construction site dewatering.' },
            ].map((svc, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                className="reveal-card p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-brand-blue/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-brand-blue mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">{svc.icon}</span>
                </div>
                <h3 className="card-title-font text-sm sm:text-[15px] font-black text-brand-slate uppercase tracking-tight leading-tight mb-2">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-[11.5px] sm:text-xs leading-relaxed flex-1">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal-up text-center pt-4" style={{ transitionDelay: '200ms' }}>
            <Link
              to={rfqLink}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/25 hover:-translate-y-0.5 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">assignment</span>
              Request Service Quotation
            </Link>
          </div>
        </div>
      </section>


      {/* â”€â”€ 5. SPECIALIZED INDUSTRIAL TOOLING & EQUIPMENT â”€â”€ */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          <div className="reveal-up text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-green text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-brand-green">construction</span>
              Proprietary Tooling Assets
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-slate uppercase tracking-tight">
              Specialized Industrial <span className="grad-text">Equipment Fleet</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              High-performance industrial equipment assets maintained strictly to OEM specifications and deployed across the Kingdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedTooling.map((eq, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
                className="reveal-card p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-brand-blue/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-brand-blue shadow-xs">
                      {eq.category}
                    </span>
                    <span className="material-symbols-outlined text-slate-400 text-2xl">{eq.icon}</span>
                  </div>

                  <h3 className="card-title-font text-lg font-black text-brand-slate uppercase tracking-tight mb-1">
                    {eq.title}
                  </h3>
                  <div className="text-xs font-black text-brand-green mb-3">
                    {eq.specs}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {eq.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] font-mono font-bold text-slate-500">
                  Ready for Rapid Mobilization
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* â”€â”€ 6. FINAL 24/7 RAPID INDUSTRIAL MOBILIZATION & RFP BANNER â”€â”€ */}
      <section className="py-20 lg:py-28 cta-section relative overflow-hidden text-white">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="reveal-up max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                24/7 Rapid Industrial Mobilization Across Saudi Arabia
              </div>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight uppercase leading-tight">
                Partner with the Kingdom's Accredited Industrial Contractor
              </h2>
              <p className="text-blue-100 text-base leading-relaxed">
                Submit industrial hydrojetting tenders, chemical cleaning and decontamination schedules, or urgent maintenance support. Our dispatch engineers respond within 2 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto flex-shrink-0">
              <Link
                to={rfqLink}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm bg-white text-brand-blue hover:bg-blue-50 hover:-translate-y-0.5 transition-all shadow-xl"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                Submit Service RFP
              </Link>
              <a
                href="tel:8003223372"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                Operations Hotline: 800-FACE-KSA
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
