import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Building2,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import FilterSidebar from '../components/property/FilterSidebar';
import SortDropdown from '../components/property/SortDropdown';
import { CardSkeleton } from '../components/common/Skeleton';
import {
  parseFiltersFromParams,
  buildSearchParamsFromFilters,
} from '../utils/urlFilters';

export default function PropertiesPage() {
  const { properties } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parse filters from URL
  const filters = useMemo(() => {
    return parseFiltersFromParams(searchParams);
  }, [searchParams]);

  // Update a single filter field and sync with URL
  const handleFilterChange = (field, value) => {
    setIsTransitioning(true);
    const updated = {
      ...filters,
      [field]: value,
    };
    const newParams = buildSearchParamsFromFilters(updated);
    setSearchParams(newParams, { replace: true });
    setTimeout(() => setIsTransitioning(false), 150);
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setIsTransitioning(true);
    setSearchParams(new URLSearchParams(), { replace: true });
    setTimeout(() => setIsTransitioning(false), 150);
  };

  // Filter and Sort properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // 1. Text search (city, locality, title, state)
        if (filters.query && filters.query.trim()) {
          const q = filters.query.trim().toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchCity = item.location?.city?.toLowerCase().includes(q);
          const matchLocality = item.location?.locality?.toLowerCase().includes(q);
          const matchState = item.location?.state?.toLowerCase().includes(q);
          if (!matchTitle && !matchCity && !matchLocality && !matchState) {
            return false;
          }
        }

        // 2. Listing Type (Buy vs Rent)
        if (filters.listingType && filters.listingType !== 'All') {
          if (
            item.listingType?.toLowerCase() !==
            filters.listingType.toLowerCase()
          ) {
            return false;
          }
        }

        // 3. Property Type
        if (filters.type && filters.type !== 'All') {
          if (
            item.type?.toLowerCase() !== filters.type.toLowerCase()
          ) {
            return false;
          }
        }

        // 4. Price range
        if (filters.minPrice && !isNaN(Number(filters.minPrice))) {
          if (Number(item.price) < Number(filters.minPrice)) return false;
        }
        if (filters.maxPrice && !isNaN(Number(filters.maxPrice))) {
          if (Number(item.price) > Number(filters.maxPrice)) return false;
        }

        // 5. Bedrooms
        if (filters.bedrooms && filters.bedrooms !== 'all') {
          const bedCount = Number(item.specs?.bedrooms || 0);
          if (filters.bedrooms === '4+') {
            if (bedCount < 4) return false;
          } else {
            if (bedCount !== Number(filters.bedrooms)) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sort === 'price_asc') {
          return Number(a.price) - Number(b.price);
        }
        if (filters.sort === 'price_desc') {
          return Number(b.price) - Number(a.price);
        }
        // Default newest
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [properties, filters]);

  // Active filter pills
  const activePills = [];
  if (filters.query) {
    activePills.push({
      label: `"${filters.query}"`,
      clear: () => handleFilterChange('query', ''),
    });
  }
  if (filters.listingType && filters.listingType !== 'All') {
    activePills.push({
      label: `For ${filters.listingType}`,
      clear: () => handleFilterChange('listingType', 'All'),
    });
  }
  if (filters.type && filters.type !== 'All') {
    activePills.push({
      label: filters.type,
      clear: () => handleFilterChange('type', 'All'),
    });
  }
  if (filters.bedrooms && filters.bedrooms !== 'all') {
    activePills.push({
      label: `${filters.bedrooms} BHK`,
      clear: () => handleFilterChange('bedrooms', 'all'),
    });
  }
  if (filters.minPrice || filters.maxPrice) {
    const minText = filters.minPrice ? `Min ₹${Number(filters.minPrice).toLocaleString('en-IN')}` : '';
    const maxText = filters.maxPrice ? `Max ₹${Number(filters.maxPrice).toLocaleString('en-IN')}` : '';
    activePills.push({
      label: [minText, maxText].filter(Boolean).join(' - '),
      clear: () => {
        handleFilterChange('minPrice', '');
        handleFilterChange('maxPrice', '');
      },
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Heading & Search Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Properties Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse verified apartments, villas, houses, and plots with virtual tours.
          </p>
        </div>

        {/* Sort selector & Mobile filter toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Trigger Button */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 shadow-xs hover:border-slate-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-700" />
            <span>Filters</span>
            {activePills.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-700 text-white text-xs flex items-center justify-center font-bold">
                {activePills.length}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <SortDropdown
            value={filters.sort}
            onChange={(val) => handleFilterChange('sort', val)}
          />
        </div>
      </div>

      {/* Main Grid: Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={filteredProperties.length}
          />
        </div>

        {/* Mobile Filter Drawer / Modal */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-sm bg-white min-h-screen p-4 sm:p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={filteredProperties.length}
                isMobileModal={true}
                onCloseMobileModal={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Results Counter & Active Pills Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-700">
              Showing{' '}
              <span className="text-brand-700 font-extrabold text-base">
                {filteredProperties.length}
              </span>{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'}
            </div>

            {/* Active Pills */}
            {activePills.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">
                  Active:
                </span>
                {activePills.map((pill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/60"
                  >
                    <span>{pill.label}</span>
                    <button
                      type="button"
                      onClick={pill.clear}
                      className="hover:text-brand-900 p-0.5"
                      title="Remove filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Transition / Skeleton Placeholder */}
          {isTransitioning ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : filteredProperties.length > 0 ? (
            /* Property Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            /* Friendly Empty State */
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 stroke-[1.75]" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                We couldn't find any properties matching your current filter criteria. Try adjusting the price range, bedroom count, or clear active filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
