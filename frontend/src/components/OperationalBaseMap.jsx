import { useState } from 'react';
import { Link } from 'react-router-dom';

// Comprehensive Saudi Arabia Strategic Operational Bases (All displayed on a unified Kingdom map)
const allBases = [
  // Eastern Industrial & Petrochemical Corridor
  {
    id: 'khobar',
    name: 'Al Khobar (Corporate HQ)',
    shortName: 'Al Khobar HQ',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Command Center & Engineering HQ',
    coords: { x: 583, y: 244, pctX: '72.9%', pctY: '37.5%' },
    labelPos: 'right',
    gps: '26.2172° N, 50.1971° E',
    assets: 'Central Operations Command',
    readiness: '24/7 Rapid Mobilization',
    scope: 'Executive EPC Governance, Commercial Engineering, Multi-Site Dispatch & Sovereign Contracting',
    keyEquipment: ['Executive Command Facility', 'Central Logistics Dispatch', 'Safety & QA/QC Command Center'],
    badgeColor: 'blue',
  },
  {
    id: 'jubail',
    name: 'Jubail Industrial City',
    shortName: 'Jubail Base',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Primary Hub & Heavy Marshalling Yard',
    coords: { x: 562, y: 218, pctX: '70.3%', pctY: '33.5%' },
    labelPos: 'top-left',
    gps: '27.0046° N, 49.6591° E',
    assets: '1,200+ Heavy Units & Yards',
    readiness: '< 45 Min Plant Dispatch',
    scope: 'Petrochemical Plants, Turnarounds, 500T Mobile Cranes & High-Pressure Hydrojetting',
    keyEquipment: ['50T–500T Mobile Cranes', '40,000 PSI Jetting Fleet', 'Chemical Cleaning Bundles'],
    badgeColor: 'blue',
  },
  {
    id: 'dhahran',
    name: 'Dhahran Hub',
    shortName: 'Dhahran',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Energy Corridor Operations',
    coords: { x: 569, y: 254, pctX: '71.1%', pctY: '39.1%' },
    labelPos: 'bottom-left',
    gps: '26.2361° N, 50.0393° E',
    assets: 'Specialized NDT & Hydrojetting',
    readiness: '< 60 Min Deployment',
    scope: 'Aramco Energy Corridor, Pipeline Infrastructure, Tank Farm Decontamination',
    keyEquipment: ['NDT Inspection Rigs', 'Extreme-Pressure Pumps', 'Mobile Nitrogen Units'],
    badgeColor: 'blue',
  },
  {
    id: 'jafurah',
    name: 'Jafurah Basin',
    shortName: 'Jafurah',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Unconventional Gas Fleet',
    coords: { x: 564, y: 278, pctX: '70.5%', pctY: '42.8%' },
    labelPos: 'bottom-right',
    gps: '25.4000° N, 49.7000° E',
    assets: 'Severe-Service Machinery',
    readiness: '< 90 Min Field Staging',
    scope: 'Unconventional Gas Exploration, Heavy Earthmoving, Trenching & Rig Staging Logistics',
    keyEquipment: ['Heavy Bulldozers & Graders', 'Multi-Axle Lowbeds', 'Rig Camp Accommodations'],
    badgeColor: 'blue',
  },
  {
    id: 'marjan',
    name: 'Marjan Megaproject Yard',
    shortName: 'Marjan',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Offshore/Onshore Coastal Staging',
    coords: { x: 550, y: 163, pctX: '68.8%', pctY: '25.1%' },
    labelPos: 'top-left',
    gps: '28.4500° N, 49.3000° E',
    assets: 'Heavy Lift & Field Logistics',
    readiness: '< 60 Min Coastal Dispatch',
    scope: 'Field Expansion Maintenance, Industrial Scaffolding & Offshore Supply Support',
    keyEquipment: ['Crawler Cranes (up to 400T)', 'Offshore Module Transporters', 'Safety Support Boats'],
    badgeColor: 'blue',
  },

  // Western Gigaproject & Coastal Corridor (NEOM / Red Sea)
  {
    id: 'sharma',
    name: 'Sharma (NEOM Sector)',
    shortName: 'NEOM / Sharma',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'NEOM Gigaproject Operational Base',
    coords: { x: 61, y: 178, pctX: '7.6%', pctY: '27.4%' },
    labelPos: 'top-right',
    gps: '28.0553° N, 35.2530° E',
    assets: 'Modular Camps & Earthmoving Fleet',
    readiness: 'Dedicated On-Site 24/7',
    scope: 'Megaproject Fast-Track Civil Works, Turnkey Modular Workforce Accommodation & Fleet Deployment',
    keyEquipment: ['Modular Prefab Cabins (10,000+ Bed Capacity)', 'Heavy Earthmoving Rigs', 'Mega-Watt GenSets'],
    badgeColor: 'green',
  },
  {
    id: 'tabuk',
    name: 'Tabuk Logistics Hub',
    shortName: 'Tabuk',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'Regional Logistics Depot',
    coords: { x: 107, y: 166, pctX: '13.4%', pctY: '25.5%' },
    labelPos: 'top',
    gps: '28.3835° N, 36.5662° E',
    assets: 'Heavy Transport & Crane Fleet',
    readiness: '< 2 Hr Regional Mobilization',
    scope: 'Northwestern Corridor Staging, Bulk Aggregate Haulage, Heavy Foundation Equipment',
    keyEquipment: ['All-Terrain Mobile Cranes', 'Tipper & Trailer Fleet', 'Chiller & HVAC Units'],
    badgeColor: 'green',
  },
  {
    id: 'duba',
    name: 'Duba Port Industrial Base',
    shortName: 'Duba Port',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'Coastal & Marine Terminal Base',
    coords: { x: 76, y: 205, pctX: '9.5%', pctY: '31.5%' },
    labelPos: 'bottom',
    gps: '27.3516° N, 35.6974° E',
    assets: 'Marine Transfer & High-Pressure Jetting',
    readiness: '< 45 Min Port Access',
    scope: 'Port Logistics, Marine Industrial Services, Coastal Pipeline & Desalination Works',
    keyEquipment: ['Marine Hydrojetting Units', 'Fuel & Lube Tankers', 'Port Handling Forklifts'],
    badgeColor: 'green',
  },
  {
    id: 'shigry',
    name: 'Shigry Remote Facility',
    shortName: 'Shigry',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'Frontier Staging & Camp Utilities',
    coords: { x: 82, y: 184, pctX: '10.3%', pctY: '28.3%' },
    labelPos: 'bottom-right',
    gps: '27.9100° N, 35.8500° E',
    assets: 'Mobile Utilities & Frontier Fleet',
    readiness: '< 60 Min Mountain/Desert Staging',
    scope: 'Extreme Terrain Operations, Remote Camp Infrastructure & Backup Power Distribution',
    keyEquipment: ['Rugged All-Wheel-Drive Fleet', 'Containerized Water Systems', 'Substation Transformers'],
    badgeColor: 'green',
  },

  // Central Province Strategic Corridor
  {
    id: 'haradh',
    name: 'Haradh Operations Base',
    shortName: 'Haradh',
    region: 'central',
    regionLabel: 'Central Province',
    type: 'Gas & Severe Desert Facility',
    coords: { x: 541, y: 325, pctX: '67.6%', pctY: '50.0%' },
    labelPos: 'bottom',
    gps: '24.1438° N, 49.0620° E',
    assets: 'Extreme Desert Climate Fleet',
    readiness: '< 60 Min Field Response',
    scope: 'Gas Plant Overhauls, Desert Energy Networks, Hazardous Environmental Handling',
    keyEquipment: ['Desert-Package Cranes', 'Insulated Chiller Fleets', 'Severe-Duty Vacuum Trucks'],
    badgeColor: 'amber',
  },
  {
    id: 'riyadh',
    name: 'Riyadh Central Command',
    shortName: 'Riyadh',
    region: 'central',
    regionLabel: 'Central Province',
    type: 'Sovereign Programs & Vision 2030 Desk',
    coords: { x: 458, y: 304, pctX: '57.3%', pctY: '46.8%' },
    labelPos: 'top',
    gps: '24.7136° N, 46.6753° E',
    assets: 'Central Liaison & Project Oversight',
    readiness: 'Strategic Command 24/7',
    scope: 'Central Government Projects, Giga-Project EPC Alignments & Sovereign Program Logistics',
    keyEquipment: ['Project PMO Headquarters', 'Government Liaison Officers', 'Strategic Fleet Planning'],
    badgeColor: 'amber',
  },
];

export default function OperationalBaseMap() {
  const [selectedBaseId, setSelectedBaseId] = useState('jubail');
  const [regionFilter, setRegionFilter] = useState('all'); // 'all' | 'eastern' | 'western' | 'central'
  const [hoveredBaseId, setHoveredBaseId] = useState(null);
  const [rfqForm, setRfqForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Industrial Services & High-Pressure Hydrojetting',
    scope: '',
  });
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  const activeBase = allBases.find((b) => b.id === selectedBaseId) || allBases[1];

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    setRfqSubmitted(true);
  };

  const filteredBases = regionFilter === 'all'
    ? allBases
    : allBases.filter((b) => b.region === regionFilter);

  return (
    <section className="py-24 text-slate-100 relative overflow-hidden">
      {/* Authentic Real-Time Satellite Map Background (NASA Earth Observatory / MODIS Arabian Peninsula) */}
      <div
        className="absolute inset-0 bg-cover pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url('/images/realtime_map_satellite.jpg')",
          backgroundPosition: 'center 35%',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* High-Contrast Neutral Dark Scrim (Eliminates white washed-out band) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Real-time Telemetry Coordinate Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-80" />

      {/* Seamless Dark Transitions (Zero white lines) */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b from-transparent to-slate-900 pointer-events-none z-[1]" />

      {/* Subtle Brand Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-green/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white drop-shadow-md">
              Our Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-brand-green">Bases</span>
            </h2>
            <p className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed drop-shadow font-medium">
              Real-time map showing all 10 active strategic stations across Saudi Arabia — interconnecting the Eastern petrochemical heartland, Central corridors, and Western Red Sea gigaprojects.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-white/15 shadow-xl backdrop-blur-md self-start lg:self-end">
            {[
              { id: 'all', label: 'All Bases (10)' },
              { id: 'eastern', label: 'Eastern Corridor (5)' },
              { id: 'western', label: 'NEOM & Western (4)' },
              { id: 'central', label: 'Central Basin (2)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRegionFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  regionFilter === tab.id
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/40 border border-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Command Center Layout */}
        <div id="rfq-map" className="reveal-scale grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-[72px]">

          {/* Interactive Saudi Arabia Map (Col 7) */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-4 sm:p-7 relative shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            
            {/* Map Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3.5 mb-2 z-10">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green" />
                </span>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700">
                  KINGDOM OPERATIONS RADAR • ALL BASES ONLINE
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2.5 font-medium">
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-blue" /> Eastern</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-green" /> NEOM / West</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500" /> Central</span>
              </div>
            </div>

            {/* The Unified Kingdom Map SVG */}
            <div className="relative w-full aspect-[800/650] max-h-[580px] flex items-center justify-center my-2">
              <svg
                viewBox="0 0 800 650"
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.06))' }}
              >
                <defs>
                  {/* Subtle Light Filter */}
                  <filter id="hubGlowLight" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
                  </filter>

                  {/* Saudi Arabia Crisp Light Gradient Fill */}
                  <linearGradient id="saudiMapGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8f1fc" />
                    <stop offset="45%" stopColor="#f0f5fc" />
                    <stop offset="100%" stopColor="#e2edf9" />
                  </linearGradient>

                  {/* Light Grid Pattern */}
                  <pattern id="tacticalGridLight" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="1" fill="#cbd5e1" fillOpacity="0.7" />
                  </pattern>
                </defs>

                {/* Tactical coordinate grid canvas */}
                <rect x="0" y="0" width="800" height="650" rx="16" fill="#f8fafc" />
                <rect x="0" y="0" width="800" height="650" rx="16" fill="url(#tacticalGridLight)" />

                {/* Latitude / Longitude Tactical Markers */}
                <text x="30" y="180" fill="#94a3b8" fontSize="10" fontFamily="monospace">28° N</text>
                <text x="30" y="325" fill="#94a3b8" fontSize="10" fontFamily="monospace">24° N</text>
                <text x="30" y="470" fill="#94a3b8" fontSize="10" fontFamily="monospace">20° N</text>
                <text x="100" y="635" fill="#94a3b8" fontSize="10" fontFamily="monospace">36° E</text>
                <text x="458" y="635" fill="#94a3b8" fontSize="10" fontFamily="monospace">46° E</text>
                <text x="580" y="635" fill="#94a3b8" fontSize="10" fontFamily="monospace">50° E</text>

                {/* Saudi Arabia Geographic Mainland Outline */}
                <path
                  d="M 322.8,618.1 L 318.2,602.1 L 307.8,590.8 L 305.1,575.8 L 287.1,562.3 L 268.6,530.8 L 258.8,500.2 L 234.7,474.4 L 219.2,468.2 L 196.2,432.4 L 192.1,406.3 L 193.6,384.0 L 173.7,342.3 L 157.4,327.7 L 138.6,319.9 L 127.1,298.4 L 129.0,289.9 L 119.4,270.4 L 109.2,262.0 L 95.6,234.1 L 74.4,203.8 L 56.7,178.0 L 39.4,178.1 L 44.8,157.5 L 46.3,144.4 L 50.6,129.4 L 89.4,135.4 L 104.4,123.8 L 112.7,110.3 L 139.3,105.1 L 145.0,92.5 L 156.5,86.1 L 121.8,48.5 L 191.5,29.7 L 198.1,24.0 L 240.0,34.2 L 291.8,60.5 L 389.9,136.1 L 454.6,139.1 L 485.6,142.7 L 494.2,160.6 L 518.8,159.6 L 532.4,192.0 L 549.5,200.6 L 555.5,213.8 L 579.2,229.6 L 581.3,245.1 L 577.9,257.6 L 582.3,270.2 L 592.3,280.7 L 596.9,293.1 L 602.1,302.3 L 612.6,309.7 L 622.2,307.1 L 628.9,321.4 L 630.2,330.1 L 643.5,368.2 L 748.1,387.1 L 755.1,379.2 L 771.0,405.8 L 747.8,480.9 L 643.5,518.5 L 543.2,532.9 L 510.7,549.8 L 485.8,589.3 L 469.6,595.5 L 460.9,583.0 L 447.5,584.9 L 413.9,581.1 L 407.5,577.4 L 367.4,578.2 L 358.0,581.6 L 343.7,571.9 L 334.5,590.3 L 338.0,606.2 L 322.8,618.1 Z"
                  fill="url(#saudiMapGradLight)"
                  stroke="#2B5BA8"
                  strokeWidth="1.8"
                  strokeOpacity="0.75"
                  className="transition-all duration-700"
                />

                {/* Secondary inner contour */}
                <path
                  d="M 322.8,618.1 L 318.2,602.1 L 307.8,590.8 L 305.1,575.8 L 287.1,562.3 L 268.6,530.8 L 258.8,500.2 L 234.7,474.4 L 219.2,468.2 L 196.2,432.4 L 192.1,406.3 L 193.6,384.0 L 173.7,342.3 L 157.4,327.7 L 138.6,319.9 L 127.1,298.4 L 129.0,289.9 L 119.4,270.4 L 109.2,262.0 L 95.6,234.1 L 74.4,203.8 L 56.7,178.0 L 39.4,178.1 L 44.8,157.5 L 46.3,144.4 L 50.6,129.4 L 89.4,135.4 L 104.4,123.8 L 112.7,110.3 L 139.3,105.1 L 145.0,92.5 L 156.5,86.1 L 121.8,48.5 L 191.5,29.7 L 198.1,24.0 L 240.0,34.2 L 291.8,60.5 L 389.9,136.1 L 454.6,139.1 L 485.6,142.7 L 494.2,160.6 L 518.8,159.6 L 532.4,192.0 L 549.5,200.6 L 555.5,213.8 L 579.2,229.6 L 581.3,245.1 L 577.9,257.6 L 582.3,270.2 L 592.3,280.7 L 596.9,293.1 L 602.1,302.3 L 612.6,309.7 L 622.2,307.1 L 628.9,321.4 L 630.2,330.1 L 643.5,368.2 L 748.1,387.1 L 755.1,379.2 L 771.0,405.8 L 747.8,480.9 L 643.5,518.5 L 543.2,532.9 L 510.7,549.8 L 485.8,589.3 L 469.6,595.5 L 460.9,583.0 L 447.5,584.9 L 413.9,581.1 L 407.5,577.4 L 367.4,578.2 L 358.0,581.6 L 343.7,571.9 L 334.5,590.3 L 338.0,606.2 L 322.8,618.1 Z"
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth="0.8"
                  strokeDasharray="6 4"
                  strokeOpacity="0.5"
                />

                {/* Arabian Gulf & Red Sea Watermark Labels */}
                <text x="70" y="360" fill="#94a3b8" opacity="0.35" fontSize="13" fontWeight="bold" letterSpacing="4" transform="rotate(-62 70 360)">RED SEA CORRIDOR</text>
                <text x="610" y="190" fill="#94a3b8" opacity="0.35" fontSize="13" fontWeight="bold" letterSpacing="4" transform="rotate(40 610 190)">ARABIAN GULF</text>
                <text x="420" y="470" fill="#cbd5e1" opacity="0.55" fontSize="15" fontWeight="900" letterSpacing="6">KINGDOM OF SAUDI ARABIA</text>

                {/* All 10 Interactive Base Pins (Clean, without dotted transit lines) */}
                {allBases.map((hub) => {
                  const isSelected = hub.id === selectedBaseId;
                  const isHovered = hub.id === hoveredBaseId;
                  const isFiltered = regionFilter !== 'all' && hub.region !== regionFilter;

                  const pinColor = hub.badgeColor === 'green'
                    ? '#16a34a'
                    : hub.badgeColor === 'blue'
                    ? '#2B5BA8'
                    : '#d97706';

                  return (
                    <g
                      key={hub.id}
                      className={`cursor-pointer transition-all duration-300 ${isFiltered ? 'opacity-25' : 'opacity-100'}`}
                      onClick={() => {
                        setSelectedBaseId(hub.id);
                        setRfqSubmitted(false);
                      }}
                      onMouseEnter={() => setHoveredBaseId(hub.id)}
                      onMouseLeave={() => setHoveredBaseId(null)}
                    >
                      {/* Target crosshair rings when selected */}
                      {isSelected && (
                        <>
                          <circle
                            cx={hub.coords.x}
                            cy={hub.coords.y}
                            r="22"
                            fill="none"
                            stroke={pinColor}
                            strokeWidth="1.4"
                            strokeDasharray="3 3"
                            opacity="0.85"
                          />
                          <circle
                            cx={hub.coords.x}
                            cy={hub.coords.y}
                            r="32"
                            fill="none"
                            stroke={pinColor}
                            strokeWidth="0.8"
                            opacity="0.4"
                          />
                        </>
                      )}

                      {/* Radar pulse aura */}
                      <circle
                        cx={hub.coords.x}
                        cy={hub.coords.y}
                        r={isSelected ? 16 : isHovered ? 13 : 9}
                        fill={pinColor}
                        fillOpacity={isSelected ? 0.22 : 0.1}
                      />

                      {/* Outer Hub Ring with crisp white core backing */}
                      <circle
                        cx={hub.coords.x}
                        cy={hub.coords.y}
                        r={isSelected ? 9 : 7}
                        fill="#ffffff"
                        stroke={pinColor}
                        strokeWidth={isSelected ? 3 : 2}
                        filter="url(#hubGlowLight)"
                      />

                      {/* Core Glowing Dot */}
                      <circle
                        cx={hub.coords.x}
                        cy={hub.coords.y}
                        r={isSelected ? 4.5 : 3}
                        fill={pinColor}
                      />

                      {/* Station Label & Smart Offset Tooltips */}
                      <g
                        transform={
                          hub.labelPos === 'right'
                            ? `translate(${hub.coords.x + 14}, ${hub.coords.y + 4})`
                            : hub.labelPos === 'left'
                            ? `translate(${hub.coords.x - 14}, ${hub.coords.y + 4})`
                            : hub.labelPos === 'top'
                            ? `translate(${hub.coords.x}, ${hub.coords.y - 14})`
                            : hub.labelPos === 'top-right'
                            ? `translate(${hub.coords.x + 10}, ${hub.coords.y - 10})`
                            : hub.labelPos === 'top-left'
                            ? `translate(${hub.coords.x - 12}, ${hub.coords.y - 12})`
                            : hub.labelPos === 'bottom-left'
                            ? `translate(${hub.coords.x - 10}, ${hub.coords.y + 16})`
                            : hub.labelPos === 'bottom-right'
                            ? `translate(${hub.coords.x + 10}, ${hub.coords.y + 16})`
                            : `translate(${hub.coords.x}, ${hub.coords.y + 18})`
                        }
                      >
                        <text
                          textAnchor={
                            hub.labelPos === 'left' || hub.labelPos === 'top-left' || hub.labelPos === 'bottom-left'
                              ? 'end'
                              : hub.labelPos === 'top' || hub.labelPos === 'bottom'
                              ? 'middle'
                              : 'start'
                          }
                          fill={isSelected ? '#0f172a' : isHovered ? '#1d4ed8' : '#334155'}
                          fontSize={isSelected ? 11.5 : 10}
                          fontWeight={isSelected ? '800' : '600'}
                          filter="drop-shadow(0 1px 3px rgba(255,255,255,0.95))"
                        >
                          {hub.shortName}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Station RFQ Form & Telemetry Dossier (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 relative overflow-hidden text-slate-800">
              {/* Subtle Radial Accent Glow */}
              <div
                className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
                  activeBase.badgeColor === 'green'
                    ? 'bg-brand-green/10'
                    : activeBase.badgeColor === 'blue'
                    ? 'bg-brand-blue/10'
                    : 'bg-amber-500/10'
                }`}
              />

              <div className="relative z-10 space-y-5">
                {/* Header Badge & GPS Info */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">assignment</span>
                    <span>Commercial RFQ Form</span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-500">
                    GPS: <span className="text-slate-800 font-bold">{activeBase.gps}</span>
                  </div>
                </div>

                {/* RFQ FORM (Autofills on map pin selection) */}
                <div>
                  {rfqSubmitted ? (
                      <div className="text-center py-8 space-y-3">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto shadow-xs">
                          <span className="material-symbols-outlined text-[32px]">verified</span>
                        </div>
                        <h4 className="text-xl font-black uppercase text-slate-900 tracking-tight">
                          RFQ Transmitted Successfully
                        </h4>
                        <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                          Your request has been routed directly to our <strong className="text-brand-blue">{activeBase.name}</strong> operations dispatch team.
                        </p>
                        <div className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold">
                          REF: FACE-RFQ-{activeBase.id.toUpperCase()}-2026
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setRfqSubmitted(false);
                              setRfqForm({
                                name: '',
                                company: '',
                                email: '',
                                phone: '',
                                service: 'Industrial Services & High-Pressure Hydrojetting',
                                scope: '',
                              });
                            }}
                            className="mt-3 px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-blue transition-colors"
                          >
                            Submit Another Request
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleRfqSubmit} className="space-y-4">
                        {/* Auto-filled Location Banner */}
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200/80 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-xs">
                              <span className="material-symbols-outlined text-[18px]">location_on</span>
                            </div>
                            <div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                                Auto-filled Station Location
                              </div>
                              <div className="text-xs sm:text-sm font-black text-slate-900">
                                {activeBase.name}
                              </div>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            {activeBase.readiness}
                          </span>
                        </div>

                        {/* Name & Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 block">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={rfqForm.name}
                              onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })}
                              placeholder="Eng. Mohammed Al-Salem"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-slate-800 text-xs font-medium transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 block">
                              Company / Entity *
                            </label>
                            <input
                              type="text"
                              required
                              value={rfqForm.company}
                              onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                              placeholder="Aramco / SABIC / Contractor"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-slate-800 text-xs font-medium transition-all"
                            />
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 block">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={rfqForm.email}
                              onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                              placeholder="mohammed@entity.com"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-slate-800 text-xs font-medium transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 block">
                              Phone / Mobile *
                            </label>
                            <input
                              type="tel"
                              required
                              value={rfqForm.phone}
                              onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                              placeholder="+966 5X XXX XXXX"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-slate-800 text-xs font-medium transition-all"
                            />
                          </div>
                        </div>

                        {/* Service Required Dropdown */}
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 block">
                            Required Service Division *
                          </label>
                          <select
                            value={rfqForm.service}
                            onChange={(e) => setRfqForm({ ...rfqForm, service: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-slate-800 text-xs font-medium transition-all"
                          >
                            <option value="Industrial Services & High-Pressure Hydrojetting">
                              Industrial Services & High-Pressure Hydrojetting (40,000 PSI)
                            </option>
                            <option value="Waste Management Solutions (WMS)">
                              Waste Management Solutions (WMS - NCEC HazMat & Recycling)
                            </option>
                            <option value="Heavy & Light Equipment Rental">
                              Heavy & Light Equipment Rental (Cranes, Super Suckers, Rig Fleet)
                            </option>
                            <option value="Temporary Construction Facilities (TCF)">
                              Temporary Construction Facilities (TCF & Modular Units)
                            </option>
                            <option value="Plant Turnaround & Shutdown EPC">
                              Plant Turnaround & Shutdown EPC
                            </option>
                            <option value="Multi-Service Turnkey Deployment">
                              Multi-Service Turnkey Deployment
                            </option>
                          </select>
                        </div>

                        {/* Project / Scope Requirements */}
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 block">
                            Scope Details & Machinery Needed
                          </label>
                          <textarea
                            rows={3}
                            value={rfqForm.scope}
                            onChange={(e) => setRfqForm({ ...rfqForm, scope: e.target.value })}
                            placeholder="Specify tonnage, pressure, fleet units, plant unit, or required dispatch date..."
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-slate-800 text-xs font-medium transition-all resize-none"
                          />
                        </div>

                        {/* Submit Action */}
                        <div className="pt-1">
                          <button
                            type="submit"
                            className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 uppercase tracking-wider group"
                          >
                            <span>Transmit RFQ to {activeBase.shortName}</span>
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                              send
                            </span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
