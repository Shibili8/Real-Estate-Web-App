import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Menu, X, Compass, Search } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Properties', path: '/properties' },
    { name: 'Buy', path: '/properties?listingType=Buy' },
    { name: 'Rent', path: '/properties?listingType=Rent' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.search;
    if (path.includes('?')) {
      return location.pathname + location.search === path;
    }
    return location.pathname.startsWith(path) && !location.search;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-700/20 group-hover:bg-brand-800 transition-colors">
              <Home className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                Haven<span className="text-brand-700">Estate</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest -mt-1">
                Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Admin Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/properties"
              className="p-2.5 text-slate-500 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-colors"
              title="Search Properties"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/admin/add-property"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Property</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/admin/add-property"
              className="p-2 rounded-lg text-brand-700 hover:bg-brand-50"
              title="Post Property"
            >
              <PlusCircle className="w-6 h-6" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/admin/add-property"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-700 text-white font-semibold shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Post New Property</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
