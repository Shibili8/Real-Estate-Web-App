import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Building2,
  Home,
  Compass,
  Video,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import { PROPERTY_TYPES, POPULAR_CITIES } from '../types/property';

export default function HomePage() {
  const navigate = useNavigate();
  const { properties, featuredProperties } = useProperties();

  // Hero Search States
  const [listingType, setListingType] = useState('Buy');
  const [locationQuery, setLocationQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (listingType && listingType !== 'All') {
      params.set('listingType', listingType);
    }
    if (locationQuery.trim()) {
      params.set('city', locationQuery.trim());
    }
    if (propertyType && propertyType !== 'All') {
      params.set('type', propertyType);
    }

    navigate(`/properties?${params.toString()}`);
  };

  // Type counts
  const typeCounts = PROPERTY_TYPES.filter((t) => t !== 'All').map((type) => {
    const count = properties.filter(
      (p) => p.type?.toLowerCase() === type.toLowerCase()
    ).length;
    return { type, count };
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-28">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Architecture Banner"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-300 text-xs font-semibold backdrop-blur-md mb-6 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Verified Real Estate with 4K Virtual Walkthroughs</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
              Find Your Sanctuary in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-100">
                Prime Locations
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Explore handpicked villas, penthouses, modern flats, and land plots with full photo galleries and high-definition video walkthroughs.
            </p>
          </div>

          {/* Hero Search Box Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 text-slate-900">
            {/* Listing Type Toggle Tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              {['Buy', 'Rent'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setListingType(type)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                    listingType === type
                      ? 'bg-brand-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {type === 'Buy' ? 'Buy Property' : 'Rent Property'}
                </button>
              ))}
            </div>

            {/* Form Inputs Grid */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Location Input */}
              <div className="md:col-span-5 relative">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
                  Location / City
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="E.g. Calicut, Kochi, Bangalore..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="md:col-span-4 relative">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
                  Property Type
                </label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-11 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type === 'All' ? 'All Property Types' : type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="md:col-span-3 pt-4 md:pt-5">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Popular quick tags */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Quick Searches:</span>
              {['Calicut', 'Kochi', 'Bangalore', 'Goa', 'Villa'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (tag === 'Villa') {
                      navigate(`/properties?type=Villa`);
                    } else {
                      navigate(`/properties?city=${tag}`);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 transition-colors font-medium text-slate-700"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Type Category Highlights */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-brand-700 tracking-wider uppercase">
                Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Explore by Property Type
              </h2>
            </div>
            <Link
              to="/properties"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 group mt-2 sm:mt-0"
            >
              <span>See all listings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {typeCounts.map(({ type, count }) => (
              <Link
                key={type}
                to={`/properties?type=${type}`}
                className="group p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-500 hover:bg-brand-50/50 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-all duration-200 mb-4">
                  {type === 'Apartment' && <Building2 className="w-6 h-6" />}
                  {type === 'Villa' && <Home className="w-6 h-6" />}
                  {type === 'House' && <Home className="w-6 h-6" />}
                  {type === 'Land' && <Compass className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-700 transition-colors">
                  {type}s
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {count} {count === 1 ? 'Property' : 'Properties'} Available
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Handpicked Exclusive Selection
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Featured Properties
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Top rated residences, beachfront villas, and investment opportunities.
              </p>
            </div>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-semibold hover:border-brand-500 hover:text-brand-700 transition-all shadow-xs mt-3 sm:mt-0"
            >
              <span>Explore All ({properties.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.slice(0, 6).map((property, idx) => (
              <PropertyCard
                key={property.id}
                property={property}
                priority={idx === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why HavenEstate Value Proposition */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-700 tracking-wider uppercase">
              The Haven Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Transparent, Media-First Property Discovery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                HD Video Walkthroughs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Take realistic walkthroughs and aerial drone tours before scheduling site visits, saving your valuable time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                100% Verified Titles
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every residential house, penthouse, and land plot undergoes strict title checks and document verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Direct WhatsApp & Call
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zero spam middlemen. Connect directly with owners or dedicated property managers with one tap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Post Property Banner CTA */}
      <section className="bg-brand-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-brand-800/60 rounded-3xl p-8 sm:p-12 border border-brand-700/50">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Have a Property to Sell or Rent Out?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                List your villa, apartment, or land with high-resolution photo galleries and video walkthroughs. Reach verified buyers directly.
              </p>
            </div>
            <Link
              to="/admin/add-property"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-brand-900 font-bold text-sm hover:bg-brand-50 transition-colors shadow-lg flex-shrink-0"
            >
              <span>Post Your Property Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
