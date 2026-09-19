import React from 'react';
import { Video, Star, Sparkles } from 'lucide-react';

export function ListingTypeBadge({ type }) {
  const isRent = type?.toLowerCase() === 'rent';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm ${
        isRent
          ? 'bg-purple-600 text-white'
          : 'bg-brand-700 text-white'
      }`}
    >
      For {type}
    </span>
  );
}

export function StatusBadge({ status = 'Available' }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
      {status}
    </span>
  );
}

export function VideoBadge({ count = 1 }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-600/90 text-white backdrop-blur-sm shadow-md transition-transform hover:scale-105">
      <Video className="w-3.5 h-3.5 fill-current" />
      <span>Video Available</span>
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500 text-slate-900 shadow-sm font-semibold">
      <Star className="w-3.5 h-3.5 fill-slate-900" />
      <span>Featured</span>
    </span>
  );
}
