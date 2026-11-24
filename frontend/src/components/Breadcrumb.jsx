import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [], isDark = false }) {
  return (
    <div className="mb-6">
      <nav
        aria-label="Breadcrumb"
        className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-all ${
          isDark
            ? 'bg-slate-900/90 border border-slate-800 text-slate-300'
            : 'bg-white/95 border border-slate-200 text-slate-700'
        }`}
      >
        <Link to="/" className="hover:text-brand-blue transition-colors">
          Home
        </Link>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={idx} className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-slate-400 select-none">
                chevron_right
              </span>
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-brand-blue transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={`font-bold ${isDark ? 'text-brand-green' : 'text-brand-blue'}`}>
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
