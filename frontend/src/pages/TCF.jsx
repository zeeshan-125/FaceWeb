import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import Breadcrumb from '../components/Breadcrumb';

const tcfDivisions = [
  {
    id: 'office-container',
    title: 'Office Container',
    badge: 'Modular Workspace',
    subtitle: 'Fully Furnished Single & Multi-Story Site Management Complexes',
    image: '/images/civil-1.jpg',
    tag: 'Executive & Site Offices',
    desc: 'Heavy-gauge steel containerized offices engineered for rapid field deployment in harsh desert and petrochemical environments. Available as single 20ft/40ft units or open-plan modular complexes complete with executive cabins, conference rooms, CAT6 data networking, and high-capacity tropicalized climate control.',
    specs: [
      { label: 'Standard Dimensions', value: '20ft (6×2.4m) & 40ft (12×2.4m)' },
      { label: 'Thermal Insulation', value: '75mm–100mm Rockwool / EPS' },
      { label: 'HVAC Rating', value: 'T3 Tropical Split (24,000–36,000 BTU)' },
      { label: 'Safety Rating', value: 'Civil Defense 998 & SASO Certified' },
    ],
    features: [
      'Turnkey executive furniture, acoustic wall paneling, and commercial-grade anti-static vinyl flooring',
      'Double-glazed UPVC/aluminum windows with integrated security steel grilles and solar blinds',
      'Pre-wired electrical distribution board, LED illumination, and dedicated high-speed IT server conduits',
      'Plug-and-play hookup for local power generation or sovereign electrical grid interconnection',
    ],
    highlight: 'Deployed in under 48 hours for immediate project management mobilization across KSA',
    badgeColor: 'badge-blue',
  },
  {
    id: 'portable-toilets',
    title: 'Portable Toilets',
    badge: 'Field Sanitation',
    subtitle: 'Heavy-Duty Chemical & Self-Contained Mobile Sanitary Units',
    image: '/images/camp-1.jpg',
    tag: 'Hygienic Mobile Sanitation',
    desc: 'Ultra-durable, high-density polyethylene (HDPE) single-cubicle portable restrooms engineered for remote construction sectors, desert camps, and petrochemical plant turnarounds. Features hands-free pneumatic foot-pump flushing, integrated handwash basins, and daily vacuum pump-out servicing.',
    specs: [
      { label: 'Construction Material', value: 'UV-Stabilized High-Density HDPE' },
      { label: 'Integrated Waste Tank', value: '250L – 300L Sealed Capacity' },
      { label: 'Operation Mode', value: 'Hands-Free Hygienic Foot Pump' },
      { label: 'Servicing Frequency', value: 'Scheduled Vacuum Pump-Out (24/7)' },
    ],
    features: [
      'Self-contained freshwater reservoir and hands-free foot-operated sink with soap dispenser',
      'High-draft solar/natural ventilation chimney preventing odor accumulation even in extreme heat',
      'Integrated heavy-duty crane lifting eyes and forklift pockets for quick sector relocation',
      'Full servicing support with dedicated vacuum tankers and eco-friendly deodorizing biocides',
    ],
    highlight: '100% self-sufficient mobile sanitation requiring zero ground excavation or sewer tie-ins',
    badgeColor: 'badge-green',
  },
  {
    id: 'kitchen-dormitories',
    title: 'Kitchen / Dormitories',
    badge: 'Workforce Welfare',
    subtitle: 'HACCP-Grade Commercial Mess Halls & Fire-Rated Accommodation Blocks',
    image: '/images/operations_jampilen.jpg',
    tag: 'Living Camps & Catering',
    desc: 'Complete workforce camp living solutions built in strict accordance with Saudi Aramco GI 298.010, Royal Commission, and Ministry of Human Resources camp guidelines. Providing sound-insulated multi-occupancy dormitories, centralized dining halls, and industrial stainless-steel catering facilities.',
    specs: [
      { label: 'Catering Standard', value: 'HACCP Compliant 304 Stainless' },
      { label: 'Dorm Configuration', value: '2, 4, or 6-Person En-Suite Blocks' },
      { label: 'Fire Safety Standard', value: 'SBC 801 / Civil Defense Approved' },
      { label: 'Climate Comfort', value: 'Individual Split A/C Per Room' },
    ],
    features: [
      'Industrial commercial cooking ranges, walk-in cold storage freezers, and dishwashing lines',
      'Comfortable living quarters fitted with orthopaedic beds, individual lockers, and privacy partitions',
      'Dual-supply domestic hot water networks with insulated plumbing and backup pressure pumps',
      'Comprehensive fire suppression systems, addressable smoke detection, and clear emergency egress',
    ],
    highlight: 'Guarantees workforce health, rest, and nutritional welfare for remote megaproject teams',
    badgeColor: 'badge-blue',
  },
  {
    id: 'toilets',
    title: 'Toilets (Ablution Units)',
    badge: 'Multi-Stall Sanitation',
    subtitle: 'Fixed Multi-Stall Restrooms, Shower Modules & Ablution Complexes',
    image: '/images/civil-1.jpg',
    tag: 'Sanitary Complexes',
    desc: 'Containerized high-volume sanitary and ablution complexes built for large construction camps and industrial contractor yards. Engineered with commercial ceramic water closets, urinal troughs, enclosed hot-water shower stalls, and dedicated Islamic prayer ablution (Wudu) areas with anti-slip flooring.',
    specs: [
      { label: 'Unit Layouts', value: '4 to 8 Cubicles Per Container' },
      { label: 'Sanitary Fittings', value: 'Heavy-Duty Commercial Ceramic' },
      { label: 'Plumbing System', value: 'PPR Hot & Cold with Pressure Boosters' },
      { label: 'Floor Finish', value: 'Seamless Anti-Slip Polyurethane Resin' },
    ],
    features: [
      'Dedicated external wastewater manifold for quick tie-in to central sewer or septic holding tanks',
      'Water-saving push-button fixtures and heavy-duty brass valves engineered for continuous use',
      'High-velocity moisture extraction fans and anti-microbial wall paneling preventing dampness',
      'Industrial electric water heating cylinders supplying uninterrupted hot water to shower bays',
    ],
    highlight: 'Engineered for 500+ daily workforce cycles with zero downtime and low water consumption',
    badgeColor: 'badge-green',
  },
  {
    id: 'isolation-rooms',
    title: 'Isolation Rooms',
    badge: 'Health & Safety Focused',
    subtitle: 'Aramco & MoH Certified Medical, Quarantine & First-Aid Cabins',
    image: '/images/tcf_isolation_rooms.png', // USER's 3rd picture placed here!
    tag: 'Aramco & MoH Certified',
    desc: 'Specialized modular medical isolation and quarantine facilities fabricated in full compliance with Saudi Aramco and Ministry of Health protocols. Featuring independent climate control, antimicrobial washable interior paneling, en-suite private sanitary cubicles, and high-visibility yellow exterior safety steps with safety handrails.',
    specs: [
      { label: 'Health Compliance', value: 'Aramco SAES & MoH Standards' },
      { label: 'Sanitary System', value: 'En-Suite Private Touchless Bath' },
      { label: 'Safety Access', value: 'Yellow Safety Stairs & Double Railing' },
      { label: 'Air Management', value: 'Independent HEPA / Fresh-Air Split' },
    ],
    features: [
      'Safe Isolation: Dedicated HVAC and air management preventing cross-contamination between units',
      'Comfortable Stay: Fully furnished with medical-grade bed, desk workspace, and digital connectivity',
      'Health & Safety Focused: Pre-certified for site quarantine, clinical assessment, and emergency first-aid',
      'Seamless non-porous antimicrobial interior surfaces permitting rapid chemical washdown and sterilization',
    ],
    highlight: 'Official FACE Isolation Rooms — ready for immediate deployment to remote project sites',
    badgeColor: 'badge-blue',
  },
  {
    id: 'modular-units',
    title: 'Modular Units',
    badge: 'Scalable Prefab',
    subtitle: 'Interconnected Flat-Pack & Multi-Story Structural Site Buildings',
    image: '/images/camp-1.jpg',
    tag: 'Custom Site Architecture',
    desc: 'Highly flexible modular building systems capable of horizontal linking and vertical stacking up to 3 levels. Designed to accommodate site security gatehouses, field clinics, material testing laboratories, prayer mosques, and vast engineering headquarters with rapid assembly and demountability.',
    specs: [
      { label: 'Stackability', value: 'Up to 3 Stories High' },
      { label: 'Chassis Frame', value: 'Hot-Dip Galvanized Structural Steel' },
      { label: 'Wind Resistance', value: '140 km/h Wind Load (SBC 301)' },
      { label: 'Demountability', value: '100% Reusable Across Future Sites' },
    ],
    features: [
      'Flat-pack configuration enabling up to 4 units per flatbed truck, cutting mobilization freight by 65%',
      'Customizable internal partition walls for executive suites, conference halls, and laboratory bays',
      'Overhead concealed wiring trunking and plumbing drops for swift inter-module utility connection',
      'Seismic and structural certification in strict compliance with the Saudi Building Code (SBC)',
    ],
    highlight: 'Scales seamlessly from a single 15m² guardhouse to a 5,000m² complete project headquarters',
    badgeColor: 'badge-green',
  },
];

const portableSetupServices = [
  {
    title: 'Portable Offices & Control Cabins',
    desc: 'Rapid deployment of climate-controlled project management offices, permit-to-work cabins, QA/QC testing labs, and supervisory stations.',
    badge: 'Site Admin',
  },
  {
    title: 'Portable Toilets & Sanitation Blocks',
    desc: 'Complete turnkey hygiene solutions including single mobile chemical toilets, multi-cubicle ablution units, and VIP trailer restrooms.',
    badge: 'Field Hygiene',
  },
  {
    title: 'Site Support & Utility Services',
    desc: 'Turnkey power generation, bulk water delivery, scheduled vacuum sewage evacuation, and 24/7 on-site civil maintenance teams.',
    badge: 'Full Turnkey',
  },
];

const turnkeySteps = [
  {
    step: '01',
    title: 'Site Survey & Engineering Layout',
    desc: 'Topographical assessment, wind/sun orientation analysis, utility tie-in mapping, and 3D architectural camp layouts aligned with client safety codes.',
  },
  {
    step: '02',
    title: 'Off-Site Fabrication & Custom Fitout',
    desc: 'Precision manufacturing in our Jubail industrial yard with structural steel frames, fire-rated sandwich panels, and pre-tested electrical/HVAC systems.',
  },
  {
    step: '03',
    title: 'Heavy Logistics & Crane Placement',
    desc: 'Mobilization using FACE heavy flatbed fleet and mobile all-terrain cranes, ensuring pinpoint placement and laser-leveled foundation placement.',
  },
  {
    step: '04',
    title: 'Utility Hookup & 24/7 Handover',
    desc: 'Complete plumbing, power, HVAC commissioning, Aramco/Civil Defense inspection approval, and continuous round-the-clock maintenance coverage.',
  },
];

const tcfAccreditations = [
  { name: 'Saudi Aramco', desc: 'Pre-Qualified TCF & Modular Contractor', code: 'Vendor #10084291' },
  { name: 'Royal Commission', desc: 'RCJY Approved Site Camp Standards', code: 'RC-JUB-TCF-01' },
  { name: 'Civil Defense / 998', desc: 'Approved Fire Alarm & Life Safety Code', code: 'SBC 801 Compliant' },
  { name: 'SASO Compliance', desc: 'Saudi Standards, Metrology and Quality', code: 'SASO ISO Standards' },
  { name: 'ISO 9001:2015', desc: 'Certified Quality Management System', code: 'Bureau Veritas' },
  { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety Management', code: 'UKAS / SAC' },
];

export default function TCF() {
  const [activeTab, setActiveTab] = useState(0);
  useReveal([activeTab]);

  // Build rfqLink dynamically from exact active TCF division title
  const currentTcfTitle = tcfDivisions[activeTab]?.title || 'Office Container';
  const rfqLink = `/contact?service=${encodeURIComponent(currentTcfTitle)}&page=tcf&unit=${encodeURIComponent(currentTcfTitle)}#rfq-form`;

  return (
    <div className="bg-white text-brand-slate selection:bg-brand-blue selection:text-white">
      {/* ── 1. CINEMATIC VIDEO HERO BANNER (Harmonized with Services.jsx & WMS.jsx) ── */}
      <section className="relative min-h-[520px] lg:min-h-[580px] pt-28 pb-16 overflow-hidden bg-slate-50 border-b border-slate-200">
        {/* Full-Section Ambient Video — Facilities in Action */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/civil-1.jpg"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/custom/tcf_facilities.mp4" type="video/mp4" />
        </video>

        {/* Sophisticated Gradient Scrim: Solid text clarity on left, dynamic video vibrancy on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.94) 42%, rgba(255, 255, 255, 0.58) 68%, rgba(255, 255, 255, 0.18) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 via-transparent to-slate-50/30 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          {/* Standardized Fixed Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'TCF (Temporary Construction Facilities)' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Turnaround Scope Overview */}
            <div className="lg:col-span-7 space-y-6">

              {/* Title & Tagline with Brand Gradient */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[1.15]">
                  Temporary Construction <span className="grad-text">Facilities (TCF)</span>
                </h1>
              </div>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to={rfqLink}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/25 hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment</span>
                  <span>Request TCF Proposal</span>
                </Link>
                <a
                  href="#tcf-services"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-800 border border-slate-200 bg-white/90 hover:bg-white hover:border-slate-300 shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-brand-blue">domain</span>
                  <span>Explore 6 Core Divisions</span>
                </a>
              </div>
            </div>

            {/* Right Column: 4 Telemetry Metrics Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Modular Fleet</div>
                <div className="text-xl sm:text-2xl font-black text-brand-blue mt-1">
                  <AnimatedCounter value="3,500+" duration={1400} delay={150} triggerOnView={true} />
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Units Deployed</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Mobilization</div>
                <div className="text-xl sm:text-2xl font-black text-brand-green mt-1">
                  <AnimatedCounter value="48-Hr" duration={1400} delay={300} triggerOnView={true} />
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Rapid Turnkey Setup</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Compliance</div>
                <div className="text-xl sm:text-2xl font-black text-brand-blue mt-1">
                  <AnimatedCounter value="100%" duration={1400} delay={450} triggerOnView={true} />
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Aramco &amp; 998 Code</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Facility Operations</div>
                <div className="text-xl sm:text-2xl font-black text-brand-green mt-1">
                  <AnimatedCounter value="24/7" duration={1400} delay={600} triggerOnView={true} />
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">On-Site Support</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. REGULATORY & ACCREDITATION GOVERNANCE STRIP ── */}
      <section className="py-6 bg-white border-b border-slate-200/90 text-slate-800">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tcfAccreditations.map((badge, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/30 transition-colors text-center"
              >
                <div className="text-xs font-black text-brand-slate uppercase tracking-wider">
                  {badge.name}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                  {badge.desc}
                </div>
                <div className="text-[10px] font-mono text-brand-blue font-bold mt-1">
                  {badge.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PORTABLE SETUP SERVICES OVERVIEW BAR (From Brochure Right Column) ── */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-blue">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                Integrated Support Infrastructure
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                Portable Setup <span className="grad-text">Services</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Complete turnkey facilities supported by FACE’s heavy equipment fleet (cranes, boom lifts, forklifts) and specialized site utility teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portableSetupServices.map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full badge-blue">
                    {service.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-brand-blue transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="card-title-font text-base font-black text-brand-slate uppercase mb-2 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. INTERACTIVE 6-PILLAR DIVISION SHOWCASE (From Brochure 1st Pic) ── */}
      <section id="tcf-services" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-blue text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              TCF Operational Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Specialized TCF <span className="grad-text">Divisions</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Select a division below to inspect engineering specifications, compliance frameworks, and deployment features.
            </p>
          </div>

          {/* Interactive Stream Tabs (Matching WMS.jsx) */}
          <div className="reveal-up flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ transitionDelay: '100ms' }}>
            {tcfDivisions.map((div, idx) => (
              <button
                key={div.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-[1.02] border-2 border-brand-blue'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === idx ? 'bg-brand-green animate-pulse' : 'bg-slate-400'}`} />
                <span>{div.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Showcase Card (Matching WMS.jsx reveal-scale) */}
          <div className="reveal-scale bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Media Visual Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full group rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-900">
                  <img
                    src={tcfDivisions[activeTab].image}
                    alt={tcfDivisions[activeTab].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/20 text-emerald-400 shadow-md">
                      {tcfDivisions[activeTab].tag}
                    </span>
                    {tcfDivisions[activeTab].id === 'isolation-rooms' && (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-blue text-white shadow-md">
                        Aramco &amp; MoH Certified
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="text-xs font-bold text-white/95 drop-shadow">
                      {tcfDivisions[activeTab].id === 'isolation-rooms'
                        ? 'FACE Certified Isolation Rooms • Safe Isolation & Comfortable Stay'
                        : 'FACE Temporary Construction Facilities • KSA Industrial Operations'}
                    </div>
                  </div>
                </div>

                {/* Sub-Image Telemetry Dock */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Standards</div>
                    <div className="text-xs font-black text-brand-slate mt-0.5">SBC &amp; Civil Def.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Mobilization</div>
                    <div className="text-xs font-black text-emerald-600 mt-0.5">Under 48 Hours</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Site Support</div>
                    <div className="text-xs font-black text-brand-blue mt-0.5">24/7 Maintenance</div>
                  </div>
                </div>
              </div>

              {/* Information & Specs Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-brand-green mb-1">
                    TCF Division Scope
                  </div>
                  <h3 className="card-title-font text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                    {tcfDivisions[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                    {tcfDivisions[activeTab].subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {tcfDivisions[activeTab].desc}
                </p>

                {/* If Isolation Rooms: show the 3 key pillars from the brochure photo */}
                {tcfDivisions[activeTab].id === 'isolation-rooms' && (
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-center">
                      <div className="text-xs font-black text-emerald-800">Safe Isolation</div>
                      <div className="text-[10px] text-emerald-600 font-medium">Zero Contamination</div>
                    </div>
                    <div className="text-center border-x border-emerald-200">
                      <div className="text-xs font-black text-emerald-800">Comfortable Stay</div>
                      <div className="text-[10px] text-emerald-600 font-medium">Climate Controlled</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-black text-emerald-800">Health &amp; Safety</div>
                      <div className="text-[10px] text-emerald-600 font-medium">Aramco Compliant</div>
                    </div>
                  </div>
                )}

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-200">
                  {tcfDivisions[activeTab].specs.map((spec, sIdx) => (
                    <div key={sIdx} className="space-y-0.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        {spec.label}
                      </div>
                      <div className="text-xs sm:text-[13px] font-black text-brand-slate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features Bullet List */}
                <div className="space-y-2">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Key Engineering Features &amp; Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {tcfDivisions[activeTab].features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <svg className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Division Highlight Banner */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs font-bold text-slate-700">
                    <span className="font-black text-brand-blue uppercase mr-1">Advantage:</span>
                    {tcfDivisions[activeTab].highlight}
                  </div>
                  <Link
                    to={rfqLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-md shadow-brand-blue/25 whitespace-nowrap transition-all"
                  >
                    <span>Get Quotation</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>



      {/* ── 6. 4-STAGE TURNKEY MOBILIZATION WORKFLOW ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 reveal-up">
            <span className="text-xs font-black uppercase tracking-widest text-brand-green">
              Turnkey Execution Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              From Site Survey to <span className="grad-text">24/7 Operations</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Rigorous 4-stage engineering lifecycle guaranteeing on-schedule deployment with zero site downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {turnkeySteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/40 hover:shadow-md transition-all relative flex flex-col justify-between reveal-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-brand-blue/30">{step.step}</span>
                    <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-blue font-bold text-xs">
                      ✓
                    </span>
                  </div>
                  <h3 className="card-title-font text-base font-black text-slate-900 uppercase mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Phase 0{idx + 1} • Turnkey Assurance
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. FINAL RAPID MOBILIZATION & RFP CTA BANNER ── */}
      <section className="py-16 cta-section text-white relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-extrabold uppercase tracking-widest text-emerald-300">
                Direct Contractor Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                Mobilize Your Industrial Site Facilities in 48 Hours
              </h2>
              <p className="text-white/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Whether deploying a single project management office container or a multi-hectare industrial living camp, our Jubail operations team delivers rapid turnaround, compliant sanitary servicing, and round-the-clock maintenance.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to={rfqLink}
                className="px-6 py-3.5 rounded-xl bg-white text-brand-blue text-xs font-black uppercase tracking-wider text-center shadow-lg hover:bg-slate-100 transition-all"
              >
                Submit TCF RFP / BOQ
              </Link>
              <a
                href="tel:8003223572"
                className="px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider text-center hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Call Dispatch: 800-FACE-KSA</span>
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
