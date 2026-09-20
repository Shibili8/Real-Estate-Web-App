import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowLeft, ArrowRight, Search, Building2, Home } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import PropertyCard from '../components/property/PropertyCard';

export default function WishlistPage() {
  const { wishlistProperties, wishlistCount, clearWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[75vh]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              Saved Collection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            My Saved Properties
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {wishlistCount > 0
              ? `You have shortlisted ${wishlistCount} ${
                  wishlistCount === 1 ? 'property' : 'properties'
                } for easy access.`
              : 'Keep track of properties you like by clicking the heart icon.'}
          </p>
        </div>

        {wishlistCount > 0 && (
          <div className="flex items-center gap-3">
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:border-slate-300 transition-colors shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>Browse More</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all saved properties?')) {
                  clearWishlist();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-semibold transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content: Active Grid vs Friendly Empty State */}
      <div className="mt-8">
        {wishlistCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wishlistProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-xs animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 stroke-[1.75]" />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              You haven't saved any properties yet. Explore our verified listings of apartments, luxury villas, and independent houses, and click the heart icon on any card to save it here.
            </p>

            <Link
              to="/properties"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>Explore Available Properties</span>
            </Link>

            {/* Quick Category Shortcuts */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-400 block mb-3">
                Quick Category Suggestions:
              </span>
              <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
                <Link
                  to="/properties?type=Villa"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-medium transition-colors"
                >
                  Villas
                </Link>
                <Link
                  to="/properties?type=Apartment"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-medium transition-colors"
                >
                  Apartments
                </Link>
                <Link
                  to="/properties?listingType=Rent"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-medium transition-colors"
                >
                  Rentals
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
