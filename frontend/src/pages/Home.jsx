import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroVideoSlider from '../components/HeroVideoSlider';
import OperationalBaseMap from '../components/OperationalBaseMap';
import AccreditationSection from '../components/AccreditationSection';
import Ticker from '../components/Ticker';
import AnimatedCounter from '../components/AnimatedCounter';
import useReveal from '../hooks/useReveal';

// 6 Core Interactive Service Cards
const interactiveServices = [
  {
    id: 'industrial',
    number: '01',
    title: 'Industrial Services',
    subtitle: 'High-Pressure Water Jetting & Chemical Cleaning',
    category: 'High-Pressure & Cleaning',
    desc: 'Specialized industrial services including high-pressure water jetting up to 40,000 PSI, industrial chemical cleaning, tank neutralization, and hydrocarbon decontamination.',
    features: ['40,000 PSI High-Pressure Water Jetting', 'Industrial Chemical Cleaning & Flushing', 'Tank Cleaning & Hydrocarbon Decontamination'],
    image: '/images/services/services_hydrojetting.jpg',
    link: '/services',
  },
  {
    id: 'wms',
    number: '02',
    title: 'Waste Management (WMS)',
    subtitle: 'Hazardous & Non-Hazardous Recycling',
    category: 'NCEC Licensed HazMat',
    desc: 'NCEC-certified hazardous and non-hazardous waste management, vacuum tanker transport, and recycling solutions.',
    features: ['Hazardous & Non-Hazardous Disposal', 'Vacuum Tankers & Slurry Hauling', 'Royal Commission & SWA Approved'],
    image: '/images/wms/wms_recycling.jpg',
    link: '/wms',
  },
  {
    id: 'heavy-equipment',
    number: '03',
    title: 'Heavy Equipments',
    subtitle: 'Certified Mobile Fleet & Machinery Rental',
    category: 'Aramco Approved Fleet',
    desc: 'Heavy and light equipment fleet with 24/7 certified operators — cranes, super suckers, excavators, and dump trucks.',
    features: ['Boom & Crawler Cranes (50T–500T)', 'Super Suckers & Heavy Excavators', 'Loaders, Dump Trucks & Manlifts'],
    image: '/images/equipment_fleet_hero.jpg',
    link: '/equipment',
  },
  {
    id: 'tcf',
    number: '04',
    title: 'TCF (Temporary Construction)',
    subtitle: 'Turnkey Modular Units & Site Infrastructure',
    category: 'Modular Infrastructure',
    desc: 'Rapid-deployment temporary construction facilities, portable office containers, dormitories, and isolation rooms.',
    features: ['Portable Office Containers & Cabins', 'Kitchens, Dormitories & Ablution Units', 'Turnkey Remote Site Mobilization'],
    image: '/images/civil-1.jpg',
    link: '/tcf',
  },
  {
    id: 'utility',
    number: '05',
    title: 'Utility Services',
    subtitle: 'Power Generation, Chillers & Dewatering',
    category: 'Power & Site Utilities',
    desc: 'Critical temporary site utilities, multi-megawatt diesel power generation, dewatering pumps, and water logistics.',
    features: ['Multi-Megawatt Power Units', 'Dewatering & Slurry Pumps', 'Industrial Water Tankers & Chillers'],
    image: '/images/cranes_fleet_hero.jpg',
    link: '/equipment',
  },
  {
    id: 'camp-catering',
    number: '06',
    title: 'Camp & Catering Services',
    subtitle: 'Turnkey Modular Living & Food Services',
    category: 'Workforce Welfare EPC',
    desc: 'Complete workforce accommodations engineered to Aramco and Royal Commission standards with institutional catering.',
    features: ['Turnkey Modular Housing Communities', 'Hygienic Central Dining & Catering', '24/7 Facility Maintenance & Life Support'],
    image: '/images/camp-1.jpg',
    link: '/services',
  },
];

// Sovereign clients with official high-resolution vector and transparent logos
const sovereignClients = [
  {
    name: "Saudi Aramco",
    logo: "/images/clients/aramco.svg",
    className: "h-9 max-h-9 w-auto max-w-[135px] object-contain",
  },
  {
    name: "SABIC",
    logo: "/images/clients/sabic.svg",
    className: "h-8 max-h-8 w-auto max-w-[125px] object-contain",
  },
  {
    name: "Saudi Electricity Company",
    logo: "/images/clients/sec.png",
    className: "h-10 max-h-10 w-auto max-w-[150px] object-contain",
  },
  {
    name: "Ma'aden",
    logo: "/images/clients/maaden.svg",
    className: "h-8 max-h-8 w-auto max-w-[130px] object-contain",
  },
  {
    name: "Royal Commission for Jubail & Yanbu",
    logo: "/images/clients/rcjy.svg",
    className: "h-11 max-h-11 w-auto max-w-[120px] object-contain",
  },
  {
    name: "NEOM",
    logo: "/images/clients/neom.svg",
    className: "h-7 max-h-7 w-auto max-w-[125px] object-contain",
  },
];


const testimonials = [
  {
    quote: "Throughout the project execution, we experienced flawless coordination, zero safety violations, and unwavering dedication from the FACE team to deliver specialized high-pressure jetting and chemical cleaning on schedule.",
    client: "Project Operations Director",
    company: "SHA-JV Petrochemical Consortium",
    location: "Jubail Industrial City",
    project: "Industrial Maintenance & Chemical Cleaning",
  },
  {
    quote: "Deploying over 150 heavy machines and a 3,000-man turnkey modular camp in the northern desert corridor with FACE was smooth and on-schedule. Their Aramco-certified equipment fleet is second to none.",
    client: "Senior EPC Contracts Manager",
    company: "Sovereign Infrastructure Partner",
    location: "NEOM / Western Province",
    project: "Gigaproject Site Preparation",
  },
  {
    quote: "FACE’s waste management team delivered NCEC-compliant containment and hazardous sludge extraction with zero environmental deviations. An exemplary safety record that sets an industry benchmark.",
    client: "Head of Environmental Safety",
    company: "Downstream Energy Corporation",
    location: "Yanbu / Eastern Province",
    project: "Hazardous Remediation Program",
  },
];

export default function Home() {
  useReveal();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic testimonial sliding (every 3 seconds, pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeTestimonial, isPaused]);

  return (
    <div className="bg-white text-brand-slate selection:bg-brand-blue selection:text-white">
      {/* ── 1. LIVE VIDEO HERO SLIDER ── */}
      <HeroVideoSlider />

      {/* ── 2. TICKER STRIP ── */}
      <Ticker />
      {/* ── 3. KPI STATS STRIP ── */}
      <section className="bg-[#07101e] border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '15+', label: 'Years Experience', color: 'text-white' },
              { value: '250+', label: 'Projects Completed', color: 'text-brand-green' },
              { value: '180+', label: 'Fleet Units', color: 'text-white' },
              { value: '1000+', label: 'Skilled Workforce', color: 'text-brand-green' },
            ].map((kpi, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 100}ms` }}
                className="reveal-card flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <div className={`text-3xl sm:text-4xl font-black ${kpi.color}`}>
                  <AnimatedCounter
                    value={kpi.value}
                    duration={1400}
                    delay={100 + i * 150}
                    triggerOnView={true}
                  />
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── 4. INTERACTIVE SERVICES SHOWCASE (Hover-Reveal Cards from Reference Site) ── */}
      <section className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-green">Services</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
              Integrated turnkey solutions executed under certified Aramco, Royal Commission, and ISO safety standards.
            </p>
          </div>

          {/* 6 Interactive Service Cards in 3-column layout (2x3 grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {interactiveServices.map((service, idx) => (
              <div
                key={service.id}
                style={{ transitionDelay: `${(idx % 3) * 120}ms` }}
                className="reveal-card group relative h-[520px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-blue/70 hover:shadow-brand-blue/20"
              >
                {/* Visual Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${service.image}')`,
                  }}
                />

                {/* Dark Gradient Scrims for enhanced text contrast across all image types */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 from-35% via-slate-950/85 via-65% to-slate-950/30 group-hover:from-slate-950 group-hover:via-slate-950/90 transition-colors" />

                {/* Top Badge & Number */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-slate-200">
                    {service.category}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs font-black text-brand-green">
                    {service.number}
                  </span>
                </div>

                {/* Interactive Bottom Content Container */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end transition-all duration-300">
                  {/* Service Title & Subtitle */}
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    <h3 className="card-title-font text-xl sm:text-[22px] font-extrabold text-white uppercase tracking-tight leading-tight mb-2 drop-shadow">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-emerald-400 font-bold tracking-wide mb-2.5 drop-shadow">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed mb-4 font-normal">
                      {service.desc}
                    </p>
                  </div>

                  {/* Feature Bullets with improved font size and contrast */}
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs sm:text-[13px] font-semibold text-slate-100 flex items-center gap-2.5">
                        <span className="text-emerald-400 font-black text-xs">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <Link
                      to={service.link}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue shadow-lg shadow-brand-blue/30 group-hover:shadow-brand-blue/50 transition-all"
                    >
                      <span>Explore Division</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ACCREDITATION & WHY CHOOSE US (with Operational Background) ── */}
      <AccreditationSection />

      {/* ── 6. INTERACTIVE OPERATIONAL BASES (SAUDI MAP) ── */}
      <OperationalBaseMap />

      {/* ── 7. SAUDI VISION 2030 & IKTVA STRATEGIC ALIGNMENT ── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Vision 2030 Card */}
            <div className="reveal-card p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden group hover:border-brand-green/60 transition-all">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-green text-xs font-black uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-brand-green">flag</span>
                  National Transformation
                </div>
                <h3 className="card-title-font text-3xl sm:text-4xl font-extrabold text-brand-slate uppercase tracking-tight">
                  Saudi Vision <span className="text-brand-green inline-block">2030</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Deeply rooted in the Kingdom's economic diversification, FACE accelerates giga-infrastructure development across NEOM, Red Sea, and the industrial heartlands through sovereign civil contracting, sustainable waste management, and heavy mobilization.
                </p>
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-green hover:text-brand-green2 transition-colors"
                  >
                    <span>Discover Vision 2030 Roadmap</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* IKTVA Card */}
            <div style={{ transitionDelay: '120ms' }} className="reveal-card p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden group hover:border-brand-blue/60 transition-all">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-blue text-xs font-black uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-brand-blue">handshake</span>
                  In-Kingdom Total Value Add
                </div>
                <h3 className="card-title-font text-3xl sm:text-4xl font-extrabold text-brand-slate uppercase tracking-tight">
                  IKTVA <span className="text-brand-blue inline-block">Excellence</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  As an accredited Saudi Aramco vendor (#10084291), our high IKTVA score reflects our heavy investment in local Saudi engineering talent, domestic supply chains, in-Kingdom equipment fabrication, and regional manufacturing yards.
                </p>
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-blue hover:text-brand-blue2 transition-colors"
                  >
                    <span>Review IKTVA Localization</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bridge: slate-50 → white ── */}
      <div className="bridge-slate-to-white" />

      {/* ── 8. CLIENT TESTIMONIALS & TRUST ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="reveal-up max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-blue text-xs font-bold uppercase tracking-widest">
              <span className="material-symbols-outlined text-[16px] text-brand-blue">rate_review</span>
              Client Trust & Project Track Record
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-slate tracking-tight uppercase">
              What Our Clients <span className="grad-text">Say</span>
            </h2>
          </div>

          <div className="reveal-scale max-w-4xl mx-auto">
            <div
              className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-lg relative overflow-hidden flex flex-col justify-between"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <span className="material-symbols-outlined text-6xl text-brand-blue/20 absolute top-6 right-8 pointer-events-none select-none z-0">
                format_quote
              </span>

              {/* Horizontal Sliding Quote Track */}
              <div className="overflow-hidden w-full relative z-10 mb-6">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="w-full flex-shrink-0">
                      <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed italic pr-8 sm:pr-14 min-h-[96px] sm:min-h-[80px] flex items-center">
                        "{t.quote}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author & Stationary Navigation Controls */}
              <div className="pt-4 border-t border-slate-200 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Horizontal Sliding Author Track */}
                <div className="overflow-hidden flex-1">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                  >
                    {testimonials.map((t, idx) => (
                      <div key={idx} className="w-full flex-shrink-0">
                        <div className="text-base font-black text-brand-slate">
                          {t.client}
                        </div>
                        <div className="text-xs font-bold text-brand-blue">
                          {t.company} · {t.location}
                        </div>
                        <div className="text-[11px] text-slate-400 font-semibold mt-0.5">
                          Scope: {t.project}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {testimonials.map((_, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => setActiveTestimonial(tIdx)}
                      className={`h-3 rounded-full transition-all duration-500 ${tIdx === activeTestimonial
                        ? 'w-8 bg-brand-blue'
                        : 'w-3 bg-slate-300 hover:bg-slate-400'
                        }`}
                      title={`Testimonial ${tIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. PRE-APPROVED SOVEREIGN CLIENT CREDENTIALS ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="reveal-up text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-blue text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px] text-brand-blue">verified_user</span>
              Sovereign Vendor Prequalification
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-slate uppercase tracking-tight">
              Pre-Approved &amp; Accredited by the Kingdom’s Energy &amp; EPC Leaders
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
              Holding active vendor registrations and high-standard prequalifications across Saudi Arabia's major sovereign operators.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {sovereignClients.map((client, idx) => (
              <div
                key={client.name}
                style={{ transitionDelay: `${idx * 60}ms` }}
                className="reveal-card client-card group rounded-2xl px-5 py-4 bg-white cursor-default border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center min-h-[92px]"
                title={client.name}
              >
                <div className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={client.className}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bridge: Light credentials → CTA gradient ── */}
      <div className="bridge-light-to-cta" />

      {/* ── 9. FINAL COMMERCIAL RFP ACTION BANNER ── */}
      <section className="py-24 lg:py-32 cta-section relative overflow-hidden text-white">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="reveal-up max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                24/7 Rapid Mobilization Across Saudi Arabia
              </div>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight uppercase leading-tight">
                Partner with the Kingdom's Trusted Industrial Contractor
              </h2>
              <p className="text-blue-100 text-base leading-relaxed">
                Submit project tenders, industrial inquiries, or immediate heavy lift fleet requirements. Our regional dispatch centers respond within 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm bg-white text-brand-blue hover:bg-blue-50 hover:-translate-y-0.5 transition-all shadow-xl"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                Initiate Project RFP
              </Link>
              <a
                href="tel:8003223372"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                Call 800-FACE-KSA
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
