import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import Breadcrumb from '../components/Breadcrumb';

const timeline = [
  { year: '2003', label: 'Foundation', col: 'bg-brand-blue', text: 'FACE Contractor Ltd. established in Jubail Industrial City, initially focusing on industrial cleaning and hydro-jetting services for Aramco facilities.' },
  { year: '2008', label: 'Fleet Expansion', col: 'bg-brand-green', text: 'Launched heavy equipment rental division with initial fleet of 200 units. Secured first major crane contract with Saudi Aramco Ras Tanura Refinery.' },
  { year: '2012', label: 'NCEC Licensing', col: 'bg-brand-blue', text: 'Obtained full NCEC environmental clearance for hazardous waste management. Established dedicated waste management division.' },
  { year: '2016', label: 'ISO Triple Certification', col: 'bg-brand-green', text: 'Achieved simultaneous ISO 9001, 14001 and 45001 certification. Expanded operations to Western Region with Yanbu hub opening.' },
  { year: '2019', label: 'Modular Camps EPC', col: 'bg-brand-blue', text: 'Entered the modular accommodation EPC market. Delivered first 3,000-resident camp for a NEOM contractor in Tabuk region within 75 days.' },
  { year: '2023', label: '2,500+ Fleet Milestone', col: 'bg-brand-green', text: 'Fleet surpassed 2,500 assets. Riyadh hub opened. Achieved 0.00 LTI record across 5 million+ man-hours. SABIC EPC prequalification awarded.' },
  { year: 'Today', label: 'Vision 2030 Partner', col: 'bg-gradient-to-r from-brand-blue to-brand-green', text: '10 regional base stations across the Kingdom. 5,000+ workforce. Active contracts on NEOM, Red Sea Project, Jubail II, and multiple Aramco mega TAs.' },
];

const certs = [
  { name: 'ISO 9001:2015', label: 'Quality Management Systems', code: 'CERT #QA-9001-KSA' },
  { name: 'ISO 14001:2015', label: 'Environmental Management Systems', code: 'CERT #ENV-14001-KSA' },
  { name: 'ISO 45001:2018', label: 'Occupational Health & Safety', code: 'CERT #OHS-45001-KSA' },
  { name: 'NCEC Clearances', label: 'HazMat Transportation & Treatment', code: 'LIC #3010-0941' },
  { name: 'Saudi Aramco', label: 'Prequalified Industrial Contractor', code: 'VENDOR #10084291' },
  { name: 'SABIC Prequalified', label: 'Major Plant Turnarounds & Cranes', code: 'VENDOR #400921' },
  { name: 'Royal Commission', label: 'Industrial City Infrastructure', code: 'RCJY #60182' },
  { name: 'TUV Rheinland', label: 'Fleet & Crane Operator Certification', code: 'TUV-SA-VERIFIED' },
];

export default function About() {
  useReveal();

  return (
    <div className="bg-white text-slate-900 selection:bg-brand-blue selection:text-white">
      {/* ── 1. CINEMATIC LIVE VIDEO HERO BANNER ── */}
      <section className="relative min-h-[480px] pt-28 pb-16 overflow-hidden bg-slate-950 text-white">
        {/* Looping Civil & Industrial Live Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter saturate-150"
        >
          <source src="/videos/custom/civil_framework.mp4" type="video/mp4" />
        </video>

        {/* Dark Tech Scrims & Grid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/85" />
        <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <Breadcrumb items={[{ label: 'About FACE' }]} isDark={true} />

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              Built on Decades of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-brand-green">Industrial Excellence</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              FACE Contractor Ltd. was established with a singular commitment: powering the Kingdom’s critical energy, petrochemical, and sovereign infrastructure through unyielding technical rigor and zero-harm execution.
            </p>
          </div>

          {/* Quick Telemetry Chips Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-4xl">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Kingdom Experience</div>
              <div className="text-xl font-black text-white">20+ Years</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Certified Workforce</div>
              <div className="text-xl font-black text-brand-green">5,000+ Staff</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Strategic Bases</div>
              <div className="text-xl font-black text-blue-400">10 Base Stations</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Safety Metric</div>
              <div className="text-xl font-black text-amber-400">0.00 LTI Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bridge: Dark hero → Light content ── */}
      <div className="bridge-dark-to-light" />

      {/* ── 2. MISSION, VISION & CORE OPERATING PRINCIPLES ── */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              Corporate Mandate
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              Mission, Vision & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Core Values</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our guiding tenets ensure every refinery turnaround, modular living community, and heavy equipment mobilization adheres to world-class safety and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-250/40 space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[28px]">flag</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To deliver mission-critical industrial services, turnkey workforce living communities, and heavy equipment fleets that protect and accelerate Saudi Arabia's sovereign energy infrastructure with zero harm to people or the environment.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-250/40 space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[28px]">visibility</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To stand as the Kingdom's benchmark industrial contractor and workforce welfare partner for Saudi Vision 2030 — recognized for unyielding safety leadership, technological adoption, and sovereign supply-chain resilience.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-250/40 space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[28px]">stars</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Core Values</h3>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                {['Zero Compromise on Personnel Safety', 'Integrity & Transparency in Every Contract', 'Technical Innovation & Rigorous Quality Assurance', 'Punctual Turnaround & Delivery SLA Guarantees', 'Kingdom-Wide Circular Environmental Stewardship'].map((v, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center text-[10px] font-black">✓</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. COMPANY HISTORY / JOURNEY TIMELINE (Restored to earlier format) ── */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 grid-lines pointer-events-none opacity-25" />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              Company History
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Journey</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Two decades of continuous growth, safety milestones, and sovereign infrastructure delivery across the Kingdom.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Vertical Line */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200" />
            <div className="space-y-8">
              {timeline.map(({ year, label, col, text }, i) => (
                <div key={i} className="reveal flex gap-6 items-start group">
                  <div className={`w-12 h-12 rounded-full ${col} flex-shrink-0 flex items-center justify-center text-white font-black text-xs shadow-md z-10 ring-4 ring-slate-50`}>
                    {year}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue transition-all">
                    <div className="font-bold text-xs text-brand-blue uppercase tracking-wider mb-1.5">{label}</div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SOVEREIGN ACCREDITATIONS & CERTIFICATIONS GRID ── */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              Verified Credentials
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              Accreditations & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Certifications</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every division operates under officially audited certifications from global and Saudi regulatory bodies.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certs.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue transition-all">
                <div className="text-xs font-mono font-bold text-brand-blue uppercase">{c.name}</div>
                <div className="text-xs text-slate-700 font-semibold mt-1 mb-2">{c.label}</div>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md inline-block border border-slate-100">
                  {c.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bridge: Light → Dark callout ── */}
      <div className="bridge-light-to-dark" />

      {/* ── 5. SAUDI VISION 2030 COMMITMENT CALLOUT ── */}
      <section className="py-16 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 border border-brand-green/40 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">
            Vision 2030 Alignment
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white max-w-2xl mx-auto">
            Committed to the Kingdom's Sovereign Industrial Future
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            From localized workforce upskilling and high IKTVA ratios to circular zero-landfill waste management, we stand with the Kingdom's transformation.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/30 transition-all"
            >
              <span>Partner with FACE Contractor</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
