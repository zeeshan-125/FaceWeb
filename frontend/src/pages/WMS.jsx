import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import Breadcrumb from '../components/Breadcrumb';

const wasteStreams = [
  {
    id: 'hazardous-waste',
    title: 'Hazardous Waste Management',
    subtitle: 'ADR & NCEC Certified HazMat Collection, Transport & Safe Disposal',
    image: '/images/wms/wms_tanker.jpg',
    tag: 'NCEC Class-1 HazMat',
    desc: 'Turnkey management of hazardous chemical, petrochemical, and industrial waste streams. Operating specialized vacuum tankers and certified containment systems for safe transport, chemical neutralization, and compliant disposal in full accordance with NCEC regulations.',
    specs: [
      { label: 'Regulatory Authority', value: 'NCEC & MWAN Licensed' },
      { label: 'Transport Fleet', value: '316L Vacuum Tankers & Skips' },
      { label: 'Handling Scope', value: 'Acids, Solvents, Toxic Effluents' },
      { label: 'Tracking & Telematics', value: '24/7 Digital GPS Manifests' },
    ],
    features: [
      'ADR UN-certified pressure vacuum tankers and specialized HazMat transport containers',
      'Safe collection, transfer, and neutralization of acids, caustics, and chemical effluents',
      'Electronic chain-of-custody manifests synchronized with national NCEC and MWAN portals',
      'Certified HazMat technicians equipped with specialized PPE and emergency response protocols',
    ],
    badgeColor: 'badge-blue',
  },
  {
    id: 'non-hazardous-waste',
    title: 'Non Hazardous Waste Management',
    subtitle: 'Comprehensive Solid Waste Collection, Segregation & Material Recovery',
    image: '/images/wms/wms_recycling.jpg',
    tag: 'Sustainable Recycling',
    desc: 'Full-spectrum collection, transport, and recycling solutions for non-hazardous industrial and commercial waste. We deploy heavy-duty skip bins, roll-on/off containers, and compactors to maximize diversion from landfills into circular economy streams.',
    specs: [
      { label: 'Waste Streams', value: 'Packaging, Plastics, Scrap' },
      { label: 'Collection Units', value: 'Skip Bins & Roll-On/Off' },
      { label: 'Diversion Strategy', value: 'Segregation & Recycling' },
      { label: 'Compliance Audit', value: 'MWAN Certified Disposal' },
    ],
    features: [
      'Scheduled and on-demand collection using heavy-duty skip bins and roll-off trucks',
      'Source-segregated collection programs for cardboard, plastics, polymers, and scrap metal',
      'Deployment of stationary and mobile waste compactors for high-volume sites and camps',
      'Environmental tracking manifests and circular economy sustainability reports',
    ],
    badgeColor: 'badge-green',
  },
  {
    id: 'industrial-waste',
    title: 'Industrial Waste Management',
    subtitle: 'Petrochemical Sludge Dewatering, Tank Bottoms & Process Residues',
    image: '/images/wms/industrial-waste.jpg',
    tag: 'Heavy Industrial',
    desc: 'Engineered waste management for refineries, petrochemical plants, and heavy manufacturing facilities. Delivering mobile sludge centrifuging, hydrocarbon reclamation, effluent neutralization, and compliant disposal of spent catalysts and process residues.',
    specs: [
      { label: 'Target Sectors', value: 'Refineries & Petrochemical' },
      { label: 'Processing Tech', value: 'Mobile Decanter Centrifuges' },
      { label: 'Resource Recovery', value: 'Up to 90% Pure Crude' },
      { label: 'Effluent Control', value: 'pH Neutralization Skids' },
    ],
    features: [
      'Mobile high-G decanter centrifuging recovering reusable hydrocarbons from refinery sludge',
      'On-site chemical neutralization and pH stabilization for spent process acids and caustics',
      'Safe extraction and transport of tank farm bottoms, API separator sludges, and scale residues',
      'Industrial plant turnaround waste support with rapid on-site mobilization and certified skids',
    ],
    badgeColor: 'badge-blue',
  },
  {
    id: 'commercial-waste',
    title: 'Commercial Waste Management',
    subtitle: 'Tailored Waste Logistics for Commercial, Corporate & Retail Facilities',
    image: '/images/wms/commercial-waste.jpg',
    tag: 'Commercial & Facility',
    desc: 'Structured waste management services designed for commercial complexes, corporate headquarters, logistics centers, and retail parks. Ensuring clean, hygienic, and eco-friendly waste handling with reliable collection schedules and ESG compliance.',
    specs: [
      { label: 'Facility Coverage', value: 'Commercial & Corporate Hubs' },
      { label: 'Collection Frequency', value: 'Daily / Scheduled Routine' },
      { label: 'Equipment Provided', value: 'Color-Coded Bins & Compactors' },
      { label: 'Environmental Target', value: 'Zero-Landfill Initiative' },
    ],
    features: [
      'Customized bin placement and scheduled collection preventing overflow and odor buildup',
      'Recycling partnerships converting segregated office and packaging waste into raw materials',
      'Sanitized, modern collection fleet with quiet, clean operation in commercial zones',
      'Transparent corporate waste auditing and sustainability reporting for ESG compliance',
    ],
    badgeColor: 'badge-green',
  },
];

const lifecycleSteps = [
  {
    step: '01',
    title: 'Characterization & Lab Profiling',
    icon: 'biotech',
    desc: 'Certified chemists extract representative samples to perform full TCLP, flashpoint, viscosity, and chemical fingerprinting to classify waste per NCEC standards.',
  },
  {
    step: '02',
    title: 'NCEC & MWAN Digital Manifest',
    icon: 'assignment_turned_in',
    desc: 'Pre-approval and electronic consignment documentation issued through the MWAN portal, creating a legally binding, trackable chain of custody before movement.',
  },
  {
    step: '03',
    title: 'Sealed Containment & Loading',
    icon: 'local_shipping',
    desc: 'Deployment of ADR-certified 316-SS vacuum tankers or sealed roll-off skips. Dedicated spill containment berms and vapor scrubbers are staged on site.',
  },
  {
    step: '04',
    title: 'Geofenced Escorted Transit',
    icon: 'share_location',
    desc: 'Live GPS telematic tracking monitoring route adherence, speed, and emergency alerts along designated sovereign HazMat corridors throughout the Kingdom.',
  },
  {
    step: '05',
    title: 'Advanced Treatment & Dewatering',
    icon: 'autorenew',
    desc: 'Mobile decanter centrifuges recover up to 90% crude oil while neutralization skids stabilize hazardous chemistry, drastically minimizing final disposal volumes.',
  },
  {
    step: '06',
    title: 'TSDF Disposal & Audit Certificate',
    icon: 'verified',
    desc: 'Residual inert matter safely delivered to certified Treatment, Storage, and Disposal Facilities (TSDF). Final Destruction & Landfill Avoidance Certificate issued.',
  },
];

const wmsEquipment = [
  {
    title: '316L Stainless High-Vacuum Tankers',
    category: 'Hazardous Liquids',
    capacity: '24,000L – 32,000L',
    specs: 'ATEX Zone 1 • Liquid Ring Pump • ADR UN-Certified',
    desc: 'Engineered for corrosive petrochemical liquids, spent acids, and volatile sludges with vapor recovery scrubbers.',
    icon: 'oil_barrel',
  },
  {
    title: 'Mobile Decanter Centrifuge Skids',
    category: 'Sludge Recovery',
    capacity: '45 m³/h Throughput',
    specs: '3,200 RPM High-G • 3-Phase Separation • Automated PLC',
    desc: 'Containerized mobile units extracting clean crude oil from oil-pit sediments and API separator bottoms on site.',
    icon: 'sync',
  },
  {
    title: 'Super Sucker Air Mover Vacuums',
    category: 'Heavy Industrial',
    capacity: '6,000 m³/h Airflow',
    specs: 'Wet & Dry Catalyst Removal • 28" Hg Deep Vacuum',
    desc: 'Heavy-duty suction capable of pulling dense sludge, heavy sand, and chemical catalysts over distances exceeding 150 meters.',
    icon: 'air',
  },
  {
    title: 'Sealed Hazardous Roll-Off Skips',
    category: 'Solid HazMat',
    capacity: '10m³, 20m³ & 30m³',
    specs: 'Liquid-Tight Gaskets • Double-Lock Lids • Epoxy-Coated',
    desc: 'Certified bins designed for contaminated soils, used PPE, hazardous filter cakes, and spent catalyst packaging.',
    icon: 'delete_forever',
  },
  {
    title: 'Mobile pH Neutralization Skids',
    category: 'Effluent Treatment',
    capacity: 'Continuous 30 m³/h',
    specs: 'Dual Reagent Dosing • Inline pH Probes • Scrubber Attached',
    desc: 'Rapid on-site chemical stabilization converting strong acidic or caustic process streams into inert neutral effluent.',
    icon: 'science',
  },
  {
    title: '24/7 HAZMAT Rapid Response Trailers',
    category: 'Emergency Response',
    capacity: 'Turnkey Spill Kit Fleet',
    specs: 'Oil Booms • Skimmers • Neutralizing Agents • Level A/B PPE',
    desc: 'Pre-mobilized trailers ready to dispatch within 2 hours to contain industrial pipeline leaks or chemical spills.',
    icon: 'emergency',
  },
];

const regulatoryBadges = [
  { name: 'MWAN / موان', desc: 'National Center for Waste Management Licensed Carrier', code: 'Permit #MWAN-2024-KSA' },
  { name: 'NCEC / التزام', desc: 'Environmental Compliance & Hazardous Transporter', code: 'Lic. #NCEC-HAZ-089' },
  { name: 'Saudi Aramco', desc: 'Pre-Qualified Hazardous Waste Contractor', code: 'Vendor #10084291' },
  { name: 'Royal Commission', desc: 'Jubail & Yanbu RCER 2020 Environmental Approval', code: 'RC-JUB-ENV-CERT' },
  { name: 'ADR Compliance', desc: 'UN Certified Dangerous Goods Road Transportation', code: 'ADR Class 3, 6, 8, 9' },
  { name: 'ISO 14001:2015', desc: 'Certified Environmental Management System', code: 'UKAS / SAC Accredited' },
];

export default function WMS() {
  const [activeTab, setActiveTab] = useState(0);
  useReveal([activeTab]);

  // Map active tab index to exact waste stream title
  const _wmsMap = [
    'Hazardous Waste Management',
    'Non Hazardous Waste Management',
    'Industrial Waste Management',
    'Commercial Waste Management',
  ];
  const currentWmsTitle = _wmsMap[activeTab] || 'Hazardous Waste Management';
  const rfqLink = `/contact?service=${encodeURIComponent(currentWmsTitle)}&page=wms#rfq-form`;

  return (
    <div className="bg-white text-brand-slate selection:bg-brand-blue selection:text-white">
      {/* ── 1. CINEMATIC VIDEO HERO BANNER (Clean Light Theme) ── */}
      <section className="relative min-h-[520px] lg:min-h-[580px] pt-28 pb-16 overflow-hidden bg-slate-50 border-b border-slate-200">
        {/* Looping Live Video Background with Poster Fallback */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/wms/wms_tanker.jpg"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/video-4.mp4" type="video/mp4" />
        </video>

        {/* Sophisticated Light Gradient Scrim: Solid clarity on left, dynamic video visibility on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.94) 42%, rgba(255, 255, 255, 0.60) 68%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 via-transparent to-slate-50/30 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          {/* Standardized Fixed Breadcrumb */}
          <Breadcrumb items={[{ label: 'Waste Management System (WMS)' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Environmental Overview */}
            <div className="lg:col-span-7 space-y-6">

              {/* Title & Tagline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[1.15]">
                  Industrial Waste Management &amp; <span className="grad-text">Recycling</span>
                </h1>
              </div>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to={rfqLink}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 shadow-lg shadow-emerald-700/25 hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment</span>
                  <span>Request WMS Scope RFP</span>
                </Link>
                <a
                  href="tel:8003223372"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-800 border border-slate-200 bg-white/90 hover:bg-white hover:border-slate-300 shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">emergency</span>
                  <span>24/7 HAZMAT Rapid Hotline</span>
                </a>
              </div>
            </div>

            {/* Right Column: 4 Environmental Telemetry Cards (Clean Light Theme matching brochure KPIs) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all text-center flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-[26px] font-black text-brand-blue tracking-tight">
                  <AnimatedCounter value="728,000 m³" duration={1400} delay={150} triggerOnView={true} />
                </div>
                <div className="text-xs sm:text-[13px] text-slate-800 font-bold mt-1.5 leading-snug">
                  Hazardous Waste Disposed
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all text-center flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-[26px] font-black text-brand-blue tracking-tight">
                  <AnimatedCounter value="4,000,000+ m³" duration={1400} delay={300} triggerOnView={true} />
                </div>
                <div className="text-xs sm:text-[13px] text-slate-800 font-bold mt-1.5 leading-snug">
                  Non Hazardous Waste Disposed
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all text-center flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-[26px] font-black text-brand-blue tracking-tight">
                  <AnimatedCounter value="3,000,000+ m³" duration={1400} delay={450} triggerOnView={true} />
                </div>
                <div className="text-xs sm:text-[13px] text-slate-800 font-bold mt-1.5 leading-snug">
                  Aramco Waste Collected
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all text-center flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-[26px] font-black text-brand-blue tracking-tight">
                  <AnimatedCounter value="2,000,000+ m³" duration={1400} delay={600} triggerOnView={true} />
                </div>
                <div className="text-xs sm:text-[13px] text-slate-800 font-bold mt-1.5 leading-snug">
                  Non-Aramco Waste Collected
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. REGULATORY & ACCREDITATION GOVERNANCE STRIP (Light Theme) ── */}
      <section className="py-6 bg-white border-b border-slate-200/90 text-slate-800">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {regulatoryBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:border-emerald-400/60 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="text-xs font-black text-brand-slate uppercase tracking-wide">{badge.name}</div>
                  <div className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">{badge.desc}</div>
                </div>
                <div className="text-[10px] font-mono text-emerald-700 font-bold pt-2 border-t border-slate-200 mt-2">
                  {badge.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE 4-PILLAR WMS CORE DIVISIONS ── */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-green text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-brand-green">recycling</span>
              Integrated Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-slate uppercase tracking-tight">
              Specialized Waste <span className="grad-text">Divisions</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              FACE provides safe, compliant, and sustainable waste management solutions that protect people, the environment, and communities across Saudi Arabia.
            </p>
          </div>

          {/* Interactive Stream Tabs */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2">
            {wasteStreams.map((stream, idx) => (
              <button
                key={stream.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-[1.02] border-2 border-emerald-500'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === idx ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                <span>{stream.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Showcase Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Media Visual Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full group rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-900">
                  <img
                    src={wasteStreams[activeTab].image}
                    alt={wasteStreams[activeTab].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/20 text-emerald-400 shadow-md">
                      {wasteStreams[activeTab].tag}
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="text-xs font-bold text-white/90 drop-shadow">
                      FACE Industrial Services • KSA Petrochemical Operational Fleet
                    </div>
                  </div>
                </div>

                {/* Sub-Image Telemetry Dock (Eliminates dead space) */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Standard</div>
                    <div className="text-xs font-black text-brand-slate mt-0.5">ISO 14001:2015</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Fleet Integrity</div>
                    <div className="text-xs font-black text-emerald-600 mt-0.5">100% Pre-Trip</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Dispatch SLA</div>
                    <div className="text-xs font-black text-brand-blue mt-0.5">&lt; 2-Hour Rapid</div>
                  </div>
                </div>
              </div>

              {/* Information & Specs Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-brand-green mb-1">
                    Operational Scope
                  </div>
                  <h3 className="card-title-font text-2xl sm:text-3xl font-black text-brand-slate uppercase tracking-tight leading-tight">
                    {wasteStreams[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                    {wasteStreams[activeTab].subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {wasteStreams[activeTab].desc}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100">
                  {wasteStreams[activeTab].specs.map((spec, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-black text-brand-slate mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Feature Bullets */}
                <ul className="space-y-2">
                  {wasteStreams[activeTab].features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs sm:text-[13px] font-semibold text-slate-700 flex items-start gap-2.5">
                      <span className="text-emerald-500 font-black text-sm flex-shrink-0 mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Link */}
                <div className="pt-2">
                  <Link
                    to={rfqLink}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-blue hover:text-blue-700 transition-colors"
                  >
                    <span>Request Technical Specification Sheet</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 4. DIGITAL CHAIN-OF-CUSTODY LIFECYCLE (Light Theme) ── */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10 space-y-14">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-green text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-brand-green">verified</span>
              Full Traceability Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-brand-slate">
              Cradle-to-Grave <span className="grad-text">Chain of Custody</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every liter of hazardous liquid and every ton of industrial sludge is tracked via NCEC digital manifests, GPS telematic locks, and certified laboratory analysis.
            </p>
          </div>

          {/* 6-Step Pipeline Grid (Clean Light Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifecycleSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                  </div>
                  <span className="text-3xl font-black font-mono text-slate-200 group-hover:text-emerald-600 transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="card-title-font text-lg font-black uppercase tracking-tight text-brand-slate mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. SPECIALIZED WMS FLEET & HEAVY ASSETS ── */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-blue text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-brand-blue">local_shipping</span>
              Proprietary Equipment Fleet
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-slate uppercase tracking-tight">
              Specialized WMS <span className="grad-text">Fleet &amp; Units</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Industrial assets engineered for the harsh environments of Yanbu, Jubail, Ras Tanura, and remote energy corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wmsEquipment.map((eq, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-brand-blue/40 transition-all flex flex-col justify-between"
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
                    Capacity: {eq.capacity}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {eq.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] font-mono font-bold text-slate-500">
                  {eq.specs}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. CIRCULAR ECONOMY & SAUDI VISION 2030 ALIGNMENT ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-green text-xs font-black uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-brand-green">eco</span>
                Saudi Green Initiative &amp; Circularity
              </div>
              <h3 className="card-title-font text-3xl sm:text-4xl font-extrabold text-brand-slate uppercase tracking-tight">
                Pioneering <span className="text-brand-green">Zero-Landfill</span> Industrial Standards
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In alignment with Saudi Vision 2030 and the Kingdom’s net-zero transition, FACE transforms industrial waste from an operational liability into high-value secondary resources. By integrating high-G mechanical centrifuges with thermal desorption partnerships, we divert over 85% of turnaround waste away from sovereign landfills.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-brand-green">85%+</div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wide">Average Landfill Diversion</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-brand-blue">1.2M+</div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wide">Barrels Sludge Treated</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative aspect-video">
                <img
                  src="/images/wms/wms_recycling.jpg"
                  alt="Saudi Green Recycling and Circular Economy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
                    State-of-the-Art Materials Recovery
                  </div>
                  <div className="text-sm font-bold">
                    Green circular economy facility sorting polymers, metals, and industrial feedstocks.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. FINAL 24/7 RAPID HAZMAT MOBILIZATION & RFP BANNER ── */}
      <section className="py-20 lg:py-28 cta-section relative overflow-hidden text-white">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Emergency HAZMAT Dispatch Across Saudi Arabia
              </div>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight uppercase leading-tight">
                Secure NCEC-Compliant Industrial Waste Management Today
              </h2>
              <p className="text-blue-100 text-base leading-relaxed">
                Submit waste characterization sheets, plant turnaround disposal tenders, or emergency vacuum pumping requirements. Our environmental logistics team responds within 2 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto flex-shrink-0">
              <Link
                to={rfqLink}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm bg-white text-brand-blue hover:bg-blue-50 hover:-translate-y-0.5 transition-all shadow-xl"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                Submit Waste Manifest RFP
              </Link>
              <a
                href="tel:8003223372"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                Emergency HAZMAT: 800-FACE-KSA
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
