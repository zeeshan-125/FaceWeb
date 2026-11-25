import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const fmcsDivisions = [
  {
    number: '01',
    title: 'Hard & Soft Facility Management',
    icon: 'engineering',
    color: 'blue',
    desc: 'Comprehensive preventive and corrective maintenance for industrial compounds, administrative offices, and remote project camps.',
    items: [
      'HVAC, Chiller & MEP Systems Maintenance',
      '24/7 Electrical, Plumbing & Civil Repairs',
      'Janitorial, Deep Cleaning & Hygiene Audits',
    ],
  },
  {
    number: '02',
    title: 'Industrial & Camp Catering',
    icon: 'restaurant',
    color: 'emerald',
    desc: 'High-volume, nutritious multi-cuisine meal programs prepared in HACCP & ISO 22000 certified kitchens tailored for industrial workforces.',
    items: [
      'Breakfast, Lunch, Dinner & Packed Meal Boxes',
      'Multi-Cultural Menus & Dietary Compliance',
      'Cold-Chain Logistics & Food Safety Testing',
    ],
  },
  {
    number: '03',
    title: 'Workforce Camp Operations',
    icon: 'apartment',
    color: 'blue',
    desc: 'End-to-end residential camp management ensuring comfort, safety, and high morale for engineering and labor workforces.',
    items: [
      'Daily Housekeeping & Linen/Laundry Services',
      '24/7 Camp Reception, Security & Access Control',
      'Recreation Halls, Gyms & Welfare Amenities',
    ],
  },
  {
    number: '04',
    title: 'Pest Control & Sanitization',
    icon: 'cleaning_services',
    color: 'emerald',
    desc: 'Scheduled vector control, fumigation, and medical-grade sanitization programs compliant with municipal and Aramco standards.',
    items: [
      'SFDA & Municipality Approved Pest Management',
      'Kitchen, Dining & Accommodation Sanitization',
      'Monthly Inspection & Compliance Reporting',
    ],
  },
  {
    number: '05',
    title: 'Landscaping & Groundskeeping',
    icon: 'park',
    color: 'blue',
    desc: 'External compound maintenance, irrigation management, and clean-site housekeeping across industrial and commercial facilities.',
    items: [
      'Irrigation Network & Greenbelt Maintenance',
      'Roadway Sweeping & External Groundskeeping',
      'Segregated Waste Collection & Bin Management',
    ],
  },
  {
    number: '06',
    title: 'Life Support & Site Utilities',
    icon: 'bolt',
    color: 'emerald',
    desc: 'Uninterrupted utility management for remote desert camps and industrial sites requiring self-sufficient infrastructure.',
    items: [
      'Potable Water Supply & Tank Chlorination',
      'Wastewater & Sewage Vacuum Tanker Support',
      'Backup Generator & Fuel Logistics Management',
    ],
  },
];

const complianceStandards = [
  { label: 'ISO 22000', sub: 'Food Safety Management', icon: 'verified' },
  { label: 'HACCP', sub: 'Hazard Analysis & Critical Control', icon: 'health_and_safety' },
  { label: 'ISO 41001', sub: 'Facility Management System', icon: 'workspace_premium' },
  { label: 'Aramco & RC', sub: 'Camp & Catering Standards', icon: 'shield' },
];

export default function FMCS() {
  const rfqLink = '/contact?service=Facility%20Management%20%26%20Catering%20(FMCS)';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[520px] lg:min-h-[580px] pt-28 pb-16 overflow-hidden bg-slate-50 border-b border-slate-200">
        {/* Full-Section Ambient Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        >
          <source src="/videos/custom/fmcs_camp.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <Breadcrumb items={[{ label: 'FMCS' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-blue text-[11px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[15px] text-brand-blue">apartment</span>
                Facility Management &amp; Catering Services
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[1.15]">
                  Facility Management &amp; <span className="grad-text">Catering Services (FMCS)</span>
                </h1>
              </div>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to={rfqLink}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-blue-700 hover:from-blue-700 hover:to-brand-blue shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment</span>
                  <span>Request FMCS Scope RFP</span>
                </Link>
                <a
                  href="#fmcs-divisions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-700 bg-white border border-slate-200 hover:border-brand-blue/40 hover:text-brand-blue shadow-sm transition-all"
                >
                  <span>Explore Divisions</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
              </div>

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Operations</div>
                  <div className="text-lg sm:text-xl font-black text-brand-slate mt-0.5">24/7</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Food Safety</div>
                  <div className="text-lg sm:text-xl font-black text-brand-green mt-0.5">HACCP</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">ISO Standard</div>
                  <div className="text-lg sm:text-xl font-black text-brand-blue mt-0.5">ISO 22000</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Compliance</div>
                  <div className="text-lg sm:text-xl font-black text-amber-600 mt-0.5">Aramco / RC</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. CORE FMCS DIVISIONS ── */}
      <section id="fmcs-divisions" className="py-20 bg-white">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-green text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px] text-brand-green">hub</span>
              Integrated Camp &amp; Facility Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              Core FMCS <span className="grad-text">Capabilities</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fmcsDivisions.map((div) => (
              <div
                key={div.number}
                className="group rounded-3xl p-7 bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        div.color === 'emerald'
                          ? 'bg-emerald-50 text-brand-green border border-emerald-200/70'
                          : 'bg-blue-50 text-brand-blue border border-blue-200/70'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">{div.icon}</span>
                    </div>
                    <span className="font-mono text-xs font-black text-slate-400">{div.number}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 group-hover:text-brand-blue transition-colors">
                      {div.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">{div.desc}</p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-200/70">
                    {div.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                        <span className="material-symbols-outlined text-[16px] text-brand-green shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPLIANCE & QUALITY STANDARDS ── */}
      <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {complianceStandards.map((std) => (
              <div
                key={std.label}
                className="rounded-2xl p-5 bg-white/5 border border-white/10 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center text-brand-green shrink-0">
                  <span className="material-symbols-outlined">{std.icon}</span>
                </div>
                <div>
                  <div className="font-black text-base uppercase tracking-tight">{std.label}</div>
                  <div className="text-xs text-slate-400 font-medium">{std.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FINAL CTA BANNER ── */}
      <section className="py-20 cta-section relative overflow-hidden text-white">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
                Need Turnkey Facility Management &amp; Catering?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Partner with FACE for HACCP-certified catering, 24/7 camp operations, and integrated facility maintenance across Saudi Arabia.
              </p>
            </div>
            <Link
              to={rfqLink}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-brand-green hover:bg-emerald-500 text-white shadow-xl shadow-emerald-900/30 hover:-translate-y-0.5 transition-all shrink-0"
            >
              <span>Request FMCS Proposal</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
