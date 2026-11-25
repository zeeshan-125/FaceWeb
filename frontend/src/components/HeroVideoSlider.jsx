import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';

const slides = [
  {
    id: 3,
    video: '/videos/custom/waste_management.mp4',
    badge: 'NCEC Certified · Hazardous & Non-Hazardous Waste',
    tag: 'Waste Management',
    title: 'Waste Management &',
    titleLine2: 'Recycling Solutions',
    subtitle: 'Hazardous · Non-Hazardous · Industrial · Commercial Waste',
    desc: 'Safe, compliant, and sustainable waste management solutions that protect people, the environment, and communities across Saudi Arabia. NCEC certified with Royal Commission & SWA approvals.',
    actionLink: '/services',
    actionText: 'WMS Services',
    action2Link: '#rfq-map',
    action2Text: 'Request a Quote',
    stats: [
      { value: '728,000', label: 'M³ Hazardous Waste Disposed', color: 'text-white' },
      { value: '1,000', label: 'M³ Non-Hazardous Disposed', color: 'text-brand-green' },
      { value: '1,000', label: 'M³ Aramco Waste Collected', color: 'text-white' },
      { value: '1,000', label: 'M³ Non-Aramco Collected', color: 'text-brand-green' },
    ],
  },
  {
    id: 2,
    video: '/videos/custom/hydrojetting_industrial.mp4',
    badge: 'Chemical Cleaning · Hydrojetting · Tank Cleaning',
    tag: 'Industrial Services',
    title: 'Industrial Services &',
    titleLine2: 'High-Pressure Solutions',
    subtitle: 'High-Pressure Water Jetting · Chemical Cleaning · Decontamination',
    desc: 'Comprehensive industrial services including high-pressure water jetting, industrial chemical cleaning, tank cleaning & neutralization, hydrocarbon decontamination, hazardous liquid pumping, steaming services, and pre-commissioning across Saudi Arabia.',
    actionLink: '/services',
    actionText: 'Our Industrial Services',
    action2Link: '#rfq-map',
    action2Text: 'Request a Quote',
    stat: '40,000 PSI',
    statLabel: 'Hydro-blasting',
  },
  {
    id: 4,
    video: '/videos/custom/tcf_facilities.mp4',
    badge: 'Portable Setup · Modular Construction · Site Support',
    tag: 'TCF',
    title: 'Temporary Construction',
    titleLine2: 'Facilities',
    subtitle: 'Office Containers · Portable Toilets · Kitchen/Dormitories · Isolation Rooms · Modular Units',
    desc: 'Turnkey temporary construction facilities including portable office containers, kitchen & dormitories, toilets, isolation rooms, and modular units for remote project sites across Saudi Arabia.',
    actionLink: '/tcf',
    actionText: 'TCF Solutions',
    action2Link: '#rfq-map',
    action2Text: 'Request a Quote',
    stat: '3,500+',
    statLabel: 'Modular Units Built',
  },
  {
    id: 5,
    video: '/videos/custom/heavy_equipment.mp4',
    badge: 'Aramco Certified Fleet · Heavy & Light Machinery',
    tag: 'Equipment Rentals',
    title: 'Heavy & Light',
    titleLine2: 'Equipment Rental',
    subtitle: 'Cranes · Excavators · Super Suckers · Manlifts · Loaders · Generators',
    desc: 'Comprehensive fleet of certified heavy and light equipment — Cranes, Super Suckers, Excavators, Loaders, Dump Trucks, Dewatering Pumps, and Generators with 24/7 certified operators across Saudi Arabia.',
    actionLink: '/equipment',
    actionText: 'View Equipment Fleet',
    action2Link: '#rfq-map',
    action2Text: 'Request a Quote',
    stat: '180+',
    statLabel: 'Fleet Units Ready',
  },
];

// Helper component for slow, graceful letter-by-letter reveal
function StaggeredLetters({ text, startDelay = 0.12, charDelay = 0.045, className = "" }) {
  const words = text.trim().split(/\s+/);
  let charCounter = 0;

  return (
    <span className={className}>
      {words.map((word, wordIdx) => {
        const letters = word.split('');
        const wordOffset = charCounter;
        charCounter += letters.length;

        return (
          <span
            key={wordIdx}
            className={`inline-block whitespace-nowrap ${wordIdx < words.length - 1 ? 'mr-[0.25em]' : ''}`}
          >
            {letters.map((char, charIdx) => {
              const delay = (startDelay + (wordOffset + charIdx) * charDelay).toFixed(3);
              return (
                <span
                  key={charIdx}
                  className="letter-reveal"
                  style={{ animationDelay: `${delay}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export default function HeroVideoSlider() {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef([]);

  const scrollToRfqMap = (e) => {
    e.preventDefault();
    const serviceMap = {
      'Waste Management': 'Waste Management Solutions (WMS)',
      'Industrial Services': 'Industrial Services & High-Pressure Hydrojetting',
      'TCF': 'Temporary Construction Facilities (TCF)',
      'Equipment Rentals': 'Heavy & Light Equipment Rental',
    };
    const matchedService = serviceMap[activeSlide.tag];
    if (matchedService) {
      window.dispatchEvent(new CustomEvent('rfq:selectService', { detail: matchedService }));
    }
    const target = document.getElementById('rfq-map');
    if (target) {
      const navOffset = 68;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  const handleVideoEnded = (idx) => {
    if (idx === current) {
      setCurrent((c) => (c + 1) % slides.length);
    }
  };

  // Play active video from start and advance to next content when completed
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === current) {
          vid.currentTime = 0;
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => { });
          }
        } else {
          vid.pause();
        }
      }
    });

    // 8 seconds for the 1st video, matching duration across contents
    const duration = slides[current]?.duration || 8000;
    const slideDurationTimer = setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, duration);

    return () => clearTimeout(slideDurationTimer);
  }, [current]);

  const activeSlide = slides[current];
  const isRight = current % 2 === 1;

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#070d17]">
      {/* ── Seamless Multi-Video Crossfade Layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((s, idx) => (
          <video
            key={s.video}
            ref={(el) => (videoRefs.current[idx] = el)}
            autoPlay
            muted
            playsInline
            onEnded={() => handleVideoEnded(idx)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-105 ${idx === current ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
          >
            <source src={s.video} type="video/mp4" />
          </video>
        ))}

        {/* Only a subtle bottom fade for text contrast — no left/right darkening */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none z-10" />
      </div>

      {/* ── Wide Content Container (Alternating Left / Right Layout) ── */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div
          key={`content-slide-${current}`}
          className={`max-w-5xl xl:max-w-6xl space-y-6 flex flex-col ${isRight ? 'ml-auto text-right items-end' : 'mr-auto text-left items-start'
            }`}
        >




          {/* Phase 1: Cinematic Headline */}
          {(() => {
            const charSpeed = 0.045;
            const line1Start = 0.12;
            const line1CharCount = activeSlide.title.replace(/\s+/g, '').length;
            const line2Start = line1Start + line1CharCount * charSpeed + 0.08;

            return (
              <div className={`space-y-1 w-full ${isRight ? 'text-right' : 'text-left'}`}>
                <div className={`py-1 ${isRight ? 'pl-4' : 'pr-4'}`}>
                  <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-[3.2rem] font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                    <StaggeredLetters text={activeSlide.title} startDelay={line1Start} charDelay={charSpeed} />
                  </h1>
                </div>
                {activeSlide.titleLine2 && (
                  <div className={`py-1 ${isRight ? 'pl-4' : 'pr-4'}`}>
                    {activeSlide.titleLine2Highlight ? (
                      <span className="font-montserrat inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-[3.2rem] font-bold tracking-tight leading-[1.15] drop-shadow-sm">
                        {activeSlide.titleLine2Prefix && (
                          <span className="text-white mr-[0.3em]">
                            <StaggeredLetters text={activeSlide.titleLine2Prefix} startDelay={line2Start} charDelay={charSpeed} />
                          </span>
                        )}
                        <span className={activeSlide.titleLine2HighlightColor || 'text-brand-green'}>
                          <StaggeredLetters
                            text={activeSlide.titleLine2Highlight}
                            startDelay={line2Start + (activeSlide.titleLine2Prefix ? activeSlide.titleLine2Prefix.length * charSpeed : 0)}
                            charDelay={charSpeed}
                          />
                        </span>
                      </span>
                    ) : (
                      <span className="font-montserrat inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-[3.2rem] font-bold tracking-tight leading-[1.15] drop-shadow-sm text-sky-400">
                        <StaggeredLetters text={activeSlide.titleLine2} startDelay={line2Start} charDelay={charSpeed} />
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })()}





          {/* Phase 2: CTAs */}
          <div className={`animate-hero-cta flex flex-wrap items-center gap-4 pt-1 w-full ${isRight ? 'justify-end' : 'justify-start'
            }`}>
            {activeSlide.actionLink.startsWith('#') ? (
              <a
                href={activeSlide.actionLink}
                onClick={scrollToRfqMap}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-green hover:bg-emerald-500 shadow-lg shadow-emerald-700/30 hover:-translate-y-0.5 transition-all uppercase tracking-wider cursor-pointer"
              >
                <span>{activeSlide.actionText}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            ) : (
              <Link
                to={activeSlide.actionLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-green hover:bg-emerald-500 shadow-lg shadow-emerald-700/30 hover:-translate-y-0.5 transition-all uppercase tracking-wider"
              >
                <span>{activeSlide.actionText}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            )}

            {activeSlide.action2Link && (
              activeSlide.action2Link.startsWith('#') ? (
                <a
                  href={activeSlide.action2Link}
                  onClick={scrollToRfqMap}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-transparent hover:bg-white/10 backdrop-blur-md border border-white/40 hover:border-white/70 transition-all shadow-md uppercase tracking-wider cursor-pointer"
                >
                  <span>{activeSlide.action2Text}</span>
                </a>
              ) : (
                <Link
                  to={activeSlide.action2Link}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-transparent hover:bg-white/10 backdrop-blur-md border border-white/40 hover:border-white/70 transition-all shadow-md uppercase tracking-wider"
                >
                  <span>{activeSlide.action2Text}</span>
                </Link>
              )
            )}

            {!activeSlide.action2Link && (
              <a
                href="#rfq-map"
                onClick={scrollToRfqMap}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-transparent hover:bg-white/10 backdrop-blur-md border border-white/40 hover:border-white/70 transition-all shadow-md uppercase tracking-wider cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-brand-green">request_quote</span>
                Request Project RFP
              </a>
            )}
          </div>

          {/* Phase 2: Stats — 4-col for custom stats, 3-col otherwise (omitted when hideStats is true) */}
          {!activeSlide.hideStats && (
            <div className={`animate-hero-metrics w-full flex ${isRight ? 'justify-end' : 'justify-start'} pt-2`}>
              {activeSlide.stats ? (
                <div className="grid grid-cols-4 gap-0 divide-x divide-white/15 w-full max-w-3xl border border-white/15 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-inner">
                  {activeSlide.stats.map((st, i) => (
                    <div key={i} className="flex flex-col items-center justify-center py-5 px-3 text-center">
                      <div className={`text-2xl sm:text-3xl font-black ${st.color}`}>
                        <AnimatedCounter key={`stat0-${i}-${current}`} value={st.value} duration={1200} delay={900 + i * 100} />
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{st.label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 sm:gap-8 py-4 border-y border-white/15 w-full max-w-2xl bg-black/30 backdrop-blur-md rounded-2xl px-6 shadow-inner text-center">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      <AnimatedCounter key={`stat-${current}-${activeSlide.stat || 'default'}`} value={activeSlide.stat || '100%'} duration={1200} delay={950} />
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{activeSlide.statLabel || 'Site Solutions'}</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-brand-green">
                      <AnimatedCounter key={`lti-${current}`} value="0.00" duration={1100} delay={1050} />
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">LTI Safety Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-blue-400">
                      <AnimatedCounter key={`vendor-${current}`} value="#10084291" duration={1300} delay={1150} />
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Aramco Vendor</div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
