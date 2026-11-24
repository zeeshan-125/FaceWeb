import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-bg pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 px-3 py-1.5 rounded-xl bg-white flex items-center shadow-md">
                <img src="/images/logo-footer.png" alt="FACE" className="h-full w-auto object-contain" />
              </div>
              <div>
                <div className="text-white font-black text-base">FACE Contractor Ltd.</div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-brand-green3">Kingdom of Saudi Arabia</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">Saudi Arabia's Tier-1 integrated industrial contractor serving Aramco, SABIC, RCJY, and Vision 2030 projects.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white/40">CR: 2055001928</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white/40">VAT: 300482910400003</span>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-brand-blue3 inline-block rounded"></span>Pages
            </h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/services', 'Industrial Services'], ['/equipment', 'Equipment Rentals'], ['/wms', 'WMS (Waste Management)'], ['/tcf', 'TCF (Modular Facilities)'], ['/about', 'About Us'], ['/hse', 'HSE & Safety'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-white/45 hover:text-white transition-colors font-medium">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-brand-green3 inline-block rounded"></span>Contact
            </h4>
            <p className="text-sm text-white/45 mb-1">contact@facecontractor.com</p>
            <p className="text-sm text-white/45 mb-1">800-FACE-KSA</p>
            <p className="text-sm text-white/45">Jubail Industrial City, KSA</p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">©© 2025 FACE Contractor Ltd. All rights reserved.</p>
          <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full badge-green">Saudi Vision 2030</span>
        </div>
      </div>
    </footer>
  );
}
