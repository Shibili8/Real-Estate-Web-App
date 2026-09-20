import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize2, MapPin, Video, Eye, ArrowUpRight, Heart } from 'lucide-react';
import { formatPrice, formatArea } from '../../utils/formatters';
import { ListingTypeBadge, StatusBadge, VideoBadge, FeaturedBadge } from '../common/Badge';
import { useWishlist } from '../../context/WishlistContext';

export default function PropertyCard({ property, priority = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!property) return null;

  const {
    id,
    slug,
    title,
    type,
    listingType,
    status,
    price,
    priceDisplay,
    location,
    specs,
    photos = [],
    videos = [],
    featured,
  } = property;

  // Find cover photo or fallback to first photo
  const coverPhoto =
    photos.find((p) => p.isCover)?.url ||
    photos[0]?.url ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';

  const hasVideo = Array.isArray(videos) && videos.length > 0;
  const isLand = type?.toLowerCase() === 'land';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-brand-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Link
          to={`/property/${slug || id}`}
          className="block w-full h-full"
          aria-label={`View details for ${title}`}
        >
          {/* Skeleton placeholder while loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}

          <img
            src={
              imageError
                ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
                : coverPhoto
            }
            alt={title}
            loading={priority ? undefined : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap pointer-events-auto">
            <ListingTypeBadge type={listingType} />
            {featured && <FeaturedBadge />}
          </div>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {status && <StatusBadge status={status} />}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(id);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all hover:scale-110 active:scale-90 ${
                isInWishlist(id)
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
              title={isInWishlist(id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label={isInWishlist(id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  isInWishlist(id) ? 'fill-current scale-110' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bottom Badges / Media Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-sm">
            {type}
          </span>
          {hasVideo && <VideoBadge count={videos.length} />}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Price per sq.ft */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {formatPrice(price, listingType)}
            </div>
            {price && specs?.area && !isLand && (
              <span className="text-xs text-slate-500 font-medium">
                ₹{Math.round(price / specs.area).toLocaleString('en-IN')}/sq.ft
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-brand-700 transition-colors mb-1.5">
            <Link to={`/property/${slug || id}`}>{title}</Link>
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-4">
            <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
            <span className="truncate">
              {location?.locality ? `${location.locality}, ` : ''}
              {location?.city || 'India'}
            </span>
          </div>
        </div>

        {/* Specifications Pill Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          {!isLand ? (
            <>
              <div className="flex items-center gap-1.5" title="Bedrooms">
                <Bed className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-700">
                  {specs?.bedrooms || '-'}
                </span>
                <span className="text-slate-500">Beds</span>
              </div>

              <div className="w-px h-3.5 bg-slate-200" />

              <div className="flex items-center gap-1.5" title="Bathrooms">
                <Bath className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-700">
                  {specs?.bathrooms || '-'}
                </span>
                <span className="text-slate-500">Baths</span>
              </div>

              <div className="w-px h-3.5 bg-slate-200" />
            </>
          ) : (
            <div className="text-xs text-brand-700 font-medium">
              Plot / Land Parcel
            </div>
          )}

          <div className="flex items-center gap-1.5" title="Super Built-up Area">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {specs?.area ? formatArea(specs.area) : '-'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
