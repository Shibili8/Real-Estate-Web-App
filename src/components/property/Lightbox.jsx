import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function Lightbox({
  photos = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onNext,
  onPrev,
  onSelectIndex,
}) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  // Mobile touch swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Image
      onNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous Image
      onPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Property Photo Gallery"
      onClick={onClose}
    >
      {/* Top Header: Counter, Category & Close Button */}
      <div
        className="flex items-center justify-between text-white z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            {currentIndex + 1} / {photos.length}
          </span>
          {currentPhoto.category && (
            <span className="text-xs font-medium text-brand-300 bg-brand-900/50 px-2.5 py-1 rounded-full border border-brand-700/50 hidden sm:inline-block">
              {currentPhoto.category}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close Lightbox (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all focus:outline-none hover:scale-105 active:scale-95"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Current Image */}
        <div className="max-w-5xl max-h-[75vh] flex flex-col items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || `Property Photo ${currentIndex + 1}`}
            className="max-w-full max-h-[68vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300"
          />

          {/* Caption */}
          {currentPhoto.caption && (
            <p className="mt-3 text-center text-xs sm:text-sm text-slate-300 max-w-xl px-4 line-clamp-2">
              {currentPhoto.caption}
            </p>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all focus:outline-none hover:scale-105 active:scale-95"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div
        className="z-10 flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 max-w-3xl mx-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((photo, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectIndex(index)}
            className={`relative flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? 'border-brand-500 scale-105 opacity-100 ring-2 ring-brand-400'
                : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img
              src={photo.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
