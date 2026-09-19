import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../../types/property';

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-select" className="sr-only">
        Sort Properties
      </label>
      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-xs hover:border-slate-300">
        <ArrowUpDown className="w-4 h-4 text-slate-500" />
        <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer text-sm pr-2"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
