import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';

const accreditations = [
  {
    logo: '/images/certificates/mwan.png',
    title: 'MWAN Approved',
    badge: 'Waste Management',
    desc: 'Authorized by the National Center for Waste Management for hazardous, non-hazardous and industrial waste transport & disposal.',
  },
  {
    logo: '/images/certificates/ncec.png',
    title: 'NCEC Certified',
    badge: 'Environmental Compliance',
    desc: 'Officially certified by the National Center for Environmental Compliance for high-standard remediation and plant decontamination.',
  },
  {
    logo: '/images/certificates/swa.png',
    title: 'SWA Certified',
    badge: 'Water Authority',
    desc: 'Certified by the Saudi Water Authority for industrial water supply, dewatering, and compliant wastewater discharge.',
  },
  {
    logo: '/images/certificates/rcjy.svg',
    title: 'Royal Commission',
    badge: 'Approved Contractor',
    desc: 'Fully prequalified industrial service and infrastructure partner for Royal Commission developments in Jubail, Yanbu, and Ras Al-Khair.',
  },
  {
    logo: '/images/certificates/iso.png',
    title: 'ISO Integrated',
    badge: '9001 · 14001 · 45001',
    desc: 'Audited and certified under ISO 9001 (Quality), ISO 14001 (Environmental), and ISO 45001 (Occupational Health & Safety).',
  },
];

const highlights = [
  { stat: '300+', label: 'Satisfied Industrial Clients', sub: 'Petrochemical, EPC & Infrastructure partners' },
  { stat: '1,500+', label: 'Heavy Assets Fleet', sub: 'Cranes, earthmovers, hydro-jets & multi-axles' },
  { stat: '0.00', label: 'Lost Time Incident Rate', sub: 'Uncompromising Aramco & TUV safety record' },
  { stat: '100%', label: 'Saudi Local Alignment', sub: 'Empowering Vision 2030 & IKTVA initiatives' },
];

export default function AccreditationSection() {
  return (
    <section
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/operations_tasnee_opt.jpg')`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── Neutral Dark Overlay (Modeled from faceindus.com: neutral 50% opacity, NOT dark blue) ── */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* ── Seamless Dark Transition into Operational Base Map (No white line) ── */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b from-transparent to-black/70 pointer-events-none z-[1]" />

      <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Header */}
        <div className="reveal-up grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.1] drop-shadow-md">
              Why Industry Leaders <span className="text-brand-green">Choose FACE</span>
            </h2>
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed drop-shadow-sm font-medium">
              We hold the highest national regulatory certifications in the Kingdom of Saudi Arabia, ensuring every shutdown, turnaround, heavy lift, and modular installation meets uncompromising safety standards.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/hse"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              <span className="material-symbols-outlined text-[18px]">security</span>
              View HSE Certifications
            </Link>
          </div>
        </div>

        {/* Accreditations Grid: 5 columns on desktop with compact sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-16">
          {accreditations.map((item, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="reveal-card p-5 sm:p-5.5 rounded-2xl bg-white/95 hover:bg-white backdrop-blur-md border border-white/80 hover:border-brand-blue/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group shadow-lg flex flex-col justify-between text-center"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-20 sm:h-[84px] w-full flex items-center justify-center mb-4">
                  <img
                    src={item.logo}
                    alt={item.title}
                    className="h-16 sm:h-[74px] max-h-[78px] max-w-[185px] w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="card-title-font text-base sm:text-[17px] font-black text-brand-slate uppercase mb-2 leading-tight tracking-tight text-center">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-[11.5px] sm:text-xs leading-relaxed text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benchmark Statistics Banner */}
        <div className="reveal-scale rounded-3xl grad-bg p-8 sm:p-12 text-white shadow-2xl border border-white/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {highlights.map((h, i) => (
              <div key={i} className={`space-y-2 ${i !== 0 ? 'sm:pl-8' : ''} ${i >= 2 ? 'pt-6 sm:pt-0' : ''}`}>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                  <AnimatedCounter value={h.stat} duration={1500} delay={200} triggerOnView />
                </div>
                <div className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  {h.label}
                </div>
                <p className="text-xs text-blue-100 leading-normal">
                  {h.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

