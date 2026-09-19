import React from 'react';
import {
  Search,
  RotateCcw,
  Building2,
  Home,
  IndianRupee,
  Bed,
  MapPin,
  X,
} from 'lucide-react';
import { PROPERTY_TYPES, BEDROOM_OPTIONS } from '../../types/property';

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isMobileModal = false,
  onCloseMobileModal,
}) {
  const isFiltered =
    filters.query ||
    filters.listingType !== 'All' ||
    filters.type !== 'All' ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.bedrooms !== 'all';

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">Filters</h2>
          {isFiltered && (
            <span className="w-2 h-2 rounded-full bg-brand-600" title="Active filters" />
          )}
        </div>

        <div className="flex items-center gap-2">
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
          {isMobileModal && (
            <button
              type="button"
              onClick={onCloseMobileModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Location / Keyword Search */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
          Location or City
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onFilterChange('query', e.target.value)}
            placeholder="Search city, locality, or title..."
            className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          />
          {filters.query && (
            <button
              type="button"
              onClick={() => onFilterChange('query', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Listing Purpose (Buy vs Rent) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
          Listing Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
          {['All', 'Buy', 'Rent'].map((type) => {
            const active = filters.listingType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onFilterChange('listingType', type)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  active
                    ? 'bg-white text-brand-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'All' ? 'All' : `For ${type}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Property Type */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
          Property Type
        </label>
        <div className="space-y-1">
          {PROPERTY_TYPES.map((type) => {
            const isSelected =
              filters.type?.toLowerCase() === type.toLowerCase();
            return (
              <button
                key={type}
                type="button"
                onClick={() => onFilterChange('type', type)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  {type === 'Apartment' && <Building2 className="w-4 h-4 text-slate-500" />}
                  {type === 'Villa' && <Home className="w-4 h-4 text-slate-500" />}
                  {type === 'House' && <Home className="w-4 h-4 text-slate-500" />}
                  <span>{type === 'All' ? 'All Property Types' : type}</span>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-brand-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Bedrooms Filter */}
      {filters.type?.toLowerCase() !== 'land' && (
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            Bedrooms (BHK)
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {BEDROOM_OPTIONS.map((opt) => {
              const active = filters.bedrooms === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onFilterChange('bedrooms', opt.value)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all text-center ${
                    active
                      ? 'bg-brand-700 text-white border-brand-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label === 'Any Beds' ? 'Any' : opt.label.replace(' BHK', '')}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Price Range */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
          Price Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block mb-1">Min Price</span>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              placeholder="0"
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block mb-1">Max Price</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              placeholder="Any"
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Quick presets */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {[
            { label: '< ₹50L', min: '', max: '5000000' },
            { label: '₹50L - ₹1Cr', min: '5000000', max: '10000000' },
            { label: '₹1Cr - ₹3Cr', min: '10000000', max: '30000000' },
            { label: '> ₹3Cr', min: '30000000', max: '' },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onFilterChange('minPrice', preset.min);
                onFilterChange('maxPrice', preset.max);
              }}
              className="text-[11px] px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Modal Footer CTA */}
      {isMobileModal && (
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCloseMobileModal}
            className="w-full py-3 rounded-xl bg-brand-700 text-white font-bold text-sm shadow-md"
          >
            Show {totalResults} {totalResults === 1 ? 'Property' : 'Properties'}
          </button>
        </div>
      )}
    </aside>
  );
}
