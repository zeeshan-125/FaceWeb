import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import Breadcrumb from '../components/Breadcrumb';

const goldenRules = [
  {
    id: 1,
    title: 'Permit to Work (PTW)',
    icon: 'assignment_turned_in',
    tag: 'Mandatory Authorization',
    desc: 'Never initiate any hot work, confined space entry, or electrical work without a verified, signed client Permit to Work on site.',
    checklist: ['Valid Joint Site Inspection completed', 'Signatures from Issuer and Receiver present', 'Atmospheric test results attached'],
  },
  {
    id: 2,
    title: 'Energy Isolation (LOTO)',
    icon: 'lock',
    tag: 'Zero Energy State',
    desc: 'Verify that all hazardous electrical, pneumatic, and hydraulic power sources are isolated, locked, tagged, and tested before work commences.',
    checklist: ['Personal padlock applied by each technician', 'Residual pressure bled to zero', 'Try-step performed before physical contact'],
  },
  {
    id: 3,
    title: 'Confined Space Entry',
    icon: 'door_sliding',
    tag: 'Atmospheric Verification',
    desc: 'No entry into vessels, tanks, or trenches without calibrated gas testing, mechanical ventilation, and dedicated standby watch.',
    checklist: ['Continuous O2, LEL, H2S, and CO monitoring', 'Standby watchman stationed at entrance', 'Tripod and retrieval winch in position'],
  },
  {
    id: 4,
    title: 'Working at Height',
    icon: 'height',
    tag: '100% Fall Arrest',
    desc: '100% tie-off with certified full-body harness and twin lanyards when working at 1.8 meters or above without engineered handrails.',
    checklist: ['Daily pre-use harness inspection completed', 'Scaffold tag verified (Green Tag only)', 'Anchor point rated to 5,000 lbs (22.2 kN)'],
  },
  {
    id: 5,
    title: 'Heavy Lift & Rigging',
    icon: 'forklift',
    tag: 'Engineered Lifting',
    desc: 'All lifts conducted strictly according to certified lift plans by third-party certified riggers. Never position underneath a suspended load.',
    checklist: ['Lift plan approved for critical lifts (>85% capacity)', 'Barricaded exclusion zone established', 'Rigging gear color-code verified for current quarter'],
  },
  {
    id: 6,
    title: 'Line of Fire Awareness',
    icon: 'warning',
    tag: 'Hazard Exclusion Zones',
    desc: 'Position personnel clear of moving machinery, blind spots, high-pressure piping relief paths, and tensioned cables.',
    checklist: ['High-visibility PPE worn at all times', 'Banksman escort for all heavy plant movements', 'Whip-checks installed on all 40K PSI hoses'],
  },
];

export default function HSE() {
  useReveal();
  const [activeRule, setActiveRule] = useState(0);

  return (
    <div className="bg-white text-slate-900 selection:bg-brand-blue selection:text-white">
      {/* ── 1. CINEMATIC LIVE SAFETY VIDEO HERO BANNER ── */}
      <section className="relative min-h-[480px] pt-28 pb-16 overflow-hidden bg-slate-950 text-white">
        {/* Looping Live Industrial Torch Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter saturate-150"
        >
          <source src="/videos/custom/welding_torch.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Tech Scrims & Safety Pulse Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/85" />
        <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <Breadcrumb items={[{ label: 'HSE & Safety' }]} isDark={true} />

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              Health, Safety & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-brand-green">Environment</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Safety is not a box we check — it is the fundamental core of how FACE executes. We maintain an uncompromising commitment to zero harm for our people, our clients, and the Kingdom’s natural ecosystems.
            </p>
          </div>

          {/* Live Safety Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-4xl">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Lost Time Incident Rate</div>
              <div className="text-2xl font-black text-brand-green">0.00 LTI</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">LTI-Free Man-Hours</div>
              <div className="text-2xl font-black text-white">5,000,000+</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Safety Induction Rate</div>
              <div className="text-2xl font-black text-blue-400">100% Certified</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Stop Work Authority</div>
              <div className="text-2xl font-black text-amber-400">100% Empowered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bridge: Dark hero → Light rules section ── */}
      <div className="bridge-dark-to-light" />

      {/* ── 2. INTERACTIVE LIFE-SAVING GOLDEN RULES RADAR ── */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              Operational Protocol
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              The 6 Life-Saving <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Golden Rules</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every worker, engineer, and subcontractor on a FACE site is trained, audited, and strictly held to these non-negotiable life-saving safety mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Rules Quick Switcher Strip (Col 5) */}
            <div className="lg:col-span-5 space-y-3">
              {goldenRules.map((rule, idx) => {
                const isActive = activeRule === idx;
                return (
                  <div
                    key={rule.id}
                    onClick={() => setActiveRule(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/30 scale-102'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-brand-blue'
                      }`}>
                        <span className="material-symbols-outlined text-[22px]">{rule.icon}</span>
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider opacity-75">Rule 0{rule.id}</div>
                        <div className="text-sm font-black">{rule.title}</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[18px]">
                      chevron_right
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Deep-Dive Inspection Card (Col 7) */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-green text-slate-950">
                    RULE 0{goldenRules[activeRule].id}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {goldenRules[activeRule].tag}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  MANDATORY AUDIT
                </span>
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  {goldenRules[activeRule].title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {goldenRules[activeRule].desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 relative z-10">
                <div className="text-xs font-mono uppercase tracking-wider text-brand-green font-bold">
                  Field Verification Checklist:
                </div>
                <div className="space-y-2 text-xs text-slate-200">
                  {goldenRules[activeRule].checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-brand-green text-slate-950 flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STOP WORK AUTHORITY SOVEREIGN CHARTER (Dark Mode Feature) ── */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl relative">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                Executive Safety Charter
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                100% Stop Work Authority (SWA)
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                At FACE Contractor, every single employee, rigger, driver, and subcontracted specialist holds absolute, unmitigated Stop Work Authority. If any condition, weather shift, or task is deemed unsafe, work ceases immediately with zero management repercussions.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xl font-black text-brand-green">100% Backed</div>
                  <div className="text-[11px] text-slate-400 uppercase">By Executive Leadership</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xl font-black text-blue-400">Zero Fear</div>
                  <div className="text-[11px] text-slate-400 uppercase">Of Commercial Retribution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
