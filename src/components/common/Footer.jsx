import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow">
                <Home className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Haven<span className="text-brand-400">Estate</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover verified residential and commercial properties across premier cities. Browse detailed virtual video tours, verified floor plans, and transparent pricing.
            </p>
            <div className="space-y-2 text-sm text-slate-400 pt-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>PT Usha Road, Calicut, Kerala & MG Road, Bangalore</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>+91 95445 25989</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>contact@havenestate.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?listingType=Buy" className="hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties?listingType=Rent" className="hover:text-white transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" className="hover:text-white transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Apartment" className="hover:text-white transition-colors">
                  Modern Apartments
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Top Locations</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/properties?city=Calicut" className="hover:text-white transition-colors">
                  Calicut Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Kochi" className="hover:text-white transition-colors">
                  Kochi Marine Drive & Kakkanad
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Bangalore" className="hover:text-white transition-colors">
                  Bangalore Tech Hubs
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Mumbai" className="hover:text-white transition-colors">
                  Mumbai Sea View Homes
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Goa" className="hover:text-white transition-colors">
                  Goa Beach Villas
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Action */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Post & Manage</h4>
            <p className="text-xs text-slate-400 mb-4">
              Are you a homeowner, builder, or broker? List your property with high definition photos & videos.
            </p>
            <Link
              to="/admin/add-property"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors shadow-sm"
            >
              Post a Property
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HavenEstate Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
