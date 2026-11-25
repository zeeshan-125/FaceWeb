import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import Breadcrumb from '../components/Breadcrumb';

const regionalOffices = [
  {
    id: 'jubail',
    name: 'Jubail Industrial City',
    shortName: 'Jubail Base',
    tag: 'Primary Yard & Heavy Marshalling Facility',
    address: 'Support Industrial Area, Street 118, Jubail Industrial City 31961, KSA',
    phone: '+966 13 361 8888',
    email: 'jubail@faceindus.com',
    hours: '24/7/365 Continuous Turnaround Operations',
    region: 'Eastern Province',
  },
  {
    id: 'khobar',
    name: 'Al Khobar (Corporate HQ)',
    shortName: 'Al Khobar HQ',
    tag: 'Executive Command & Engineering HQ',
    address: 'King Salman Bin Abdulaziz Road, Al Yarmouk District, Al Khobar 31952, KSA',
    phone: '+966 13 882 1234',
    email: 'info@faceindus.com',
    hours: 'Sun – Thu: 08:00 – 17:00 (Dispatch 24/7)',
    region: 'Eastern Province',
  },
  {
    id: 'dhahran',
    name: 'Dhahran Hub',
    shortName: 'Dhahran',
    tag: 'Energy Corridor Operations & NDT Center',
    address: 'Aramco Energy Corridor, Dhahran 31311, Eastern Province, KSA',
    phone: '+966 13 874 5500',
    email: 'dhahran@faceindus.com',
    hours: '24/7 Rapid Pipeline & Refinery Dispatch',
    region: 'Eastern Province',
  },
  {
    id: 'jafurah',
    name: 'Jafurah Basin',
    shortName: 'Jafurah',
    tag: 'Unconventional Gas Fleet & Heavy Staging',
    address: 'Southern Gas Corridor Support Camp, Jafurah Basin, KSA',
    phone: '+966 13 572 4000',
    email: 'jafurah@faceindus.com',
    hours: '24/7 Heavy Earthmoving & Field Staging',
    region: 'Eastern Province',
  },
  {
    id: 'marjan',
    name: 'Marjan Megaproject Yard',
    shortName: 'Marjan',
    tag: 'Offshore/Onshore Coastal Staging Hub',
    address: 'Tanajib Coastal Logistics Zone, Marjan Sector, Eastern Province, KSA',
    phone: '+966 13 378 9200',
    email: 'marjan@faceindus.com',
    hours: '24/7 Coastal Dispatch & Scaffolding Logistics',
    region: 'Eastern Province',
  },
  {
    id: 'sharma',
    name: 'Sharma (NEOM Sector)',
    shortName: 'NEOM / Sharma',
    tag: 'NEOM Gigaproject Operational Base & Modular Camps',
    address: 'Main Logistics Corridor, Sharma Sector, Tabuk Province, KSA',
    phone: '+966 14 421 9999',
    email: 'neom@faceindus.com',
    hours: '24/7 Dedicated On-Site Gigaproject Mobilization',
    region: 'Western Province',
  },
  {
    id: 'tabuk',
    name: 'Tabuk Logistics Hub',
    shortName: 'Tabuk',
    tag: 'Regional Logistics Depot & Heavy Cranes',
    address: 'Tabuk Industrial City Zone 2, Tabuk 71411, KSA',
    phone: '+966 14 428 1122',
    email: 'tabuk@faceindus.com',
    hours: '24/7 Regional Transport & Crane Mobilization',
    region: 'Western Province',
  },
  {
    id: 'duba',
    name: 'Duba Port Industrial Base',
    shortName: 'Duba Port',
    tag: 'Coastal & Marine Terminal Base',
    address: 'Port Industrial Road, Duba Commercial Port, Red Sea, KSA',
    phone: '+966 14 573 8811',
    email: 'duba@faceindus.com',
    hours: '24/7 Port Logistics & Marine Hydrojetting',
    region: 'Western Province',
  },
  {
    id: 'shigry',
    name: 'Shigry Remote Facility',
    shortName: 'Shigry',
    tag: 'Frontier Staging & Camp Utilities',
    address: 'Mountain Route 80, Shigry Logistics Outpost, KSA',
    phone: '+966 14 429 7733',
    email: 'shigry@faceindus.com',
    hours: '24/7 Extreme Terrain Operations & Power Utilities',
    region: 'Western Province',
  },
  {
    id: 'riyadh',
    name: 'Riyadh Central Command',
    shortName: 'Riyadh',
    tag: 'Sovereign Programs & Vision 2030 Desk',
    address: 'Olaya Towers, Sector 4, Riyadh 12213, KSA',
    phone: '+966 11 498 7777',
    email: 'riyadh@faceindus.com',
    hours: 'Sun – Thu: 08:00 – 17:00 (PMO 24/7)',
    region: 'Central Province',
  },
  {
    id: 'haradh',
    name: 'Haradh Operations Base',
    shortName: 'Haradh',
    tag: 'Gas & Severe Desert Fleet Facility',
    address: 'South Ghawar Field Base, Haradh Industrial Area, KSA',
    phone: '+966 13 562 3344',
    email: 'haradh@faceindus.com',
    hours: '24/7 Desert Energy Networks & Vacuum Fleet',
    region: 'Central Province',
  },
];

const serviceDivisions = [
  {
    id: 'industrial',
    label: 'Industrial Services',
    icon: 'precision_manufacturing',
    items: [
      'Ultra High-Pressure (UHP) Hydrojetting',
      'Steaming, Oil Flushing & Pre-Commissioning',
      'Chemical Cleaning & Decontamination',
      'Non-Entry Tank Cleaning & Sludge Pumping',
    ],
  },
  {
    id: 'wms',
    label: 'Waste Management (WMS)',
    icon: 'recycling',
    items: [
      'Hazardous Waste Management',
      'Non Hazardous Waste Management',
      'Industrial Waste Management',
      'Commercial Waste Management',
    ],
  },
  {
    id: 'tcf',
    label: 'Modular Facilities (TCF)',
    icon: 'apartment',
    items: [
      'Office Container',
      'Portable Toilets',
      'Kitchen / Dormitories',
      'Toilets (Ablution Units)',
      'Isolation Rooms',
      'Modular Building Systems',
    ],
  },
  {
    id: 'equipment',
    label: 'Heavy Equipment Rental',
    icon: 'forklift',
    items: [
      'Cranes & Heavy Lift Fleet',
      'Heavy Transport & Modular SPMT',
      'Earthmoving & Civil Rigs',
      'Power Generation & Chillers',
      'Forklifts & Laydown Logistics',
      'High-Pressure Pumps & Compressors',
    ],
  },
  {
    id: 'epc',
    label: 'Turnarounds & EPC',
    icon: 'engineering',
    items: [
      'Plant Turnarounds & Shutdowns',
      'Civil Infrastructure & Concrete',
      'Multi-Megawatt Temporary Power',
      'Specialized HazMat Waste Handling',
    ],
  },
];

const allServiceItems = Array.from(
  new Set(serviceDivisions.flatMap((d) => d.items))
);

// Fallback alias map for links
const serviceAliasMap = {
  'industrial hydrojetting (40k psi)': 'Ultra High-Pressure (UHP) Hydrojetting',
  'ultra high-pressure (uhp) hydrojetting': 'Ultra High-Pressure (UHP) Hydrojetting',
  'hydrojetting': 'Ultra High-Pressure (UHP) Hydrojetting',
  'steaming, oil flushing & pre-commissioning': 'Steaming, Oil Flushing & Pre-Commissioning',
  'steaming': 'Steaming, Oil Flushing & Pre-Commissioning',
  'chemical cleaning & decontamination': 'Chemical Cleaning & Decontamination',
  'chemical': 'Chemical Cleaning & Decontamination',
  'non-entry tank cleaning & sludge pumping': 'Non-Entry Tank Cleaning & Sludge Pumping',
  'tank cleaning': 'Non-Entry Tank Cleaning & Sludge Pumping',
  'hazardous waste management': 'Hazardous Waste Management',
  'specialized hazmat waste handling': 'Hazardous Waste Management',
  'non hazardous waste management': 'Non Hazardous Waste Management',
  'industrial waste management': 'Industrial Waste Management',
  'commercial waste management': 'Commercial Waste Management',
  'modular camp epc (10k+ beds)': 'Modular Building Systems',
  'office container': 'Office Container',
  'portable toilets': 'Portable Toilets',
  'kitchen / dormitories': 'Kitchen / Dormitories',
  'toilets (ablution units)': 'Toilets (Ablution Units)',
  'isolation rooms': 'Isolation Rooms',
  'modular building systems': 'Modular Building Systems',
  'heavy crane rental (50t–500t)': 'Cranes & Heavy Lift Fleet',
  'heavy crane rental (50t-500t)': 'Cranes & Heavy Lift Fleet',
  'cranes & heavy lift fleet': 'Cranes & Heavy Lift Fleet',
  'heavy transport & spmt trailers': 'Heavy Transport & Modular SPMT',
  'heavy transport & modular spmt': 'Heavy Transport & Modular SPMT',
  'earthmoving & civil rigs': 'Earthmoving & Civil Rigs',
  'power generation & chillers': 'Power Generation & Chillers',
  'forklifts & laydown logistics': 'Forklifts & Laydown Logistics',
  'high-pressure pumps & compressors': 'High-Pressure Pumps & Compressors',
  'plant turnarounds & shutdowns': 'Plant Turnarounds & Shutdowns',
  'civil infrastructure & concrete': 'Civil Infrastructure & Concrete',
  'multi-megawatt temporary power': 'Multi-Megawatt Temporary Power',
};

const resolveServiceName = (raw) => {
  if (!raw) return null;
  const directMatch = allServiceItems.find(
    (item) => item.toLowerCase() === raw.toLowerCase()
  );
  if (directMatch) return directMatch;
  return serviceAliasMap[raw.toLowerCase()] || null;
};

export default function Contact() {
  useReveal();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const queryBase = searchParams.get('base') || location.state?.baseId || '';
  const queryCity = searchParams.get('city') || location.state?.cityName || '';
  const queryHub = searchParams.get('hub') || location.state?.shortName || '';
  const queryService = searchParams.get('service') || '';
  const queryPage = searchParams.get('page') || '';
  const queryUnit = searchParams.get('unit') || searchParams.get('equipment') || '';
  const queryFrom = searchParams.get('from') || location.state?.from || '';

  // Only auto-fill location when explicitly selected from Kingdom Map
  const isAutoFilledFromMap = Boolean(
    (queryFrom === 'map' || (queryBase && queryCity)) && (queryCity || queryBase)
  );

  // Page-to-default-service map for when no specific service is passed
  const pageDefaultServiceMap = {
    industrial: 'Ultra High-Pressure (UHP) Hydrojetting',
    wms: 'Hazardous Waste Management',
    tcf: 'Office Container',
    equipment: 'Cranes & Heavy Lift Fleet',
  };

  const initialServiceFromQuery = resolveServiceName(queryService) || pageDefaultServiceMap[queryPage] || 'Ultra High-Pressure (UHP) Hydrojetting';

  // Determine initial category tab based on page or service (defaults to industrial)
  const determineDivision = (srv, page) => {
    if (page && serviceDivisions.some((d) => d.id === page)) return page;
    if (srv) {
      const parent = serviceDivisions.find((d) => d.items.includes(srv));
      if (parent) return parent.id;
    }
    return 'industrial';
  };

  const [activeDivision, setActiveDivision] = useState(determineDivision(initialServiceFromQuery, queryPage));

  // Match initial office from query parameters or default to jubail
  const matchedInitialOffice = regionalOffices.find(
    (o) =>
      (queryBase && (o.id === queryBase || (queryBase === 'neom' && o.id === 'sharma'))) ||
      (queryCity && (o.name.toLowerCase() === queryCity.toLowerCase() || o.shortName?.toLowerCase() === queryCity.toLowerCase() || queryCity.toLowerCase().includes(o.id)))
  ) || regionalOffices[0];

  const [selectedOffice, setSelectedOffice] = useState(matchedInitialOffice.id);
  const [selectedServices, setSelectedServices] = useState([initialServiceFromQuery]);

  // Build an auto-prefilled scope description from URL context
  const buildInitialScope = () => {
    const parts = [];
    if (queryService) parts.push(`Service requested: ${queryService}.`);
    if (queryUnit) parts.push(`Unit / Equipment: ${queryUnit}.`);
    if (isAutoFilledFromMap && (queryHub || queryCity)) {
      parts.push(`Preferred base: ${queryHub || queryCity}.`);
    }
    if (queryPage === 'industrial') parts.push('Industrial hydrojetting / plant maintenance scope.');
    if (queryPage === 'wms') parts.push('Waste management and HazMat handling scope.');
    if (queryPage === 'tcf') parts.push('Temporary construction facilities / modular camp scope.');
    if (queryPage === 'equipment') parts.push('Heavy equipment rental and fleet mobilization scope.');
    return parts.join(' ');
  };

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: isAutoFilledFromMap ? (queryCity || matchedInitialOffice.name) : '',
    targetDate: '',
    scopeDetails: buildInitialScope(),
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Synchronize state if URL query params or router location state change
  useEffect(() => {
    const qBase = searchParams.get('base') || location.state?.baseId;
    const qCity = searchParams.get('city') || location.state?.cityName;
    const qSrv = searchParams.get('service');
    const qPage = searchParams.get('page') || '';
    const qUnit = searchParams.get('unit') || searchParams.get('equipment') || '';

    // Update service selection & division
    const resolvedSrv = resolveServiceName(qSrv) || pageDefaultServiceMap[qPage];
    if (resolvedSrv) {
      setSelectedServices((prev) =>
        prev.includes(resolvedSrv) ? prev : [...prev, resolvedSrv]
      );
      const newDiv = determineDivision(resolvedSrv, qPage);
      setActiveDivision(newDiv);
    } else if (qPage) {
      setActiveDivision(qPage);
    }

    const fromMapParam = searchParams.get('from') || location.state?.from;
    const shouldFillLocFromMap = fromMapParam === 'map' || (Boolean(qBase) && Boolean(qCity));

    if (shouldFillLocFromMap && (qBase || qCity)) {
      const targetOffice = regionalOffices.find(
        (o) =>
          (qBase && (o.id === qBase || (qBase === 'neom' && o.id === 'sharma'))) ||
          (qCity && (o.name.toLowerCase() === qCity.toLowerCase() || o.shortName?.toLowerCase() === qCity.toLowerCase() || qCity.toLowerCase().includes(o.id)))
      );

      if (targetOffice) {
        setSelectedOffice(targetOffice.id);
        setForm((prev) => ({
          ...prev,
          location: qCity || targetOffice.name,
          scopeDetails: prev.scopeDetails || buildInitialScope(),
        }));
      } else if (qCity) {
        setForm((prev) => ({ ...prev, location: qCity }));
      }
    }

    // If arriving from a service/equipment page, update scope if still empty
    if ((qSrv || qUnit || qPage) && !qBase && !qCity) {
      setForm((prev) => ({
        ...prev,
        scopeDetails: prev.scopeDetails || buildInitialScope(),
      }));
    }

    // Smooth scroll to RFQ form when any query param is present
    if (qBase || qCity || qSrv || qPage) {
      const timer = setTimeout(() => {
        const rfqSection = document.getElementById('rfq-form');
        if (rfqSection) rfqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [searchParams, location.state]);

  const toggleService = (srv) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.company.trim()) errs.company = 'Company name is required';
    if (!form.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!form.phone.trim()) errs.phone = 'Mobile or landline phone required';
    if (!form.location.trim()) errs.location = 'Operational base / city location is required';
    if (!form.scopeDetails.trim()) errs.scopeDetails = 'Please brief us on your project scope';
    if (!form.agree) errs.agree = 'You must confirm terms of engagement';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const nameParts = (form.name || '').trim().split(' ');
      const firstName = nameParts[0] || 'Valued';
      const lastName = nameParts.slice(1).join(' ') || 'Client';

      await fetch('https://crm-k8g4.onrender.com/api/v1/public/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          phone: form.phone || '',
          company: form.company || '',
          message: [
            form.scopeDetails ? `Scope: ${form.scopeDetails}` : '',
            form.location ? `Target Station/Base: ${form.location}` : '',
            form.targetDate ? `Target Execution Date: ${form.targetDate}` : ''
          ].filter(Boolean).join('\n'),
          source: 'FaceWeb RFP Form',
          sourceChannel: 'Website Form'
        })
      });
    } catch (err) {
      console.error('Failed to submit RFP to CRM:', err);
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeOfficeData = regionalOffices.find((o) => o.id === selectedOffice) || regionalOffices[0];

  return (
    <div className="bg-white text-slate-900 selection:bg-brand-blue selection:text-white">
      {/* ── 1. CINEMATIC LOGISTICS LIVE VIDEO HERO BANNER ── */}
      <section className="relative min-h-[460px] pt-28 pb-16 overflow-hidden bg-slate-950 text-white">
        {/* Looping Logistics Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter saturate-150"
        >
          <source src="/videos/custom/logistics_forklift.mp4" type="video/mp4" />
        </video>

        {/* Dark Tech Scrims & Grid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/85" />
        <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <Breadcrumb items={[{ label: 'Contact & RFP' }]} isDark={true} />

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              Kingdom Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-brand-green">Dispatch</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Connect directly with our engineering estimation teams, fleet dispatchers, and regional project managers across Saudi Arabia.
            </p>
          </div>

          {/* Quick Telemetry Chips Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-4xl">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Response SLA</div>
              <div className="text-xl font-black text-brand-green">&lt; 24 Hours</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Emergency Dispatch</div>
              <div className="text-xl font-black text-white">24/7/365 Ready</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Aramco Vendor No.</div>
              <div className="text-xl font-black text-blue-400">#10084291</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Sovereign Compliance</div>
              <div className="text-xl font-black text-amber-400">IKTVA 100%</div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 3. MAIN INTERACTIVE RFP & DISPATCH GRID ── */}
      <section id="rfq-form" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="max-w-5xl mx-auto w-full">
            {/* Stretched Interactive RFP Form */}
            <div className="w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[36px]">verified</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
                    RFP Successfully Transmitted
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{form.name}</strong>. Your scope has been routed to our <strong className="text-brand-blue">{form.location || activeOfficeData.name}</strong> engineering team. Reference code: <strong className="font-mono text-brand-green">FACE-RFP-2026</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', company: '', email: '', phone: '', location: activeOfficeData.name, targetDate: '', scopeDetails: '', agree: false });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Another Scope
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
                      Commercial Scope Request
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
                      Request Technical Quotation / RFP
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      Target Deployment Hub: <strong className="text-brand-blue">{activeOfficeData.name}</strong>
                    </p>
                  </div>

                  {/* Mobilization Hub Auto-Filled Banner (ONLY when selected from Map) */}
                  {isAutoFilledFromMap && form.location && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[20px]">near_me</span>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                            Mobilization Hub Selected From Kingdom Map
                          </div>
                          <div className="text-xs sm:text-sm font-black text-slate-900">
                            {form.location}
                          </div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        DISPATCH READY
                      </span>
                    </div>
                  )}

                  {/* Two-Column Side Tab Service Scope Selector */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                        Select Required Services (Multi-Select)
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-brand-blue font-bold">
                          {selectedServices.length} Selected
                        </span>
                        {selectedServices.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedServices([])}
                            className="text-[10px] text-slate-400 hover:text-red-500 font-mono underline"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Two-Side Column Layout: Left = Categories, Right = Services under Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                      
                      {/* Left Side: Category Tabs Column */}
                      <div className="sm:col-span-5 space-y-1.5">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-1 mb-1">
                          Categories
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {serviceDivisions.map((div) => {
                            const isActive = activeDivision === div.id;
                            const countInDiv = div.items.filter((item) => selectedServices.includes(item)).length;
                            return (
                              <button
                                key={div.id}
                                type="button"
                                onClick={() => setActiveDivision(div.id)}
                                className={`w-full px-3.5 py-3 rounded-2xl text-left transition-all duration-200 flex items-center justify-between border cursor-pointer group ${
                                  isActive
                                    ? 'bg-slate-900 text-white border-brand-blue shadow-lg scale-[1.01]'
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span
                                    className={`material-symbols-outlined text-[18px] flex-shrink-0 ${
                                      isActive ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'
                                    }`}
                                  >
                                    {div.icon}
                                  </span>
                                  <span className={`text-xs tracking-tight truncate ${isActive ? 'font-black' : 'font-medium'}`}>
                                    {div.label}
                                  </span>
                                </div>
                                {countInDiv > 0 ? (
                                  <span
                                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                                      isActive ? 'bg-brand-blue text-white' : 'bg-blue-100 text-brand-blue'
                                    }`}
                                  >
                                    {countInDiv}
                                  </span>
                                ) : (
                                  <span
                                    className={`material-symbols-outlined text-[16px] flex-shrink-0 transition-opacity ${
                                      isActive ? 'text-brand-blue opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                                    }`}
                                  >
                                    chevron_right
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Side: Services Provided Under Active Category */}
                      <div className="sm:col-span-7 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/90">

                        {/* Services List in Picture 1 Pill Style */}
                        <div className="flex flex-col gap-1.5">
                          {(serviceDivisions.find((d) => d.id === activeDivision)?.items || []).map((srv) => {
                            const isSelected = selectedServices.includes(srv);
                            return (
                              <button
                                type="button"
                                key={srv}
                                onClick={() => toggleService(srv)}
                                className={`w-full px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer text-left ${
                                  isSelected
                                    ? 'bg-slate-900 text-white font-bold shadow-md shadow-slate-900/20 scale-[1.01] border-2 border-brand-blue ring-2 ring-brand-blue/20'
                                    : 'bg-white text-slate-500 font-medium hover:bg-slate-100/90 border border-slate-200 shadow-xs hover:text-slate-700'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                                    isSelected ? 'bg-brand-blue ring-2 ring-blue-400/40 animate-pulse' : 'bg-slate-400'
                                  }`}
                                />
                                <span className="leading-snug flex-1">{srv}</span>
                                {isSelected && (
                                  <span className="material-symbols-outlined text-[13px] text-brand-green flex-shrink-0">
                                    check_circle
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Active Selected Services Tray (Shows all picked services across divisions) */}
                    {selectedServices.length > 0 && (
                      <div className="p-2.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mr-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-brand-blue">task_alt</span>
                          In Scope:
                        </span>
                        {selectedServices.map((srv) => (
                          <span
                            key={srv}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-brand-blue border border-blue-200 text-[11px] font-bold shadow-xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                            <span className="truncate max-w-[200px]">{srv}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleService(srv);
                              }}
                              className="text-slate-400 hover:text-red-500 ml-0.5"
                              title="Remove service"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Eng. Khalid Al-Harbi"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-bold">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company / Entity *</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Aramco / EPC Consortium"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                      {errors.company && <span className="text-[10px] text-red-500 font-bold">{errors.company}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="khalid@company.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone / Mobile *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 font-bold">{errors.phone}</span>}
                    </div>

                    {/* Project Location / Operational Base Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>Project Location / Operational Base *</span>
                        {isAutoFilledFromMap && form.location ? (
                          <span className="text-[10px] font-mono text-brand-green font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                            Auto-Filled (From Map)
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400">
                            Select Dropdown
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <select
                          value={form.location}
                          onChange={(e) => {
                            const val = e.target.value;
                            setForm({ ...form, location: val });
                            const matched = regionalOffices.find(
                              (o) => o.name === val || o.shortName === val || val.includes(o.name)
                            );
                            if (matched) setSelectedOffice(matched.id);
                          }}
                          className={`w-full pl-9 pr-9 py-3 bg-slate-50 border rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-blue font-semibold appearance-none cursor-pointer transition-colors ${
                            errors.location ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        >
                          <option value="">
                            -- Select Project Location / Operational Base --
                          </option>
                          <optgroup label="Eastern Province (Petrochemical & Energy Corridor)">
                            <option value="Jubail Industrial City">Jubail Industrial City (Primary Hub & Heavy Yard)</option>
                            <option value="Al Khobar (Corporate HQ)">Al Khobar (Corporate HQ & Command Center)</option>
                            <option value="Dhahran Hub">Dhahran Hub (Energy Corridor & NDT)</option>
                            <option value="Jafurah Basin">Jafurah Basin (Unconventional Gas Fleet)</option>
                            <option value="Marjan Megaproject Yard">Marjan Megaproject Yard (Offshore/Onshore Staging)</option>
                          </optgroup>
                          <optgroup label="Western Province (NEOM & Red Sea Corridor)">
                            <option value="Sharma (NEOM Sector)">Sharma (NEOM Sector / Gigaproject Yard)</option>
                            <option value="Tabuk Logistics Hub">Tabuk Logistics Hub (Regional Depot)</option>
                            <option value="Duba Port Industrial Base">Duba Port Industrial Base (Marine Terminal)</option>
                            <option value="Shigry Remote Facility">Shigry Remote Facility (Frontier Staging)</option>
                          </optgroup>
                          <optgroup label="Central Province (Riyadh Strategic Corridor)">
                            <option value="Riyadh Central Command">Riyadh Central Command (Vision 2030 Desk)</option>
                            <option value="Haradh Operations Base">Haradh Operations Base (Gas & Desert Facility)</option>
                          </optgroup>
                          <optgroup label="Other Industrial Locations">
                            <option value="Yanbu Industrial City">Yanbu Industrial City</option>
                            <option value="Ras Al Khair Industrial Port">Ras Al Khair Industrial Port</option>
                            <option value="Waad Al Shamal">Waad Al Shamal Mining Complex</option>
                            <option value="Other Project Site in KSA">Other Project Site in Saudi Arabia</option>
                          </optgroup>
                        </select>
                        <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-brand-blue pointer-events-none">
                          location_on
                        </span>
                        <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-slate-400 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                      {errors.location && <span className="text-[10px] text-red-500 font-bold">{errors.location}</span>}
                    </div>

                    {/* Target Mobilization Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Mobilization Date
                      </label>
                      <input
                        type="date"
                        value={form.targetDate}
                        onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Scope Description & Specifications *</label>
                    <textarea
                      rows={4}
                      value={form.scopeDetails}
                      onChange={(e) => setForm({ ...form, scopeDetails: e.target.value })}
                      placeholder="Specify tonnage, hydrojetting pressure, number of camp beds, duration, or shutdown unit specs..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                    />
                    {errors.scopeDetails && <span className="text-[10px] text-red-500 font-bold">{errors.scopeDetails}</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={form.agree}
                      onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                      className="w-4 h-4 rounded text-brand-blue"
                    />
                    <label htmlFor="agreeTerms" className="text-xs text-slate-600">
                      I confirm this is an official commercial RFP enquiry for FACE Contractor.
                    </label>
                  </div>
                  {errors.agree && <div className="text-[10px] text-red-500 font-bold">{errors.agree}</div>}

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-black text-sm text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Transmit Commercial RFP</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
