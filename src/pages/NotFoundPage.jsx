import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto mb-4">
          <Home className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold text-brand-700 uppercase tracking-widest block mb-1">
          Error 404
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          The page or property you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-sm font-bold shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/properties"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Browse Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
