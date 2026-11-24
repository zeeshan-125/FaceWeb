import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Left side navigation items
const leftLinks = [
  { to: '/', label: 'Home' },
  { to: '/wms', label: 'WMS' },
  { to: '/services', label: 'Industrial Services' },
];

// Right side navigation items
const rightLinks = [
  { to: '/equipment', label: 'Equipment Rentals' },
  { to: '/tcf', label: 'TCF' },
  { to: '/about', label: 'About' },
];

const allLinks = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NavLink = ({ to, label }) => {
    const active =
      pathname === to ||
      (to !== '/' && pathname.startsWith(to)) ||
      (to === '/tcf' && pathname === '/portable-structure');

    return (
      <Link
        key={to}
        to={to}
        className={
          active
            ? "text-[11px] xl:text-[12px] font-black tracking-wider uppercase text-slate-950 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-green after:rounded-full whitespace-nowrap transition-colors"
            : "text-[11px] xl:text-[12px] font-bold tracking-wider uppercase text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap py-1"
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 bg-white text-slate-800 transition-all duration-300 border-b border-slate-200/90 ${
        scrolled ? 'shadow-md' : 'shadow-xs'
      }`}
    >
      {/* ── Desktop View: Centered Logo in Straight Header Bar ── */}
      <div className="hidden lg:block w-full">
        <div className="grid h-[58px]" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
          {/* Left Navigation Links */}
          <nav className="flex items-center justify-end gap-6 xl:gap-8 pr-8 xl:pr-12">
            {leftLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} label={label} />
            ))}
          </nav>

          {/* Center Logo in the Middle */}
          <Link
            to="/"
            className="flex items-center justify-center px-4 py-1.5 group"
            title="FACE Industrial Services"
          >
            <img
              src="/images/logo-actual.png"
              alt="FACE Industrial Services"
              className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Navigation Links */}
          <nav className="flex items-center justify-start gap-6 xl:gap-8 pl-8 xl:pl-12">
            {rightLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} label={label} />
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile View (< 1024px) ── */}
      <div className="lg:hidden flex items-center justify-between h-[58px] px-5">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo-actual.png"
            alt="FACE Industrial Services"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined text-[20px]">{open ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <div
        className="lg:hidden border-t border-slate-200 bg-white overflow-hidden transition-all duration-300 text-slate-800 shadow-xl"
        style={{ maxHeight: open ? '540px' : '0' }}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col gap-1.5">
          {allLinks.map(({ to, label }) => {
            const active = pathname === to || (to !== '/' && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                  active ? 'text-brand-green bg-emerald-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
