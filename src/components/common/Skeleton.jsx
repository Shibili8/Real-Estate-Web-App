import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse">
      <div className="h-56 bg-slate-200 w-full" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-5 bg-slate-200 rounded-full w-16" />
        </div>
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="pt-4 border-t border-slate-100 flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-8">
      <div className="h-96 bg-slate-200 rounded-3xl w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 bg-slate-200 rounded w-2/3" />
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="grid grid-cols-4 gap-4">
            <div className="h-20 bg-slate-200 rounded-xl" />
            <div className="h-20 bg-slate-200 rounded-xl" />
            <div className="h-20 bg-slate-200 rounded-xl" />
            <div className="h-20 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-40 bg-slate-200 rounded-2xl" />
        </div>
        <div className="h-80 bg-slate-200 rounded-2xl" />
      </div>
    </div>
  );
}
