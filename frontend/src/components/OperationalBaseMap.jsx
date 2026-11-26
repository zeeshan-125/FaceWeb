import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Comprehensive Saudi Arabia Strategic Operational Bases (All displayed on a unified Kingdom map)
const allBases = [
  // Eastern Industrial & Petrochemical Corridor
  {
    id: 'jubail',
    name: 'Jubail Industrial City',
    shortName: 'Jubail',
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
    id: 'safaniyah',
    name: 'Safaniyah Operations Base',
    shortName: 'Safaniyah',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Offshore/Onshore Coastal Staging',
    coords: { x: 530, y: 181, pctX: '66.3%', pctY: '27.8%' },
    labelPos: 'right',
    gps: '27.9800° N, 48.7300° E',
    assets: 'Heavy Lift & Field Logistics',
    readiness: '< 60 Min Coastal Dispatch',
    scope: 'Field Expansion Maintenance, Industrial Scaffolding & Offshore Supply Support',
    keyEquipment: ['Crawler Cranes', 'Offshore Module Transporters', 'High-Pressure Jetting'],
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
    labelPos: 'right',
    gps: '26.2361° N, 50.0393° E',
    assets: 'Specialized NDT & Hydrojetting',
    readiness: '< 60 Min Deployment',
    scope: 'Aramco Energy Corridor, Pipeline Infrastructure, Tank Farm Decontamination',
    keyEquipment: ['NDT Inspection Rigs', 'Extreme-Pressure Pumps', 'Mobile Nitrogen Units'],
    badgeColor: 'blue',
  },
  {
    id: 'hufuf',
    name: 'Hufuf Industrial Base',
    shortName: 'Hufuf',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Regional Energy & Logistics Hub',
    coords: { x: 554, y: 279, pctX: '69.3%', pctY: '42.9%' },
    labelPos: 'left',
    gps: '25.3800° N, 49.5900° E',
    assets: 'Heavy Transport & Plant Support',
    readiness: '< 60 Min Field Dispatch',
    scope: 'Al-Ahsa Energy Corridor, Plant Maintenance, Tank Cleaning & Waste Logistics',
    keyEquipment: ['Vacuum Tankers', 'Mobile Cranes', 'Chemical Cleaning Units'],
    badgeColor: 'blue',
  },
  {
    id: 'jafurah',
    name: 'Jafurah Basin',
    shortName: 'Jafurah',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Unconventional Gas Fleet',
    coords: { x: 564, y: 298, pctX: '70.5%', pctY: '45.8%' },
    labelPos: 'bottom-right',
    gps: '25.4000° N, 49.7000° E',
    assets: 'Severe-Service Machinery',
    readiness: '< 90 Min Field Staging',
    scope: 'Unconventional Gas Exploration, Heavy Earthmoving, Trenching & Rig Staging Logistics',
    keyEquipment: ['Heavy Bulldozers & Graders', 'Multi-Axle Lowbeds', 'Rig Camp Accommodations'],
    badgeColor: 'blue',
  },
  {
    id: 'sahybah',
    name: 'Sahybah Desert Base',
    shortName: 'Sahybah',
    region: 'eastern',
    regionLabel: 'Eastern Province',
    type: 'Extreme Desert Energy Facility',
    coords: { x: 685, y: 386, pctX: '85.6%', pctY: '59.4%' },
    labelPos: 'right',
    gps: '22.5200° N, 53.9500° E',
    assets: 'Extreme Desert Climate Fleet',
    readiness: 'Dedicated On-Site 24/7',
    scope: 'Empty Quarter Oilfield Support, Severe-Duty Vacuum Trucks & Modular Camps',
    keyEquipment: ['Desert-Package Cranes', 'Severe-Duty Vacuum Trucks', 'Modular Camp Units'],
    badgeColor: 'blue',
  },

  // Western & Northern Corridor
  {
    id: 'turaif',
    name: 'Turaif Northern Hub',
    shortName: 'Turaif',
    region: 'western',
    regionLabel: 'Northern / Western',
    type: 'Northern Frontier Operations',
    coords: { x: 180, y: 42, pctX: '22.5%', pctY: '6.5%' },
    labelPos: 'right',
    gps: '31.6700° N, 38.6600° E',
    assets: 'Mining & Industrial Fleet',
    readiness: '< 90 Min Regional Dispatch',
    scope: 'Phosphate & Mining Logistics, Heavy Earthmoving & Industrial Support',
    keyEquipment: ['Heavy Excavators', 'All-Terrain Cranes', 'Modular Site Offices'],
    badgeColor: 'green',
  },
  {
    id: 'rafa',
    name: 'Rafa Operations Base',
    shortName: 'Rafa',
    region: 'western',
    regionLabel: 'Northern / Western',
    type: 'Northern Corridor Depot',
    coords: { x: 145, y: 95, pctX: '18.1%', pctY: '14.6%' },
    labelPos: 'right',
    gps: '29.6300° N, 43.5000° E',
    assets: 'Logistics & Support Fleet',
    readiness: '< 2 Hr Mobilization',
    scope: 'Northern Corridor Staging, Bulk Haulage & Remote Camp Support',
    keyEquipment: ['Tipper & Trailer Fleet', 'Mobile Generators', 'Water Tankers'],
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
    id: 'al-wajh',
    name: 'Al Wajh Coastal Base',
    shortName: 'Al Wajh',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'Red Sea Coastal Operations',
    coords: { x: 103, y: 246, pctX: '12.9%', pctY: '37.8%' },
    labelPos: 'right',
    gps: '26.2500° N, 36.4500° E',
    assets: 'Coastal & Marine Support',
    readiness: '< 60 Min Coastal Dispatch',
    scope: 'Red Sea Gigaproject Support, Coastal Logistics & Modular Accommodations',
    keyEquipment: ['Marine Hydrojetting Units', 'Modular Cabins', 'Mobile Cranes'],
    badgeColor: 'green',
  },
  {
    id: 'yanbu',
    name: 'Yanbu Industrial Hub',
    shortName: 'Yanbu',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'Red Sea Petrochemical & Port Hub',
    coords: { x: 159, y: 327, pctX: '19.9%', pctY: '50.3%' },
    labelPos: 'right',
    gps: '24.0900° N, 38.0600° E',
    assets: 'Refinery & Port Fleet',
    readiness: '< 45 Min Plant Dispatch',
    scope: 'Refinery Turnarounds, High-Pressure Hydrojetting, Chemical Cleaning & Waste Management',
    keyEquipment: ['40,000 PSI Jetting Fleet', 'Vacuum Tankers', '50T–300T Mobile Cranes'],
    badgeColor: 'green',
  },
  {
    id: 'jeddah',
    name: 'Jeddah Operations Base',
    shortName: 'Jeddah',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'Western Commercial & Port Hub',
    coords: { x: 198, y: 425, pctX: '24.8%', pctY: '65.4%' },
    labelPos: 'right',
    gps: '21.4900° N, 39.1900° E',
    assets: 'Full-Service Industrial Fleet',
    readiness: '< 45 Min Metro Dispatch',
    scope: 'Port Logistics, Industrial Waste Management, Heavy Equipment Rental & TCF',
    keyEquipment: ['Mobile Cranes', 'Super Suckers', 'Modular Office Units'],
    badgeColor: 'green',
  },
  {
    id: 'taif',
    name: 'Taif Regional Base',
    shortName: 'Taif',
    region: 'western',
    regionLabel: 'Western Province',
    type: 'Highland Infrastructure Hub',
    coords: { x: 241, y: 433, pctX: '30.1%', pctY: '66.6%' },
    labelPos: 'right',
    gps: '21.2700° N, 40.4100° E',
    assets: 'Earthmoving & Utility Fleet',
    readiness: '< 90 Min Regional Dispatch',
    scope: 'Highland Civil Works, Heavy Earthmoving & Temporary Construction Facilities',
    keyEquipment: ['Excavators & Loaders', 'Generators', 'Modular Camps'],
    badgeColor: 'green',
  },
  {
    id: 'abha',
    name: 'Abha Southern Base',
    shortName: 'Abha',
    region: 'western',
    regionLabel: 'Southern / Western',
    type: 'Southern Highland Operations',
    coords: { x: 313, y: 548, pctX: '39.1%', pctY: '84.3%' },
    labelPos: 'right',
    gps: '18.2200° N, 42.5000° E',
    assets: 'Mountain & Civil Fleet',
    readiness: '< 90 Min Regional Dispatch',
    scope: 'Southern Infrastructure Projects, Heavy Equipment Rental & Site Support',
    keyEquipment: ['All-Terrain Cranes', 'Excavators', 'Modular Units'],
    badgeColor: 'green',
  },
  {
    id: 'jizan',
    name: 'Jizan Industrial & Port Base',
    shortName: 'Jizan',
    region: 'western',
    regionLabel: 'Southern / Western',
    type: 'Economic City & Refinery Hub',
    coords: { x: 315, y: 598, pctX: '39.4%', pctY: '92.0%' },
    labelPos: 'right',
    gps: '16.8900° N, 42.5500° E',
    assets: 'Refinery & Port Support Fleet',
    readiness: '< 60 Min Plant Dispatch',
    scope: 'Jizan Refinery Support, Hydrojetting, Waste Management & Heavy Lifting',
    keyEquipment: ['High-Pressure Jetting', 'Vacuum Trucks', 'Mobile Cranes'],
    badgeColor: 'green',
  },

  // Central & Northern-Central Corridor
  {
    id: 'arar',
    name: 'Arar Operations Base',
    shortName: 'Arar',
    region: 'central',
    regionLabel: 'Northern / Central',
    type: 'Northern Borders Hub',
    coords: { x: 262, y: 69, pctX: '32.8%', pctY: '10.6%' },
    labelPos: 'right',
    gps: '30.9700° N, 41.0300° E',
    assets: 'Regional Logistics Fleet',
    readiness: '< 2 Hr Mobilization',
    scope: 'Northern Borders Infrastructure, Heavy Transport & Site Facilities',
    keyEquipment: ['Heavy Transport', 'Generators', 'Modular Cabins'],
    badgeColor: 'amber',
  },
  {
    id: 'sakaka',
    name: 'Sakaka Operations Base',
    shortName: 'Sakaka',
    region: 'central',
    regionLabel: 'Northern / Central',
    type: 'Al-Jouf Regional Hub',
    coords: { x: 233, y: 106, pctX: '29.1%', pctY: '16.3%' },
    labelPos: 'right',
    gps: '29.9700° N, 40.2000° E',
    assets: 'Renewable & Civil Fleet',
    readiness: '< 90 Min Regional Dispatch',
    scope: 'Renewable Energy Projects, Civil Contracting & Heavy Equipment Rental',
    keyEquipment: ['Mobile Cranes', 'Earthmoving Fleet', 'Site Offices'],
    badgeColor: 'amber',
  },
  {
    id: 'hail',
    name: 'Hail Operations Base',
    shortName: 'Hail',
    region: 'central',
    regionLabel: 'Central / North',
    type: 'North-Central Logistics Hub',
    coords: { x: 286, y: 199, pctX: '35.8%', pctY: '30.6%' },
    labelPos: 'right',
    gps: '27.5100° N, 41.7200° E',
    assets: 'Regional Construction Fleet',
    readiness: '< 90 Min Regional Dispatch',
    scope: 'North-Central Infrastructure, Bulk Haulage & Modular Site Support',
    keyEquipment: ['Loaders & Excavators', 'Tipper Trucks', 'Modular Units'],
    badgeColor: 'amber',
  },
  {
    id: 'hafr-al-batin',
    name: 'Hafr al Batin Base',
    shortName: 'Hafr al Batin',
    region: 'central',
    regionLabel: 'North-Eastern Corridor',
    type: 'Strategic Transit & Logistics Hub',
    coords: { x: 434, y: 164, pctX: '54.3%', pctY: '25.2%' },
    labelPos: 'right',
    gps: '28.4300° N, 45.9700° E',
    assets: 'Heavy Transit & Field Fleet',
    readiness: '< 90 Min Dispatch',
    scope: 'Northeastern Corridor Logistics, Heavy Equipment Staging & Camp Utilities',
    keyEquipment: ['Lowbed Trailers', 'Mobile Cranes', 'Fuel & Water Tankers'],
    badgeColor: 'amber',
  },
  {
    id: 'ar-rass',
    name: 'Ar Rass Operations Base',
    shortName: 'Ar rass',
    region: 'central',
    regionLabel: 'Central Province',
    type: 'Qassim Regional Hub',
    coords: { x: 348, y: 260, pctX: '43.5%', pctY: '40.0%' },
    labelPos: 'right',
    gps: '25.8700° N, 43.5000° E',
    assets: 'Central Industrial Fleet',
    readiness: '< 90 Min Regional Dispatch',
    scope: 'Qassim Industrial & Agricultural Infrastructure, Heavy Machinery & TCF',
    keyEquipment: ['Excavators', 'Mobile Cranes', 'Modular Facilities'],
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
  {
    id: 'salwa',
    name: 'Salwa Southern Base',
    shortName: 'Salwa',
    region: 'central',
    regionLabel: 'Southern Corridor',
    type: 'Southern Border & Logistics Hub',
    coords: { x: 465, y: 560, pctX: '58.1%', pctY: '86.2%' },
    labelPos: 'right',
    gps: '24.7400° N, 50.7900° E',
    assets: 'Border & Desert Logistics Fleet',
    readiness: '< 2 Hr Mobilization',
    scope: 'Southern Corridor Staging, Heavy Transport & Remote Site Support',
    keyEquipment: ['Heavy Trailers', 'Desert-Package Fleet', 'Modular Cabins'],
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

  useEffect(() => {
    const handleSelectService = (e) => {
      if (e.detail) {
        setRfqForm((prev) => ({ ...prev, service: e.detail }));
      }
    };
    window.addEventListener('rfq:selectService', handleSelectService);
    return () => window.removeEventListener('rfq:selectService', handleSelectService);
  }, []);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqSubmitting, setRfqSubmitting] = useState(false);

  const activeBase = allBases.find((b) => b.id === selectedBaseId) || allBases[1];

  const handleRfqSubmit = async (e) => {
    e.preventDefault();
    if (rfqSubmitting) return;
    setRfqSubmitting(true);

    try {
      const nameParts = (rfqForm.name || '').trim().split(' ');
      const firstName = nameParts[0] || 'Valued';
      const lastName = nameParts.slice(1).join(' ') || 'Client';

      const params = new URLSearchParams();
      params.append('firstName', firstName);
      params.append('lastName', lastName);
      params.append('email', rfqForm.email);
      params.append('phone', rfqForm.phone || '');
      params.append('company', rfqForm.company || '');
      params.append('message', [
        rfqForm.service ? `Service: ${rfqForm.service}` : '',
        rfqForm.scope ? `Scope Details: ${rfqForm.scope}` : '',
        activeBase?.name ? `Target Operational Base: ${activeBase.name}` : ''
      ].filter(Boolean).join('\n'));
      params.append('source', 'FaceWeb Map RFQ');
      params.append('sourceChannel', 'Website Map');

      await fetch('https://crm-k8g4.onrender.com/api/v1/public/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
    } catch (err) {
      console.error('Failed to submit map RFQ to CRM:', err);
    } finally {
      setRfqSubmitting(false);
    }

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
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              Document Upload <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-600 text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={rfqSubmitting}
                            className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 uppercase tracking-wider group disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                            {rfqSubmitting ? (
                              <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <span>Submit</span>
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                  send
                                </span>
                              </>
                            )}
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
