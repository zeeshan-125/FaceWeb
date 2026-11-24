const items = [
  'Saudi Aramco Pre-Approved','SABIC Prequalified EPC','NCEC Licensed HazMat',
  'ISO 9001 · 14001 · 45001 Certified','Royal Commission Yanbu Partner','NEOM Mega-Project Mobilization',
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="py-4 grad-bg overflow-hidden shadow-sm">
      <div className="ticker-content flex items-center">
        {doubled.map((item, i) => (
          <span key={i} className="flex-shrink-0 inline-flex items-center">
            <span className="text-white text-xs sm:text-[13.5px] font-extrabold uppercase tracking-wider px-6 sm:px-8">{item}</span>
            <span className="text-white/45 text-[11px] px-1">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
