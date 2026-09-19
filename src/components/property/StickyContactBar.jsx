import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';

export default function StickyContactBar({
  propertyId,
  phoneNumber = '+919876543210',
  onEnquireClick,
}) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in Property ID #${propertyId}. Please share more details.`
  );

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-4 py-3 shadow-2xl animate-in slide-in-from-bottom duration-200">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* 1. Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
        >
          <Phone className="w-4 h-4 text-brand-700" />
          <span>Call</span>
        </a>

        {/* 2. WhatsApp Button */}
        <a
          href={`https://wa.me/919876543210?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* 3. Enquire Button */}
        <button
          type="button"
          onClick={onEnquireClick}
          className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
          <span>Enquire</span>
        </button>
      </div>
    </div>
  );
}
